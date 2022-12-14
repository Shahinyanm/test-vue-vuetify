import axios from 'axios'

/**

 @returns {AxiosInstance}
 */

export const getInstance = () => {
    const axiosInstance = axios.create({
        headers: {
            'Accept': 'application/json',
        },
    })

    axiosInstance.interceptors.response.use((r) => r, async ({response}) => response)

    return axiosInstance
}