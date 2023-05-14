import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { IAdoptionRequest } from '../../models/adoptionRequest.interface'
export interface IRequestTile {
    adoptionRequest: IAdoptionRequest
}

const RequestTile = ({ adoptionRequest }: IRequestTile) => {
    const { _id, status, date_submitted } = adoptionRequest
    const api_url = process.env.VM_API_URL || 'http://localhost:3001'
    const [petName, setPetName] = useState('')
    const [petFilename, setFilename] = useState('')

    useEffect(() => {
        setPetName(adoptionRequest.pet[0].name)
        setFilename(adoptionRequest.pet[0].filename)
    }, [adoptionRequest])

    return (
        <div className="request-tile" key={_id}>
            <img height="70" width="70" src={api_url + petFilename + '_medium.avif'} />
            <div className="request-tile__info">
                <h3>{petName}</h3>
                <p>Submitted: {dayjs(date_submitted).format('DD-MM-YYYY')}</p>
                <p>Status: {status.charAt(0).toUpperCase() + status.slice(1)}</p>
            </div>
        </div>
    )
}

export default RequestTile
