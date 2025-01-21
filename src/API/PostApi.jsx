import axios from "axios";

const api=  axios.create({
    baseURL: "http://localhost:3004/", 
});

// --------create-method--

export const getPost= ()=>{
     return api.get("/products");
} 
export const deletePost= (id)=>{
     return api.delete(`/products/${id}`);
} 
export const addDataToAPI= (item)=>{
     return api.post("/products", item);
} 

export const updateDataToAPI= (id, item)=>{
     return api.put(`/products/${id}`, item);
} 