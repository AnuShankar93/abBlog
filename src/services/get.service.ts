import API from 'api/Api';

export const get = (endpoint:string) => {
    return new Promise((resolve, reject) => {
        API.get(endpoint)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

