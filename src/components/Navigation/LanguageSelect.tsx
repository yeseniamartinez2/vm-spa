import * as React from 'react'
export const LanguageSelect = ({ changeLanguage }: any) => {
    const [language, setLanguage] = React.useState('en')

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as string)
        changeLanguage(event.target.value as string)
    }

    return (
        <div className="language-select__wrapper">
            {language === 'en' ? (
                <img src={process.env.PUBLIC_URL + '/usaflag.png'} width={40} height={30} />
            ) : (
                <img src={process.env.PUBLIC_URL + '/prflag.png'} width={40} height={30} />
            )}
            <select
                id="langSelect"
                className="lang-menu__select"
                value={language}
                onChange={(e) => handleChange(e)}
            >
                <option key={'en'} value={'en'}>
                    EN
                </option>
                <option key={'es'} value={'es'}>
                    ES
                </option>
            </select>
        </div>
    )
}
