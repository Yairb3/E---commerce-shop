# Getting Started with our BE

first go to `databae.py` and run it on your computer.
Now the server is running on [http://localhost:5000](http://localhost:5000) and all the data is taking from `item.json`.
If ypu want to add new field to our data, just go to the `item.json` file and add it to each field. You can do it quickly with chat GPT.

If you have some questions or you need me to add more functionalities, feel free to ask.

## functions for each method:

### get all items

`const response = await fetch('http://localhost:5000/item')`
`const all_data = response.json()`

### delete item by id:
Note - the id in the first line need to be the id of the item that we want to delete.

```
fetch('http://localhost:5000/item/{id}', {
  method: 'DELETE'
})
.then(response => {
  if (response.ok) {
    console.log('Item deleted successfully');
  } else {
    console.error('Item not found');
  }
});
```

### add new item:
 Note - the new item should fix to the format of our item in the `item.json` file.

 ```
 fetch('http://localhost:5000/item', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newItem)
})
```

### Modify element
Note - we modify element by id.

```
fetch('http://localhost:5000/item/{id}', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "title": "New Title",
    "price": 24.99,
    "description": "New Description",
    "category": "New Category",
    "image": "https://example.com/new-image.jpg",
    "rating": {
        "rate": 4.5,
        "count": 50
    }
  })
})
```

### get item by id:
 ```
 const response = fetch('http://localhost:5000/item/{id}')
 condt item = response.clone().json()
```
