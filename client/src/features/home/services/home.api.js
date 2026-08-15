import axios from "axios";

let linkAxiosInstance = axios.create({
    baseURL:'/api/links',
})

export const getLinks = async ({username}) => {
    const response = await linkAxiosInstance.get(`/${username}`);
    console.log(response.data)
    return response.data;


}