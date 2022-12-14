import { getInstance } from '@/axios'

export const userService = {
    async createUser (userData) {
        const { data } = await getInstance().post('http://127.0.0.1:8000/authUser/create', userData)
        return data
    },
}