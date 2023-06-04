import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IAdoptionRequest } from '../../models/adoptionRequest.interface'
export interface IRequestTile {
    adoptionRequest: IAdoptionRequest
    toggleDrawer: Function
}

const RequestTile = ({ adoptionRequest, toggleDrawer }: IRequestTile) => {
    const { _id, status, date_submitted } = adoptionRequest
    const api_url = process.env.VM_API_URL || 'http://localhost:3001'
    const [petName, setPetName] = useState('')
    const [petFilename, setFilename] = useState('')
    const navigate = useNavigate()

    const navigateToConfirmation = () => {
        navigate('../payment', { state: _id })
        toggleDrawer()
    }

    useEffect(() => {
        setPetName(adoptionRequest.pet[0].name)
        setFilename(adoptionRequest.pet[0].filename)
    }, [adoptionRequest])

    return (
        <div className="request-tile_wrapper" key={_id}>
            <div className="request-tile" key={_id}>
                <img height="70" width="70" src={api_url + petFilename + '_medium.avif'} />
                <div className="request-tile__info">
                    <h3>{petName}</h3>
                    <p>Submitted: {dayjs(date_submitted).format('DD-MM-YYYY')}</p>
                    <p>
                        Status:{' '}
                        <span className="status">
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                    </p>
                </div>
            </div>
            <div>
                {status === 'approved' && (
                    <button
                        className="btn_filled_dark btn_adoption_payment"
                        onClick={navigateToConfirmation}
                    >
                        Confirm & Pay
                    </button>
                )}
            </div>
        </div>
    )
}

export default RequestTile
