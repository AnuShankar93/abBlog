import API from 'api/Api';
import { AxiosResponse, AxiosError } from "axios";

export const getBlogList = (endpoint:string) => {
    return new Promise((resolve, reject) => {
        API.get(endpoint)
            .then((response: AxiosResponse) =>{
                const {headers} = response;
                const totalNumberOfPost = headers['x-wp-total']
                resolve({...response,totalNumberOfPost})
            })
            .catch((error: AxiosError) => {
                reject(error)
            })
    })
}

