import axios from "axios";

const URL = "http://127.0.0.1:8000"; 

export const endpoints = {
    'busCompanies': "/buscompanies/",
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
    baseURL: URL,
    headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json" 
    }
});

export default axios.create({
    baseURL: URL
});
