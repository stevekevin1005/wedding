import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ImageList from './pages/ImageList'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/image-list" element={<ImageList />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
