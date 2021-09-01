import { message } from 'antd'
import axios from 'axios'

export default function request(url, data, method = 'GET') {
    return new Promise(resolve => {
        let result
        if (method === 'GET') {
            result = axios.get(url, {
                params: data,
                headers: { 'Content-Type': 'application/json' }
            })
        } else if (method === 'POST') {
            result = axios.post(url, data, {
                headers: { 'Content-Type': 'application/json' }
            })
        }
        else if (method === 'PUT') {
            result = axios.put(url, data, {
                headers: { 'Content-Type': 'application/json' }
            })
        }
        else if (method === 'DELECT') {
            result = axios.delete(url, {
                headers: { 'Content-Type': 'application/json' }
            })
        }
        result.then(response => {
            resolve(response.data)
        }).catch(err => {
            message.error('出错了')
        })
    })
}