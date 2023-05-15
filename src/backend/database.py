import json
from flask import Flask, jsonify, request
from flask_cors import CORS

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

def get_all_ratings():
     # load the ratings from the file
    with open('src/backend/ratings.json', 'r') as f:
        ratings = json.load(f)

    # return the items as a list
    return ratings
    

def add_new_user(user):
    # load the current items from the file
    with open('src/backend/users.json', 'r') as f:
        users = json.load(f)

    # add the new item to the list
    users.append(user)

    # write the updated items to the file
    with open('src/backend/users.json', 'w') as f:
        json.dump(users, f, indent=4)

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

#endpoint to handle GET requests for all users
@app.route('/ratings', methods=['GET'])
def get_ratings():
    ratings = get_all_ratings()
    return jsonify(ratings)

@app.route('/ratings', methods=['POST'])
def update_ratings():
    ratings = request.json
    print(ratings)
    with open('src/backend/ratings.json', 'w') as f:
        json.dump(ratings, f, indent=4)
    return 'OK'



if __name__ == '__main__':
    app.run(debug=True)
