
# NICE-2-HAVE PROJECT
### Made by: Roee Negri, Yuval Ramati, Shahar Blitzer, Yair Ben Michael and Yuval Leibovici.

# Run the project

To run the project clone this repo and run:
### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Go to `database.py` and run this file from the rood directory. This file is the DB of the project.
For more information about out DB click [here](https://github.com/Yairb3/E---commerce-shop/tree/main/src/backend)

# The structure of the project:

Our project is constructed from two principal directories: `backend` and `component`.

The component directory houses all our UI code. Within it, you'll find main components like `About.jsx`, `Cart.jsx`, `Contact.jsx`, `Home.jsx`, `Products.jsx`, and more. It also contains sub-components that integrate into the main ones. Examples include `Items.jsx`, `Product.jsx`, `Logout.jsx`, and so forth. In the realm of UI code, there are certain libraries implemented for generating API calls, notably, WhatsApp (utilized in `Cart.jsx` and `Product.jsx`) and Emailjs (found in `AddNewItemForm.jsx`). Moreover, we have a few files specifically designated for CSS implementation.

Moving to the backend folder, here resides the file responsible for most of the logic and heavy computations, `database.py`. This file also encompasses all the endpoints for HTTP requests, using Flask. It is the singular file that manipulates our database, which is represented as JSON files.

In this folder, you'll find the following JSON files:

item.json: Stores all the information about every item.
logs.json: Contains all the logs for specific sessions, used primarily for the co-views algorithm discussed below.
products.json: Maintains a histogram for each product, also used in the co-views algorithm.
rating.json: Holds the average rating and the number of raters for each product.
In addition, the recommend.py file is present in this folder, which contains all the computations for the co-views algorithm.
# The Algorithms:
## Popular items algorithm:
This algorithm determines the top 5 items to display on the home page based on customer ratings. When a customer rates a product from 1 to 5 in the Items component, the product ID and rating score are sent to the update_score function in the `databaseAPI.js` file. This function then sends an HTTP request with this information to the ratings endpoint, which is handled by the `update_score` function in `database.py` (implemented using Flask). In this function, the average rating is calculated and updated in the `ratings.json` file.

When rendering the home page, we calculate the top 5 products using the lower bound of their confidence interval at a 95% confidence level. To achieve this, there is an HTTP request from `databaseAPI.js` to the backend, triggered by the `get_id_to_confidence_array_ratings()` function. The backend (`database.py`) calculates the confidence interval for all the items using the `id_to_confidence_interval_lower_bound()` function. The results are then sorted, and the top 5 items with the higher lower bounds are selected for display in the `Popular_Items.jsx` component.

This approach takes into account both the average rating and the number of ratings each item has received. By using the lower bound of the confidence interval, we ensure that products with a higher average rating and a larger number of ratings are given more weight, while also accounting for uncertainty when products have fewer ratings. This helps to provide a fair and accurate ranking of the top items on the home page.

## Similar products algorithm:
This algorithm determines the top 3 most similar products to display on the product page based on the features of products. A product is described by several features we save in our db (`item.json`). For the algorithm we use: category, price, title, item and color. Each product gets a similarity score between 0 to 1. When the product page is loaded we use the context to calculate what are the 3 most similar items (there similarity score is the highest).

The calculation itself, each one of the 5 features gets a score of between 0 to 1, those scores are sumed and than divided by 5 in order to ensure an end value of 0 to 1. The score for each feature are as followed:

Category - an indicator if both products are in the same category.

Price - we want the smaller the diff, the higher the result, so we take the absoulte value of the diff in prices and than in order to transorm it to a value between 0 to 1, we insert into an exp function : exp(-absoulte(diff price)).

Title - using the concept of jaccard similarity, we get a fraction where the deonimator is all the mutual words between both titles of the products, the denominator is the number of all unique words in our main product.

Item - an indicator if both products are in the same item category.

Color - an indicator if both products belong to the same group color, we divided colors into ["black", "white","silver"] and the rest.

This approach gives us a very simple and logical way to look at connections between producs, also we can easily modify and play with our similarities score in order to always be able to change accoridng to trends and the gathering of data along the way.

## Co-views algorithm:
The  algorithm aims to identify the top 5 products that may be most relevant to a specific user. In simple, we try to measure the connection between every two products, so when you enter any product page, we will suggest the products with the strongest  correlation to the selected products

For implementation, we chose some main events such as add to cart, view product ,purchase (in our case purchase means connecting to WhatsApp) and gave each event a score that reflects its strength. For example, add to cart received 10 points, purchase 50 points and ect.

When a user makes an action,such as if he purchases a shirt, a log event is generated and saved in a log file (logs.json). 

An example of purchasing an item and creating a log event respectively:

*In Cart.jsx:*
````

const cartItems = (product) => {
    const openWhatsApp = async () => {
        add_new_log("purchase", product.id)

````
*In database.py*
````
def add_new_log(new_log):
    # load the current items from the file
    with open('src/backend/logs.json', 'r') as f:
        try:
            logs = json.load(f)
            logs.append(new_log)   
        except json.JSONDecodeError:
            logs = []
            logs.append(new_log) 
    # write the updated logs to the file
    with open('src/backend/logs.json', 'w') as f:
        json.dump(logs, f, indent=4)
````
*The output in logs.json*
```
{
        "eventName": "purchase",
        "productId": 17
    },
```
At the end of the session == when the user logged out, we assign a score to each item that created a log event. The calculation of the new score for each item, taking into account the previous score, is done by a Python algorithm found in recommend.py. When the user  logged out from the site, the updateRecommendByLogs function is called:

```
def updateRecommendByLogs():
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
```
**Explanation of the code:**
  _convertJsonToMatrix() - loads logs.json as a matrix.
  _session() - creating a new instance of session class, session has only one attribute: logs, which is Logs array (An array that stores all the current logs in a convenient way)
  _getProductsDB() - loads products.json (the file with al the products Histograms) as a matrix.
  _Histograms() - Creating a new instance of the Histogram class. The main calculations are done in this class, Therefore, see below the Histogram code with explanations about the functions.
  -histograms.allHistograms.setProductsDict(prodactDB) - note, if prodactDB is not empty, it means there is already a record of the product's histograms in products.json, so set each product's histogram to be its previous one.
  _histograms.classifyProducts(session1.logs) -see full explanation of Histograms.classifyProducts below. In general, the function divides the products into groups according to the event in which they were observed.
  _histograms.updateHistogarm() - see full explanation of Histograms.updateHistogarm below. In general, for each product viewed in the current session, the function updates the score of the other products that appeared with it under the same category, in the product's histogram. So after this function, the score in the histograms is updated.
  _insert_item(histograms.allHistograms.productsDict) - writing back the updated Histograms to products.json.
  _deleteLogs() - after updating the histograms, deleting the contents of logs.json.

**class Histograms:**

*Histograms class has two arttibutes:
  _eventsOfProduct - a dictionary whose keys are the names of the optional events and whose values are sets that should contain the products that appeared in the corresponding event.
  _allHistograms - an instance of the class ProductHistogramDict. ProductHistogramDict has a dictionary that mapping between productId to the product's Histogram. the Histogram is formed in another unique class "ProductHistogram" which has the Attributes:  
            self.productId 
            self.top5 = {}
            self.lowestTopScore = tuple()
            self.histogram = {}*
```
    def __init__(self) -> None:
        self.eventsOfProduct = {"view" : set(), "cart" : set(), "purchase" : set(), "removeFromCart" :set() ,"deleteProduct":set()}
        self.allHistograms =  ProductHistogramDict()
```

*The function "classifyProducts" goes through the products that appeared in the logs according to the events in which they were observed, and inserts them into the appropriate set in the eventsOfProduct dictionary.
Also, if the set size of deleteProduct is greater than 0, i.e. there are products to be deleted, the function calls the delProductHandler function for further processing*
```
    def classifyProducts(self, logs):
        for log in logs:
            self.eventsOfProduct[log.eventName].add(log.productId)
        if len(self.eventsOfProduct['deleteProduct']) > 0:
            self.delProductHandler()
```

*The function "delProductHandler" goes through all the products that need to be deleted, first it makes sure that the selected product does not appear in other events, if so it deletes it from all the event sets. After that, if the product has a histogram, it means that the product was correlated with other products in the past, so every instance of it must be deleted from the rest of the histograms of the products. The function does this by calling the delProductFromHistograms function and finally deletes the histogram of the selected product*
```
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
  ```
*In order to keep the performance of finding the top 5 products in O(1), the top 5 products are saved for each product histogram, and the product with the lowest score among the top 5 is saved too (named lowestTopScore or infimumtop5) , so that when the product score is updated it will be easy to change the conbination of the top 5 products. The only time we will go through all the products apeares in a  product's  histogram and compare the scores of all products to find a new Top5 conbination will only be if a deleted product appeared in the top5 products of another product's histogram. The above function finds a new Top5 products in the described situation:*
```
    def find_infimumtop5_product(self, productNode)
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
 ```
*The function "updateHistogarm" goes through each category of events, and checks if there are more than two products in the category. If so, they can be given a correlative score to each other. In this case, the function will go through all the products from the same category, and for each selected product, it will increase the score of the other products in the histogram of the selected product . The score is given according to weightedEvents function*
```
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

 ```

**retrieving the top 5 products**
Finally, on the next session when the user chooses to view any product page, we will retrieve the top 5 products with the updated highest score

*in database.py*
```
def getTopfive(productId):
    with open('src/backend/products.json', 'r') as f:
        try:
            products = json.load(f)
            productsTop5 = products[str(productId)]['top5']
            top5 = []
            if productsTop5 == None:
                return []
            for prodId in productsTop5.keys():
                top5.append(get_item_by_id(int(prodId)))
            return top5
        except:
            print("Error occurred in getTopFive")
        
```

