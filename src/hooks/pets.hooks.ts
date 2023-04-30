import { useEffect, useState } from 'react'
import PetService from '../services/pets.service'
export const usePetsService = (initial: any, id: string | null | undefined) => {
    const ps = new PetService()
    const [data, setData] = useState(initial)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchPets = async () => {
            setError(false)
            setLoading(true)
            try {
                let res
                if (id !== null) res = await ps.getPetById(id)
                else res = await ps.getPets()
                setData(res.data)
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchPets()
    }, [id])
    return { data, loading, error }
}
