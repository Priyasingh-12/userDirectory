import axios from "axios";


const API = axios.create({
    baseURL:"http://localhost:5000/api" 
})

export const getUsers = () =>{
 return API.get("/users");
};

export const getUser = (id) => {
    return API.get(`/users/${id}`)
}

export const createUser = (data)=>{
 return API.post("/users",data);
};


export const updateUser = (id,data)=>{
 return API.put(`/users/${id}`,data);
};


export const deleteUser = (id)=>{
 return API.delete(`/users/${id}`);
};