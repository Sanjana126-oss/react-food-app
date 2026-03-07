import React, { useEffect, useState } from 'react';
import './ListFood.css';

const ListFood = () => {
  const [list, setList] = useState([]);

  // Fetch all food items from database
  const fetchList = async () => {
    const response = await fetch("http://localhost:5000/api/food/list");
    const result = await response.json();
    if (result.success) {
      setList(result.data);
    }
  }

  // Remove food function
  const removeFood = async (foodId) => {
    const response = await fetch("http://localhost:5000/api/food/remove", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: foodId})
    });
    const result = await response.json();
    if (result.success) {
        alert("Item Removed");
        await fetchList(); // Refresh the list
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list-add flex-col'>
      <p>All Foods List (Admin Panel)</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`http://localhost:5000/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListFood;