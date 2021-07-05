import { message } from 'antd'
import axios from 'axios'

export default function request(url, data, method = 'GET') {
    return new Promise(resolve => {
        let result
        if (method === 'GET') {
            result = axios.get(url, {
                params: data,
            })
        } else if (method === 'POST') {
            result = axios.post(url, data)
        }
        result.then(response => {
            resolve(response.data)
        }).catch(err => {
            message.error('出错了', err)
        })
    })
}