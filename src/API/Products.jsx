import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct';
import { deletePost, getPost } from './PostApi';

const Products = () => {
    // const API = "http://localhost:3000/products"; 
    const [mydata, setData] = useState([]); 
    const fetchDataFun = async () => {
        try {
            const res = await getPost();
            setData(res.data);
            // console.log(res.data);
        } catch (error) {
            console.log(error, 'error to featchin data from axios method');
        }
    }
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
            }
            else {
                'failed to delete', delResponse.status
            } 
        }
        catch (error) {
            console.log(error)
        } 
    }
    return (
        <>
            <section>
                <AddProduct mydata={mydata} setData={setData} />
            </section>
            <section>
                <ol className='card-parent'>
                    {
                        mydata.map((currentElement) => {
                            const { id, productname, price } = currentElement;
                            return (
                                <li key={id} className='card-list'>
                                    <div className='product-card'>
                                        <div>
                                            Card: {id}
                                        </div>
                                        <div>
                                            Name: {productname}
                                        </div>
                                        <div>
                                            Price: {price}
                                        </div>
                                        <div className='btn-group'>
                                            <button className='edit-btn'>Edit</button>
                                            <button className='del-btn' onClick={() => handleDeleteProduct(id)}>Delete</button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ol>
            </section>
        </>
    )
}

export default Products