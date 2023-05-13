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


if __name__ == '__main__':
    app.run(debug=True)
