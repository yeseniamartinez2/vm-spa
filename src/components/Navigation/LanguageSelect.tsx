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
                <img src={process.env.PUBLIC_URL + '/usa_flag.png'} width={40} height={30} />
            ) : (
                <img
                    src={process.env.PUBLIC_URL + '/puerto_rico_flag.png'}
                    width={40}
                    height={30}
                />
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
        // <FormControl sx={{ minWidth: 120 }} size="small">
        //     <Select
        //         labelId="demo-simple-select-label"
        //         id="demo-simple-select"
        //         value={language}
        //         onChange={handleChange}
        //         className="lang-menu__select"
        //     >
        //         <MenuItem className="lang-menu__item" value={'en'}>
        //             <img src={process.env.PUBLIC_URL + '/usa_flag.png'} width={30} height={30} />{' '}
        //             <p>EN</p>
        //         </MenuItem>
        //         <MenuItem className="lang-menu__item" value={'es'}>
        //             <img
        //                 src={process.env.PUBLIC_URL + '/puerto_rico_flag.png'}
        //                 width={30}
        //                 height={30}
        //             />{' '}
        //             <p>ES</p>
        //         </MenuItem>
        //     </Select>
        // </FormControl>
    )
}
