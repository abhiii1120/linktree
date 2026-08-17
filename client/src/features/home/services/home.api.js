import axios from "axios";

let linkAxiosInstance = axios.create({
    baseURL:'/api/public/links',
})

export const getLinks = async ({username}) => {
    const response = await linkAxiosInstance.get(`/${username}`);
    console.log(response.data)
    return response.data;
}

export const linkClick = async ({linkId}) => {
    const res = await linkAxiosInstance.patch(`/${linkId}/click`);
    console.log(res.data);
    return res.data;
}