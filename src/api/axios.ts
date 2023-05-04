import axios from 'axios';

export default axios.create({
    baseURL: 'https://ws-api.alphadev.se/'
})