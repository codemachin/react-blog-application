import axios from "axios";

const authToken = 'OTZjYjc3Njg1Yzk0ODgxYWU2OGE0ODU2MWI5ZWY2OWFjOGY0ODc3OTRiZmViNzk1ZDI3YWY2NjhlY2E4ZDkxOWM0ZTM5NmU1YzFkM2I0YmM3MDg3NjhhYjZjOGY5MmY2YzUwNDc0OTIwNjY2YmI0YTU3OWRkYjkwY2M2NDU4MmNkYw=='
const baseUrl = 'https://blogapp.edwisor.com/api/v1/blogs';

export const getAllBlogs = () => new Promise((resolve, reject) => {
    axios.get(baseUrl + '/all?authToken=' + authToken)
        .then(result => resolve(result))
        .catch(err => reject(err));
});

export const getSingleBlog = (currentBlogId) => new Promise((resolve, reject) => {
    axios.get(baseUrl + '/view/' + currentBlogId +'?authToken=' + authToken)
        .then(result => resolve(result))
        .catch(err => reject(err));
});

export const createBlog = (blogData) => new Promise((resolve, reject) => {
    axios.post(baseUrl + '/create' + '?authToken=' + authToken, blogData)
        .then(result => resolve(result))
        .catch(err => reject(err));
})

export const deleteBlog = (blogId) => new Promise((resolve, reject) => {
    let data = {}
    axios.post(baseUrl + '/' + blogId + '/delete' + '?authToken=' + authToken, data)
        .then(result => resolve(result))
        .catch(err => reject(err));
})

export const editBlog = (blogId, blogData) => new Promise((resolve, reject) => {
    axios.put(baseUrl + '/' + blogId + '/edit' + '?authToken=' + authToken, blogData)
        .then(result => resolve(result))
        .catch(err => reject(err));
})