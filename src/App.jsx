import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ImageList2 from './pages/ImageList2'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/image-list" element={<ImageList2 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
