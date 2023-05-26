


export const get_all_items = async () => {
    const response = await fetch('http://localhost:5000/item')
    const data = await response.json();
    return data;
}

export const delete_item_by_id = async (id) => {
    await fetch('http://localhost:5000/item/' + id, {
        method: 'DELETE',
    }).then(response => {
        if (response.ok) {
          console.log('Item deleted successfully');
        } else {
          console.error('Item not found');
        }
      });
}

export const add_item = async (item) => {
    await fetch('http://localhost:5000/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    }).then(response => {
        if (response.ok) {
          console.log('Item added successfully');
        } else {
          console.error('Item not added');
        }
      });
}

export const update_item = async (item) => {
    await fetch('http://localhost:5000/item/' + item.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    }).then(response => {
        if (response.ok) {
          console.log('Item updated successfully');
        } else {
          console.error('Item not updated');
        }
      });
}

export const get_item_by_id = async (id) => {
    const response = await fetch('http://localhost:5000/item/' + id)
    const data = await response.json();
    return data;
}

export const get_all_users = async () => {
    const response = await fetch('http://localhost:5000/users')
    const data = await response.json();
    return data;
}

export const get_user_by_mail = async (mail) => {
  const response = await fetch('http://localhost:5000/users/' + mail)
  const user = await response.json();
  return user;
}

export const get_ratings = async () => {
  const response = await fetch('http://localhost:5000/ratings')
  const data = await response.json();
  console.log(data);

  return data;
}


export const add_user = async (user) => {
    await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then(response => {
        if (response.ok) {
          console.log('User added successfully');
        } else {
          console.error('User not added');
        }
      });
}
export const update_ratings = async (ratings) => {
  console.log(ratings);
  await fetch('http://localhost:5000/ratings', {
    method: 'POST',
    headers:{
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify(ratings),
  }).then(response =>{
    if(response.ok){
      console.log('Raitings updated successfully');
    }
    else{
    console.log('Problem at update rating');
    }
  });
}

export const update_score = async (productid, rating) => {
  await fetch('http://localhost:5000/ratings', {
    method: 'POST',
    headers:{
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify({productid: productid, rating: rating}),
  }).then(response =>{
    if(response.ok){
      console.log('Raitings updated successfully');
    }
    else{
    console.log('Problem at update rating');
    }
  });
}