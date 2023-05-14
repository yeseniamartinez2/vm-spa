import { useEffect, useState } from 'react'
import AdoptionRequestService from '../services/adoptionRequest.service'
export const useAdoptionRequestsService = (initial: any, email: string | null | undefined) => {
    const ars = new AdoptionRequestService()
    const [data, setData] = useState(initial)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchAdoptionRequests = async () => {
            setError(false)
            setLoading(true)
            try {
                let res
                if (email !== null) res = await ars.getRequestsByUser(email)
                else res = await ars.getAdoptionRequests()
                setData(res.data)
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchAdoptionRequests()
    }, [email])
    return { data, loading, error }
}
