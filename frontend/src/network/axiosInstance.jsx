import axios from 'axios'

export const BASE_URL = 'http://localhost:8080/api/todoapp';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

export const network = {
    getAll: async (url) => {

        let responseData = [];
        await axiosInstance.get(`${url}`)
            .then(res => {
                responseData = res.data;
            })
            .catch(err => {
                console.log('Error', err);
                throw err
            })
        return responseData;
    },
    addItem: async (url, data) => {
        await axiosInstance.post(`${url}`, data);
    },
    updateItem: async (url, id, data) => {
        await axiosInstance.put(`${url}/${id}`, data)
    },
    deleteItem: async (url, id) => {
        await axiosInstance.delete(`${url}/${id}`)
    },
}