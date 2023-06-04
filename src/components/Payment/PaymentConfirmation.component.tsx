import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdoptionRequestService from '../../services/adoptionRequest.service'

function PaymentConfirmation() {
    const ars = new AdoptionRequestService()
    const { petId } = useParams()

    const changeRequestStatus = (id: string | undefined) => {
        const body = {
            id: id,
            status: 'completed',
        }
        console.log('🌿 ~ file: CheckoutForm.component.tsx:17 ~ changeRequestStatus ~ body:', body)
        if (id)
            ars.updateAdoptionRequestStatus(body).then((res) => {
                if (res.status !== 200) {
                }
            })
    }

    useEffect(() => {
        changeRequestStatus(petId)
    }, [])
    return (
        <div className="payment-confirmation__container">
            <h2>Successful payment! 🎉</h2>
            <p>
                You will receive a notification with furhter instructions to complete the adoption
                process.
            </p>
        </div>
    )
}

export default PaymentConfirmation
