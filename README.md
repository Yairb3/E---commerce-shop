
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