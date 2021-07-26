import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlockIcon from '@material-ui/icons/Block';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import db from "../../firebase";
import "./Admin.css";

function Admin(props) {

    const [products, setProducts] = useState([]);

    // run this when sidebar comp loads (Run once or run agin n again when vars given are changed)
    useEffect(() => {
      // getting data from cloud firestore collection
      db.collection("products").onSnapshot((snapshot) =>
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            price: doc.data().price,
            rating: doc.data().rating,
            image: doc.data().image,
          }))
        )
      );
    }, []);

    
  // Using useParams Hook to use url params (equal to props.match.params)
  const { productId } = useParams();

  // product details
  const [productDetails, setProductDetails] = useState(null);

  // product details
  const [pageTitle, setPageTitle] = useState("Add a New Product");


  useEffect(() => {
    if (productId) {
      db.collection("products")
        .doc(productId)
        .onSnapshot((snapshot) => setProductDetails(snapshot.data()));
    }
  }, [productId]);


  const removeProduct = (prodId) => {
     setProducts(
      [...products.filter(item => item.id !== prodId)]
    )
  }


  const { control, handleSubmit, register, reset,  formState: { errors } } = useForm();
  
  const onSubmit = data => {
    setProducts(
     [  {
        id: "testID",
        title: data.productTitle,
        price: data.price,
        image: data.productImage,
        rating: 0,
      }, ...products]
    )
    alert("Product added successfully!");
  };

  return (
    <div className="productPage">
      <div className="productPage_top">
        <div className="productPage_left">

        <h2 className="productPage_title"> All Products </h2>
         <hr />
          
        <div >
            {products?.map((prod) => {
              return (
                <div className = "productItem">
                  <div className="productPage_title">
                    <AssignmentIcon />
                    <h4> {prod.title} </h4>
                  </div>

                  <div className="items_flex">
                  <div className = "items_left">
                  <img src={prod.image} alt={prod.id} className="prod_thumb"/>
                  </div>

                  <div className = "items_right">
                  <span className="productPage_price">
                    <p>Rs. {prod.price}</p>
                  </span>
                  <div className="productPage_reviewRating">
                    {Array(prod.rating)
                      .fill()
                      .map((_, i) => (
                        <p>⭐</p>
                      ))}
                  </div>
                  <span className="productPage_stock">
                    <CheckBoxIcon /> In-Stock{" "}
                  </span>
                 </div>
                
                 <div className = "items_buttons">
                 <button className="productPage_add2" >
                Edit
              </button>
                <button className="productPage_remove2" onClick={() => removeProduct(prod.id)}>
                  Remove
                </button>
                  </div>

                </div>
       
                </div>
              );
            })}
          </div>


        </div>

        <div className="productPage_right">
          <h2 className="productPage_title"> {pageTitle} </h2>
          <hr />

          <div className="productPage_content">

          <form className="product_form" onSubmit={handleSubmit(onSubmit)}>

            <p>Product Name:</p>

          <input className="productForm_Input" {...register("productTitle", { required: true })} />
          <br/>
          {errors.productTitle?.type === 'required' && <span className="productForm_error"> A product title is required </span>}
          <br/>
          <br/>

          <p>Product Price:</p>

          <input className="productForm_Input" type="number" {...register("price", { min: 1, max: 199999, required:true })} />
          <br/>
          {errors.price && <span className="productForm_error">Price is required and cannot be less than rs.1  </span>}

          <br/>
          <br/>

          <p>Product Image URL:</p>
          
          <input className="productForm_Input" {...register("productImage", { required: true })} />
          <br/>
        
         {errors.productImage &&  <span className="productForm_error">Product Image URL is required </span> }

            <br/>
            <br/>

            <p>Product Category:</p>

            <Controller
              name="productCategory"
              control={control}
              render={({ field }) => <Select 
              className="productForm_Select"
                {...field} 
                options={[
                  { value: "Electronics", label: "Electronics" },
                  { value: "Fashion", label: "Fashion" },
                  { value: "Food & beverages", label: "Food & beverages" }
                ]} 
              />}
            />
          
           
          <div className="productPage_buttons">
              <button className="productPage_add" type="submit">
                <AddBoxIcon />
                Add Product
              </button>
                <button className="productPage_remove" onClick={() => {
        reset({
          productTitle: "",
          price: 0,
          productImage: ""
        }, {
          keepErrors: false, 
          keepDirty: false,
          keepIsSubmitted: false,
          keepTouched: false,
          keepIsValid: false,
          keepSubmitCount: false,
        });
      }}>
                  <BlockIcon />
                  Reset Fields
                </button>
            </div>
            </form>

          </div>
        </div>

      


    </div>
    </div>
  );
}

export default Admin;
