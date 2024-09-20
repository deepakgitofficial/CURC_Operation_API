import React, {useState } from 'react'
import { addDataToAPI } from '../API/PostApi';
// import { api } from '../API/Api'

const AddProduct = ({ mydata, setData }) => {
  // console.log(mydata,'preview item')
  let output= "";
	for (let x in mydata) {
  		output += mydata[x];
  		console.log(mydata[x].id);
	}
  console.log(output)

  const [addData, setAddData] = useState([]);

  const[count, setCount]= useState(1)

  // console.log(addData, 'input data');

  const handleInputChange = (e) => {
    // console.log(e,'input event')
    
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prevData) => {
      return { ...prevData, [name]: value, id: count}
    })
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await addDataToAPI(addData);

    if ((response.status == 201)) {
      setData([...mydata, response.data]);
     
    } 
    setCount((count)=> count+1)
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
          value={addData.item}
        />


        <input type="number"
          placeholder='Price'
          name='price'
          onChange={handleInputChange}
          value={addData.price}
        />
        <input type="submit" value='submit' />
      </form>
    </div>
  )
}

export default AddProduct