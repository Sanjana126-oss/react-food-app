import React, { useState } from 'react';
import './AddFood.css';

const AddFood = () => {
    // 1. State for the image and form data
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad" // Default category
    });

    // 2. Handle text input changes
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    // 3. Handle Form Submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Safety Check: Make sure user selected an image!
        if (!image) {
            alert("⚠️ Please upload an image first!");
            return; 
        }

        // Pack the data into FormData (required for uploading files)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image); // The actual image file

        try {
            // Send to Backend
            const response = await fetch("http://localhost:5000/api/food/add", {
                method: "POST",
                body: formData 
                // Do NOT set 'Content-Type' header here. Browser does it automatically for FormData.
            });

            const result = await response.json();

            if (result.success) {
                // Clear the form on success
                setData({ name: "", description: "", price: "", category: "Salad" });
                setImage(false);
                alert("✅ Food Added Successfully!");
            } else {
                alert("❌ Error: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Server Error! Make sure your Backend is running.");
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                
                {/* IMAGE UPLOAD SECTION */}
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    {/* Clicking this label triggers the hidden input below */}
                    <label htmlFor="image">
                        <img 
                            src={image ? URL.createObjectURL(image) : "https://cdn-icons-png.flaticon.com/512/109/109612.png"} 
                            alt="Upload preview" 
                            style={{width: "100px", cursor: "pointer"}}
                        />
                    </label>
                    {/* Notice: 'required' is removed from here so it doesn't freeze the form */}
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </div>

                {/* PRODUCT NAME */}
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                </div>

                {/* PRODUCT DESCRIPTION */}
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>

                <div className="add-category-price">
                    {/* CATEGORY DROPDOWN */}
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    {/* PRICE */}
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹' required />
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button type='submit' className='add-btn'>ADD FOOD</button>
            </form>
        </div>
    )
}

export default AddFood;