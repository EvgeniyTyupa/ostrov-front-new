import * as axios from "axios";

// const baseURL = 'https://sub.ostrovokdetstva.com/api';
const baseURL = 'http://localhost:3002/api';

const instance = axios.create({
    baseURL: baseURL
});

instance.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.usertoken}`;
        return config;
    }
);

export const itemsApi = {
    getItems(pageNumber, pageSize, searchBy, from, searchingValue) {
        return instance.get(`/item?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}`)
        .then(response => response.data)
    },
    createItem(data) {
        const newFormData = new FormData();

        for(const [key, value] of Object.entries(data)){
            if(key === "images") {
                value.forEach(i => {
                    newFormData.append("images[]", i)
                })
            }else {
                newFormData.append(key, value)
            }
        }

        return axios.post(`${baseURL}/item`, newFormData,{
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.usertoken}`
            }
        })
        .then(resposne => resposne.data);
    },
    updateItem(data) {
        const newFormData = new FormData()

        for(const [key, value] of Object.entries(data)){
            if(key === "images") {
                value.forEach(i => {
                    newFormData.append("images[]", i)
                })
            }else {
                newFormData.append(key, value)
            }
        }
    },
    deleteItem(itemId) {
        return instance.delete(`${baseURL}/item/${itemId}`)
        .then(response => response.data)
    }
}

export const brandApi = {
    getBrands(pageNumber, pageSize, searchBy, from, searchingValue) {
        return instance.get(`/brand?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}`)
        .then(response => response.data)
    }
}

export const categoryApi = {
    getAllCategories(pageNumber, pageSize, searchBy, from, searchingValue) {
        return instance.get(`/category/all?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}`)
        .then(response => response.data)
    }
}

export const tagApi = {
    getTags(pageNumber, pageSize, searchBy, from, searchingValue) {
        return instance.get(`/tag?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}`)
        .then(response => response.data)
    }
}