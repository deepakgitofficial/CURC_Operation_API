import axios from "axios";
import React, { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import { deletePost, getPost } from "./PostApi";
const Products = () => {
  const API = "http://localhost:3004/products";
  const [mydata, setData] = useState([]);
  const [editData, setEditData] = useState({});

  const fetchDataFun = async () => {
    try {
      const res = await getPost();
      setData(res.data);
    } catch (error) {
      console.log(error, "error to featchin data from axios method");
    }
  };

  useEffect(() => {
    fetchDataFun();
  }, []);

  const handleDeleteProduct = async (id) => {
    const delResponse = await deletePost(id);
    try {
      if (delResponse.status == 200) {
        const updatedProducts = mydata.filter((ele) => {
          return ele.id !== id;
        });
        setData(updatedProducts);
      } else {
        "failed to delete", delResponse.status;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editFun = (id) => {
    const currEditEle = mydata.find((ele) => {
      return ele.id == id;
    });
    setEditData(currEditEle);
  };
  return (
    <>
    <main>
    <h2 className="text-center py-5 bg-gray-50 text-2xl">Daily Routine Time Table</h2>
   
      <div className="container grid grid-cols-3 gap-10 py-5"> 
        <div className="add-porduct "> 
          <AddProduct
            mydata={mydata}
            setData={setData}
            editElement={editData}
            editEleFun={setEditData}
          />
        </div>
        <div className="card-list col-span-2 bg-white  p-4 overflow-auto">
          <ol className="card-parent">
            {mydata.map((currentElement) => {
              const { id, productname, price } = currentElement;
              return (
                <li key={id} className="card-list w-full bg-gray-50 mb-5 ">
                  <div className="product-card flex justify-between">
                  <div className="flex gap-10">
                    <div className="text-sm">Daily Schedule: <span className="text-pink-800 font-semibold ">{productname}</span></div>
                    <div className="text-sm">Time: <span className="text-pink-800 font-semibold ">{price}</span></div>
                  </div> 
                    <div className="btn-group">
                      <button className="edit-btn" onClick={() => editFun(id)}>
                        Edit
                      </button>
                      <button
                        className="del-btn"
                        onClick={() => handleDeleteProduct(id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      </main>
    </>
  );
};

export default Products;
