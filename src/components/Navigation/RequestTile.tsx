import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
    const { t } = useTranslation()

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
                    <p>
                        {t('adoption_reqs.submitted')}: {dayjs(date_submitted).format('DD-MM-YYYY')}
                    </p>
                    <p>
                        {t('adoption_reqs.status')}:{' '}
                        <span className="status">{t(`adoption_reqs.${status}`)}</span>
                    </p>
                </div>
            </div>
            <div>
                {status === 'approved' && (
                    <button
                        className="btn_filled_dark btn_adoption_payment"
                        onClick={navigateToConfirmation}
                    >
                        {t('adoption_reqs.pay_btn')}
                    </button>
                )}
            </div>
        </div>
    )
}

export default RequestTile
