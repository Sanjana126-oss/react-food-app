import React, { useEffect, useState } from 'react';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await fetch("https://react-food-app-1-mkmv.onrender.com/api/food/list");
    const result = await response.json();
    if (result.success) {
      setList(result.data);
    }
  }

  const removeFood = async (foodId) => {
    const response = await fetch("https://react-food-app-1-mkmv.onrender.com/api/food/remove", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({id: foodId})
    });
    await response.json();
    await fetchList(); // Refresh list after delete
  }

  useEffect(() => { fetchList(); }, []);

  return (
    <div className='list-add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={item.image} alt="" style={{width: '50px'}} />
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
export default List;