import React, { useEffect, useState } from 'react'
import { addDataToAPI, updateDataToAPI } from '../API/PostApi';
// import { api } from '../API/Api'

const AddProduct = ({ mydata, setData, editElement, editEleFun }) => {
  const [addData, setAddData] = useState({});

  // const [count, setCount] = useState(1);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prevData) => {
      return { ...prevData, [name]: value };
    })
  }
  useEffect(() => {
    setAddData({
      price: editElement.price,
      productname: editElement.productname
    })
  }, [editElement])

  let isEmptyEdit = Object.keys(editElement).length == 0;

  // ----------add-product-method----------
  const addPostData = async () => {
    const response = await addDataToAPI(addData);
    if ((response.status == 201)) {
      setData([...mydata, response.data]);
    }

    setAddData({ price: "", productname: "" });
  }
  // ----------upadate-product-method----------
  const updatePostData = async () => {
    const response = await updateDataToAPI(editElement.id, addData);
    // console.log(response,'updated response'); 
    if ((response.status == 200)) {
      setData((pre) => {
        return pre.map((currEle) => {
          return currEle.id === response.data.id ? response.data : currEle;
        })
      });
      setAddData({ price: "", productname: "" });
      editEleFun({})
    }
  }

  // ----------form-Submit-------------
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const action = event.nativeEvent.submitter.value;

    if (action == "Add") {
      addPostData();
    } else if (action === 'Update') {
      updatePostData();
    }
    // setCount((count) => count + 1)
    // console.log(response.data, 'new data res');
    //  console.log(typeof(mydata))
    //  let max=  Math.max(...mydata.price);
    //  console.log(max);
    //  const arr= mydata.filter((currEle )=>{
    //   let sortedVal= currEle.id;
    //          return arr[sortedVal.length]-1
    //  }) 
    //  console.log(arr,'sorted array');
  }

  return (
    <div className='form-section'>
      <h4>Add product</h4>
      <form onSubmit={handleFormSubmit}> 
        <input type="text"
          onChange={handleInputChange}
          placeholder='Product Name'
          name='productname'
          value={addData.productname} 
        />

        <input type="number"
          placeholder='Price'
          name='price'
          onChange={handleInputChange}
          value={addData.price}
        />
        <button type='submit' 
          value={isEmptyEdit ? "Add" : "Update"}
          style={isEmptyEdit ? { backgroundColor: "orange" } : { backgroundColor: "pink" }}>
          {isEmptyEdit ? "Add" : "Update"}
        </button>
      </form>
    </div>
  )
}

export default AddProduct