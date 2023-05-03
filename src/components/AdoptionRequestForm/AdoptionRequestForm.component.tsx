import { FunctionComponent } from 'react'

const AdoptionRequestForm: FunctionComponent = () => {
    return (
        <div className="adoption-request__container">
            <h2>Adoption Request</h2>
            <form>
                <input type="tel" /> <input type="number" /> <input type="text" />
            </form>
        </div>
    )
}

export default AdoptionRequestForm
