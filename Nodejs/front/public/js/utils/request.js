export class Request {
    constructor(baseURL = 'http://localhost:3000') {
        return axios.create({
            baseURL,
            withCredentials: true,
        })
    }
}

export default new Request()
