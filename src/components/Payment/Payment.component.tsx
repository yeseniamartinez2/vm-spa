import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CheckoutForm from '../CheckoutForm/CheckoutForm.component'

function Payment() {
    const [stripePromise, setStripePromise] = useState<any>(null)
    const [clientSecret, setClientSecret] = useState('')
    const location = useLocation()

    useEffect(() => {
        console.log(
            '🌿 ~ file: Payment.component.tsx:37 ~ Payment ~ location.state._id:',
            location.state
        )

        fetch('http://localhost:3001/config').then(async (r) => {
            const { publishableKey } = await r.json()
            setStripePromise(loadStripe(publishableKey))
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify({}),
        }).then(async (result) => {
            var { clientSecret } = await result.json()
            setClientSecret(clientSecret)
        })
    }, [])

    return (
        <>
            <h2 className="payment-form__heading">Adoption Fee Payment $50</h2>
            <div className="payment-form__container">
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm id={location.state} />
                    </Elements>
                )}
            </div>
        </>
    )
}

export default Payment
