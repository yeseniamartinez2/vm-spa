import React from "react"
const UnderConstruction = () => {
    return (
        <section className="under-construction">
            <img
                id="under-construction"
                height={'50%'}
                src={process.env.PUBLIC_URL + '/construction.svg'}
            />
            <span>This page is under construction.</span>
        </section>
    )
}

export default UnderConstruction