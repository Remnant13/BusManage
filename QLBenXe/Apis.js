import axios from "axios";

//nhớ sửa nha, IPv4 nghen
const HOST = "https://linhhv.pythonanywhere.com"; 
const urlBaseImg = "https://res.cloudinary.com/dx9aknvnz/";

export const endpoints = {
    'busCompany': "/bus-company/",
    'tickets': "/tickets/",
    'deliveries': "/deliveries/",
    'users': "/users/",
    'busRoute': "/busroute/",
    'trips': "/trips/",
    'revenueStatistics': "/revenuestatic/",
    'login': '/o/token/',
    'current_user': '/users/current_user/',
    'register': '/users/',
};

export const authApi = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: HOST
})
