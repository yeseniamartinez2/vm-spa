import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import { MenuContainer } from './components/Menu/Menu.container'
const App = () => {
    return (
        <>
            <MenuContainer />
            <Routes>
                <Route index element={<Home />} />
            </Routes>
        </>
    )
}

export default App
