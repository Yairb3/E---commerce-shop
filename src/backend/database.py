import copy
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from recommend import updateRecommendByLogs
import math
from scipy.special import erfinv


app = Flask(__name__)
CORS(app)


# function to insert a new item into the item list
def insert_item(item):
    # load the current items from the file
    with open('src/backend/item.json', 'r') as f:
        items = json.load(f)

    # add the new item to the list
    items.append(item)

    # write the updated items to the file
    with open('src/backend/item.json', 'w') as f:
        json.dump(items, f, indent=4)


# function to delete an item from the item list by its ID
def delete_item(item_id):
    # load the current items from the file
    with open('src/backend/item.json', 'r') as f:
        items = json.load(f)

    # find the item with the matching id
    for i, item in enumerate(items):
        if item['id'] == item_id:
            # remove the item from the list
            items.pop(i)

            # write the updated items to the file
            with open('src/backend/item.json', 'w') as f:
                json.dump(items, f, indent=4)
            return True

    # if no matching item was found, return False
    return False


# function to modify an item in the item list by its ID
def modify_item(item_id, new_item):
    # load the current items from the file
    with open('src/backend/item.json', 'r') as f:
        items = json.load(f)

    # find the item with the matching id
    for item in items:
        if item['id'] == item_id:
            # update the item with the new values
            item.update(new_item)

            # write the updated items to the file
            with open('src/backend/item.json', 'w') as f:
                json.dump(items, f, indent=4)
            return True

    # if no matching item was found, return False
    return False

# function to modify user in the user list by its email
def modify_user(user_email, new_user):
    # load the current items from the file
    with open('src/backend/users.json', 'r') as f:
        users = json.load(f)

    # find the user with the matching email
    for user in users:
        if user['email'] == user_email:
            # update the user with the new values
            user.update(new_user)

            # write the updated items to the file
            with open('src/backend/users.json', 'w') as f:
                json.dump(users, f, indent=4)
            return True

    # if no matching item was found, return False
    return False

# function to get all items in the item list
def get_all_items():
    # load the items from the file
    with open('src/backend/item.json', 'r') as f: 
        items = json.load(f)

    # return the items as a list
    return items

# function to get a specific item by its ID
def get_item_by_id(item_id):
    # load the items from the file
    with open('src/backend/item.json', 'r') as f:
        items = json.load(f)

    # find the item with the matching id
    for item in items:
        if item['id'] == item_id:
            return item

    # if no matching item was found, return None
    return None

##############################################################################################################
# functions for the user list
def get_all_users():
    # load the items from the file
    with open('src/backend/users.json', 'r') as f:
        users = json.load(f)

    # return the items as a list
    return users

def confidence_interval_lower_bound(avg_rate, count):
    """
    Calculate the lower bound of Wilson score confidence interval for a Bernoulli parameter.

    Parameters:
    star_ratings -- a list of ratings from 1-5
    confidence -- desired confidence level, default is 0.95 (corresponding to a 95% confidence interval)

    Returns: a number representing the lower bound of the confidence interval.
    """
    max_potential_score = 5 * count  # each rating is out of 5
    pos = avg_rate * count  # total "upvotes"
    if max_potential_score == 0:
        return 0

    z = 1.96  # 95% confidence
    phat =  pos / max_potential_score
    return (phat + z*z/(2*max_potential_score) - z * math.sqrt((phat*(1-phat)+z*z/(4*max_potential_score))/max_potential_score))/(1+z*z/max_potential_score) 

def id_to_confidence_interval_lower_bound():
    with open('src/backend/ratings.json', 'r') as f:
        ratings = json.load(f)
    result = {}
    for id, rate in ratings.items():
        avg, count = rate
        current_bound = confidence_interval_lower_bound(avg, count)
        inner_dict = {"value": current_bound}
        result[id] = inner_dict
    json_result = json.dumps(result, indent=4)
    return json_result


# function to get a specific user by its mail
def get_user_by_mail(mail):
    # load the items from the file
    with open('src/backend/users.json', 'r') as f:
        users = json.load(f)

    # find the user with the matching mail
    for user in users:
        if user['email'] == mail:
            return user

    # if no matching user was found, return None
    return None
    

def add_new_user(user):
    # load the current items from the file
    with open('src/backend/users.json', 'r') as f:
        users = json.load(f)

    # add the new item to the list
    users.append(user)

    # write the updated items to the file
    with open('src/backend/users.json', 'w') as f:
        json.dump(users, f, indent=4)

##############################################################################################################
# functions for logs


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


##############################################################################################################
# functions for recommended items

def getTopfive(productId):
    with open('src/backend/products.json', 'r') as f:
        try:
            products = json.load(f)
            try:
                productsTop5 = products[str(productId)]['top5']
            except:
                productsTop5 = None
            top5 = []
            if productsTop5 == None:
                return []
            for prodId in productsTop5.keys():
                top5.append(get_item_by_id(int(prodId)))
            return top5
        except:
            print("Error occurred in getTopFive")
        


##############################################################################################################
# endpoints


# endpoint to handle GET and POST requests for the item list
@app.route('/item', methods=['GET', 'POST'])
def handle_items():
    if request.method == 'GET':
        # return all items as JSON
        items = get_all_items()
        return jsonify(items)

    elif request.method == 'POST':
        # insert a new item into the item list
        item = request.json
        insert_item(item)
        return 'OK'


# endpoint to handle DELETE requests for individual items by ID
@app.route('/item/<int:item_id>', methods=['DELETE'])
def handle_item(item_id):
    if delete_item(item_id):
        return 'OK'
    else:
        return 'Item not found', 404


# endpoint to handle PUT requests for individual items by ID
@app.route('/item/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    new_item = request.json
    if modify_item(item_id, new_item):
        return 'OK'
    else:
        return 'Item not found', 404

# endpoint to handle PUT requests for individual user by email
@app.route('/users/<string:user_email>', methods=['PUT'])
def update_user(user_email):
    new_user = request.json
    if modify_user(user_email, new_user):
        return 'OK'
    else:
        return 'User not found', 404
# endpoint to handle GET requests for individual items by ID
@app.route('/item/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = get_item_by_id(item_id)
    if item:
        return jsonify(item)
    else:
        return 'Item not found'
    
#endpoint to handle GET requests for all users
@app.route('/users', methods=['GET'])
def get_users():
    users = get_all_users()
    return jsonify(users)
#endpoint to handle POST requests for new user
@app.route('/users', methods=['POST'])
def add_user():
    user = request.json
    add_new_user(user)
    return 'OK'

# endpoint to handle GET requests for individual items by ID
@app.route('/users/<string:user_mail>', methods=['GET'])
def get_user(user_mail):
    user = get_user_by_mail(user_mail)
    if user:
        return jsonify(user)
    else:
        return 'User not found'

#endpoint to handle GET requests for all users
@app.route('/ratings', methods=['GET'])
def get_id_to_confidence_val_rating():
    id_to_confidence_array = id_to_confidence_interval_lower_bound()
    return jsonify(id_to_confidence_array)



@app.route('/ratings', methods=['POST'])
def update_score():
    productid = request.json['productid']
    rating = request.json['rating']
    prod = get_item_by_id(productid)
    new_prod = copy.copy(prod)
    with open('src/backend/ratings.json', 'r') as f:
        temp_ratings = json.load(f)
    if str(productid) in temp_ratings:
         cnt =  temp_ratings[str(productid)][1]
         avarage = temp_ratings[str(productid)][0]
         avarage = (avarage*cnt + rating)/(cnt+1)
         cnt+=1
         temp_ratings[str(productid)][1] = cnt
         temp_ratings[str(productid)][0] = avarage
         new_prod['rating'] = {'count': cnt, 'rate': round(avarage, 2)}
    else:
        temp_ratings[str(productid)] = [rating,1]
        new_prod['rating'] = {'count': 1, 'rate': round(rating, 2)}
    modify_item(productid, new_prod)
    with open('src/backend/ratings.json', 'w') as f:
        json.dump(temp_ratings, f, indent=4)
    return 'OK'

# Endpoint to handle POST requests for new logs
@app.route('/logs', methods=['POST'])
def add_log_by_event():
    log = request.json
    add_new_log(log)
    return 'OK'

@app.route('/logs', methods=['GET'])
#update products histograms according to logs 
def updateReco():
    updateRecommendByLogs()
    message = "success"
    return jsonify({'message': message})

# endpoint to handle GET requests for recommended items by ID
@app.route('/products/<int:product_id>', methods=['GET'])
def get_recommended_items(product_id):
    items = getTopfive(product_id)
    return jsonify(items)
    
    

if __name__ == '__main__':
    app.run(debug=True)