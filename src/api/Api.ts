import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8888/wp-json/wp/v2'
})