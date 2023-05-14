import axios from 'axios'
const baseURL = process.env.VM_API_URL + 'adoption-requests/'

export default class AdoptionRequestService {
    getAdoptionRequests() {
        return axios.get(baseURL)
    }

    addAdoptionRequest(body: Object) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${token}`,
            },
        }
        return axios.post(baseURL, body, config)
    }

    deleteAdoptionRequestById(id: string) {
        const config = {
            headers: {
                //Authorization: `Bearer ${token}`,
            },
        }
        return axios.delete(baseURL + id, config)
    }

    updateAdoptionRequestStatus(body: Object) {
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        return axios.put(baseURL, body, config)
    }

    getRequestById(id: string | null | undefined) {
        return axios.get(baseURL + id)
    }

    getRequestsByUser(email: string | null | undefined) {
        return axios.get(process.env.VM_API_URL + 'user-adoption-requests/' + email)
    }
}
