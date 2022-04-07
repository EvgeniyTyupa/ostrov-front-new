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

export const userApi = {
    login(data) {
        return instance.post(`/auth/login`, data)
        .then(response => response.data)
    },
    getProfile() {
        return instance.get(`/auth/me`)
        .then(response => response.data)
    }
}

export const itemsApi = {
    getItems(pageNumber, pageSize, searchBy, from, searchingValue) {
        return instance.get(`/item?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}`)
        .then(response => response.data)
    },
    getItem(itemId){
        return instance.get(`/item/${itemId}`)
        .then(response => response.data)
    },
    getSame(tagsId, itemId){
        return instance.post('/item/same', { tagsId, itemId })
        .then(response => response.data)
    },
    getByBrandCategoryTag(pageNumber, pageSize, searchBy, from, searchingValue, filter){
        return instance.get(`/item/kind/by_kind?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}&filter=${filter}`)
        .then(response => response.data)
    },
    globalSearch(pageNumber, pageSize, searchBy, from, searchValue, filter) {
        return instance.get(`/item/search/${searchValue}?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&filter=${filter}`)
        .then(response => response.data)
    },
    selectItems(pageNumber, pageSize, filter, from, minAge, maxAge, minPrice, maxPrice, tag) {
        return instance.get(`/item/selector/search?limit=${pageSize}&count=${pageNumber}&filter=${filter}&from=${from}&minAge=${minAge}&maxAge=${maxAge}&minPrice=${minPrice}&maxPrice=${maxPrice}&tag=${tag}`)
        .then(response => response.data)
    },
    createItem(data) {
        const newFormData = new FormData()

        for(const [key, value] of Object.entries(data)){
            if(key === "images") {
                value.forEach(i => {
                    newFormData.append("images[]", i)
                })
            } else if(key === "tags") {
                value.forEach(i => {
                    newFormData.append("tags", i)
                })  
            } else {
                newFormData.append(key, value)
            }
        }

        return axios.post(`${baseURL}/item`, newFormData, {
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.usertoken}`
            }
        })
        .then(resposne => resposne.data);
    },
    updateItem(itemId, data) {
        const newFormData = new FormData()

        for(const [key, value] of Object.entries(data)){
            if(key === "images") {
                value.forEach(i => {
                    newFormData.append("images[]", i)
                })
            }else if(key === "tags") {
                value.forEach(i => {
                    newFormData.append("tags", i)
                })  
            }else {
                newFormData.append(key, value)
            }
        }

        return axios.patch(`${baseURL}/item/${itemId}`, newFormData, {
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.usertoken}`
            }
        })
        .then(resposne => resposne.data);
    },
    deleteItem(itemId) {
        return instance.delete(`/item/${itemId}`)
        .then(response => response.data)
    }
}

export const brandApi = {
    getBrands(pageNumber, pageSize, searchBy, from, searchingValue) {
        return instance.get(`/brand?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}`)
        .then(response => response.data)
    },
    getBrand(brandId) {
        return instance.get(`/brand/${brandId}`)
        .then(response => response.data)
    },
    addBrand(data) {
        const newFormData = new FormData()
        newFormData.append('name', data.name)
        newFormData.append('image', data.image[0], data.image[0].name)

        return axios.post(`${baseURL}/brand`, newFormData, {
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.usertoken}`
            }
        })
        .then(resposne => resposne.data);
    },
    editBrand(brandId, data) {
        const newFormData = new FormData()
        if(data.name){
            newFormData.append('name', data.name)
        }
        if(data.image) {
            newFormData.append('image', data.image[0], data.image[0].name)
        }
        return axios.patch(`${baseURL}/brand/${brandId}`, newFormData, {
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.usertoken}`
            }
        })
        .then(resposne => resposne.data);
    },
    deleteBrand(brandId) {
        return instance.delete(`/brand/${brandId}`)
        .then(response => response.data)
    }
}

export const categoryApi = {
    getAllCategoriesForSelect(){
        return instance.get(`/category/select`)
        .then(response => response.data)
    },
    getAllCategories(pageNumber, pageSize, searchBy, from, searchingValue) {
        return instance.get(`/category/all?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}`)
        .then(response => response.data)
    },
    getParentsCategories(categoryId) {
        return instance.get(`/category/parents/${categoryId}`)
        .then(response => response.data)
    },
    getMainCategoriesWithChildren(){
        return instance.get('/category/main')
        .then(response => response.data)
    },
    addCategory(data) {
        return instance.post(`/category`, data)
        .then(response => response.data)
    },
    editCategory(categoryId, data) {
        return instance.patch(`/category/${categoryId}`, data)
        .then(response => response.data)
    },
    deleteCategory(categoryId) {
        return instance.delete(`/category/${categoryId}`)
        .then(response => response.data)
    }
}

export const tagApi = {
    getTags(pageNumber, pageSize, searchBy, from, searchingValue) {
        return instance.get(`/tag?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}`)
        .then(response => response.data)
    },
    getHgTags() {
        return instance.get('/tag/hg')
        .then(response => response.data)
    },
    getTag(id) {
        return instance.get(`/tag/${id}`)
        .then(response => response.data)
    },
    addTag(data) {
        return instance.post(`/tag`, data)
        .then(response => response.data)
    },
    editTag(tagId, data) {
        return instance.patch(`/tag/${tagId}`, data)
        .then(response => response.data)
    },
    deleteTag(tagId) {
        return instance.delete(`/tag/${tagId}`)
        .then(response => response.data)
    }
}

export const newsApi = {
    getNews(pageNumber, pageSize, searchBy, from, searchingValue) {
        return instance.get(`/post?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}`)
        .then(response => response.data)
    },
    getPost(title){
        return instance.get(`/post/${title}`)
        .then(response => response.data)
    },
    addNews(data) {
        const newFormData = new FormData()

        for(const [key, value] of Object.entries(data)){
            if(key === "images") {
                value.forEach(i => {
                    newFormData.append("images[]", i)
                })
            } else if(key === "paragraphs") {
                value.forEach(i => {
                    newFormData.append("paragraphs", i)
                })  
            } else if(key === "paragraphs_ua") {
                value.forEach(i => {
                    newFormData.append("paragraphs_ua", i)
                })  
            } else {
                newFormData.append(key, value)
            }
        }

        return axios.post(`${baseURL}/post`, newFormData, {
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.usertoken}`
            }
        })
        .then(resposne => resposne.data);
    },
    getViewOnMainPosts() {
        return instance.get('/post/get/viewOnMain')
        .then(response => response.data)
    },
    setViewOnMain(postId) {
        return instance.patch(`/post/viewOnMain/${postId}`)
        .then(response => response.data)
    },
    editNews(newsId, data) {
        const newFormData = new FormData()

        for(const [key, value] of Object.entries(data)){
            if(key === "images") {
                value.forEach(i => {
                    newFormData.append("images[]", i)
                })
            } else if(key === "paragraphs") {
                value.forEach(i => {
                    newFormData.append("paragraphs", i)
                })  
            } else if(key === "paragraphs_ua") {
                value.forEach(i => {
                    newFormData.append("paragraphs_ua", i)
                })  
            } else {
                newFormData.append(key, value)
            }
        }

        return axios.patch(`${baseURL}/post/${newsId}`, newFormData, {
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.usertoken}`
            }
        })
        .then(resposne => resposne.data);
    },
    deleteNews(newsId) {
        return instance.delete(`/post/${newsId}`)
        .then(response => response.data)
    }
}

export const actionsApi = {
    getActions(pageNumber, pageSize, searchBy, from, searchingValue, isActual) {
        return instance.get(`/action?limit=${pageSize}&count=${pageNumber}&search_by=${searchBy}&from=${from}&searchingValue=${searchingValue}&isActual=${isActual}`)
        .then(response => response.data)
    },
    addAction(data) {
        const newFormData = new FormData()

        for(const [key, value] of Object.entries(data)){
            if(key === "image") {
                value.forEach(i => {
                    newFormData.append("image", i)
                })
            } else if(key === "image_mobile") {
                value.forEach(i => {
                    newFormData.append("image_mobile", i)
                })  
            } else if(key === "brands_id" && Array.isArray(value)) {
                value.forEach(i => {
                    newFormData.append("brands_id", i)
                })  
            } else if(key === "categories_id" && Array.isArray(value)) {
                value.forEach(i => {
                    newFormData.append("categories_id", i)
                })  
            } else if(key === "tags_id" && Array.isArray(value)) {
                value.forEach(i => {
                    newFormData.append("tags_id", i)
                })  
            } else if(key === "items_id" && Array.isArray(value)) {
                value.forEach(i => {
                    newFormData.append("items_id", i)
                })  
            } else if(key === "gift" && Array.isArray(value)) {
                value.forEach(i => {
                    newFormData.append("gift", i)
                })  
            } else {
                newFormData.append(key, value)
            }
        }

        return axios.post(`${baseURL}/action`, newFormData, {
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.usertoken}`
            }
        })
        .then(resposne => resposne.data);
    },
    editAction(actionId, data) {
        const newFormData = new FormData()

        for(const [key, value] of Object.entries(data)){
            if(key === "image") {
                value.forEach(i => {
                    newFormData.append("image[]", i)
                })
            } else if(key === "image_mobile") {
                value.forEach(i => {
                    newFormData.append("image_mobile[]", i)
                })  
            } else if(key === "brands_id" && Array.isArray(value)) {
                value.forEach(i => {
                    newFormData.append("brands_id", i)
                })  
            } else if(key === "categories_id" && Array.isArray(value)) {
                value.forEach(i => {
                    newFormData.append("categories_id", i)
                })  
            } else if(key === "tags_id" && Array.isArray(value)) {
                value.forEach(i => {
                    newFormData.append("tags_id", i)
                })  
            } else if(key === "items_id" && Array.isArray(value)) {
                value.forEach(i => {
                    newFormData.append("items_id", i)
                })  
            } else {
                newFormData.append(key, value)
            }
        }

        return axios.patch(`${baseURL}/action/${actionId}`, newFormData, {
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.usertoken}`
            }
        })
        .then(resposne => resposne.data);
    },
    deleteAction(actionId) {
        return instance.delete(`/action/${actionId}`)
        .then(response => response.data)
    }
}

export const reviewsApi = {
    getReviews(itemId, pageNumber, pageSize){
        return instance.get(`/comment/${itemId}?limit=${pageSize}&count=${pageNumber}`)
        .then(response => response.data)
    },
    addReview(data){
        return instance.post(`/comment`, data)
        .then(response => response.data)
    }
}