import json
from json import JSONEncoder
from json.decoder import JSONDecodeError


def convertJsonToMatrix():
    file_logs = r"src/backend/logs.json"
    with open(file_logs) as json_file :
        data = json.load(json_file)
    return data
        
class Histograms:
    def __init__(self) -> None:
        self.eventsOfProduct = {"view" : set(), "cart" : set(), "purchase" : set(), "removeFromCart" :set() ,"deleteProduct":set()}
        self.allHistograms =  ProductHistogramDict()
        
    def getAllHistograms(self,productsDict):
        self.allHistograms.setProductsDict(productsDict)

    def classifyProducts(self, logs):
        for log in logs:
            self.eventsOfProduct[log.eventName].add(log.productId)
        if len(self.eventsOfProduct['deleteProduct']) > 0:
            self.delProductHandler()

    def delProductHandler(self):
        for product in self.eventsOfProduct['deleteProduct']:
            for eventName in [ "view","cart","purchase","removeFromCart"]:
                if product in self.eventsOfProduct[eventName]:
                    self.eventsOfProduct[eventName].remove(product)
            if str(product) in self.allHistograms.productsDict:
                self.delProductFromHistograms(str(product))
                self.allHistograms.productsDict.pop(str(product))

    def delProductFromHistograms(self,productId):
        productH = self.allHistograms.getProduct(productId)
        for product in productH.histogram.keys():
            relatedProductH = self.allHistograms.getProduct(product)
            if productId in relatedProductH.histogram:
                relatedProductH.histogram.pop(productId)
                if productId in relatedProductH.top5:
                    relatedProductH.top5.pop(productId)
                    self.find_infimumtop5_product(relatedProductH)
    
    def find_infimumtop5_product(self, productNode):
        histogram = productNode.histogram
        # Check if the dictionary is empty
        if len(histogram) < 1:
            self.allHistograms.productsDict.pop(str(productNode.productId))
            return
        infimumtop5 = tuple()
        if len(histogram) < 5 :
            for key, value in productNode.top5.items():
                if len(infimumtop5) < 1 or value > infimumtop5[1]:
                    infimumtop5 = (key,value)
        else:
            for key, value in histogram.items():
                if key not in productNode.top5:
                    if len(infimumtop5) < 1 or value > infimumtop5[1]:
                        infimumtop5 = (key,value)
        productNode.lowestTopScore = infimumtop5
        if len(infimumtop5) > 1:
            productNode.top5[infimumtop5[0]] =infimumtop5[1]
       
    def updateHistogarm(self):
        for eventName in [ "view","cart","purchase","removeFromCart"]:
            score = self.weightedEvents(eventName)
            if len(self.eventsOfProduct[eventName]) > 1:
                for product in self.eventsOfProduct[eventName]:
                    currProductHistogram = self.allHistograms.getProduct((product))
                    for relatedProduct in self.eventsOfProduct[eventName]:
                        if relatedProduct != product:
                            currProductHistogram.add(relatedProduct,score)

    def weightedEvents(self,eventName):
        match eventName:
            case  "view":
                return 1
            case "cart":
                return 10
            case "purchase":
                return 50
            case "removeFromCart":
                return 5
            case _:
                return 0
    
class session:
    session = 5
    def __init__(self) -> None:
            self.logs = []
           
    def __repr__(self) -> str:
        res = ""
        for log in self.logs:
            res += f"{type(log).__name__}(eventName={log.eventName}, productId={log.productId})"    + '\n'
        return res

    def add(self ,log):
        self.logs.append(log)
        

class Log:
    def __new__(cls, *args, **kwargs):
        return super().__new__(cls)
    
    def __init__(self, eventName, productId) -> None:
            self.eventName = eventName
            self.productId = productId
     
    def __repr__(self) -> str:
        return f"{type(self).__name__}(eventName={self.eventName}, productId={self.productId})"   

class ProductHistogram:

    def __init__(self, productId,top5=None, lowestTopScore =None, histogram = None ) -> None:
        self.productId = productId
        if top5 is None and lowestTopScore is None and histogram is None:
            self.top5 = {}
            self.lowestTopScore = tuple()
            self.histogram = {}
        else:
            self.top5 = top5
            self.lowestTopScore = lowestTopScore
            self.histogram = histogram
        
    def add(self, relatedprodactId, score):
        relatedprodactId = str(relatedprodactId)
        if relatedprodactId in self.histogram:
            score = self.histogram[relatedprodactId] + score
        self.histogram[relatedprodactId] = score
        if relatedprodactId not in self.top5:
            if len(self.top5) < 5:
                self.top5[relatedprodactId] = score
                if len(self.lowestTopScore) < 1 or score < self.lowestTopScore[1]:
                    self.lowestTopScore = (relatedprodactId,score)
            elif score > self.lowestTopScore[1]:
                self.top5.pop(self.lowestTopScore[0])
                self.top5[relatedprodactId] = score
                minProduct = min(self.top5, key=self.top5.get)
                self.lowestTopScore = (minProduct,self.top5[minProduct])
        else:
            if self.lowestTopScore[0] == relatedprodactId:
                self.lowestTopScore = (relatedprodactId,score)
            self.top5[relatedprodactId] = score
        

class ProductHistogramDict:
    def __init__(self) -> None:
           self.productsDict = dict()
    
    def setProductsDict(self,productsDict):
        self.productsDict = productsDict

    class MyEncoder(JSONEncoder):
        def default(self, obj):
            return obj.__dict__ 

    def getProduct(self, productId):
        productId = str(productId)
        if str(productId) not in self.productsDict:
            self.productsDict[productId] = ProductHistogram(productId=productId)
        return self.productsDict[productId]
        
def insert_item(item):
    # write the updated items to the file
    with open('src/backend/products.json', 'w') as f:
        json_str =  json.dumps(item, cls=ProductHistogramDict.MyEncoder, indent=4) 
        f.write(json_str)

def getProductsDB():
    with open('src/backend/products.json', 'r') as f:
        try:
            data_dict = json.load(f)
            productDB = {key: ProductHistogram(**value) for key, value in data_dict.items()}
        except JSONDecodeError:
            productDB = None   
        # productDB = json.load(f)
        return productDB

def deleteLogs():
    with open('src/backend/logs.json', 'w') as f:
    # Truncate the file content
        f.truncate(0)


def updateRecommendByLogs():
    # productHistogramDict = ProductHistogramDict()
    logs = convertJsonToMatrix()
    session1 = session()
    for log in logs:
        session1.add(Log(log['eventName'],log['productId']))
    prodactDB = getProductsDB()
    histograms = Histograms()
    if prodactDB != None:
         histograms.allHistograms.setProductsDict(prodactDB)
    histograms.classifyProducts(session1.logs)
    histograms.updateHistogarm()
    insert_item(histograms.allHistograms.productsDict)
    deleteLogs()

    

if __name__ == '__main__':
    productHistogramDict = ProductHistogramDict()
    logs = convertJsonToMatrix()
    session1 = session()
    for log in logs:
        session1.add(Log(log['eventName'],log['productId']))
    prodactDB = getProductsDB()
    histograms = Histograms()
    if prodactDB != None:
         histograms.allHistograms.setProductsDict(prodactDB)
    histograms.classifyProducts(session1.logs)
    histograms.updateHistogarm()
    insert_item(histograms.allHistograms.productsDict)