import axios from 'axios'
const baseURL = process.env.VM_API_URL + 'pets/'

export default class PetService {
    getPets() {
        return axios.get(baseURL)
    }

    addPet(body: FormData) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                //Authorization: `Bearer ${token}`,
            },
        }
        return axios.post(baseURL, body, config)
    }

    getPetById(id: string | null | undefined) {
        return axios.get(baseURL + id)
    }

    deletePetById(id: string, token: string) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axios.delete(baseURL + id, config)
    }

    putPet(id: string, body: FormData) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        return axios.put(baseURL + id, body, config)
    }
}
