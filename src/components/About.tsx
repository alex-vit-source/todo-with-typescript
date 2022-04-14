import React from 'react'
import { useNavigate } from "react-router-dom";

export const About: React.FC = () => {
    const navigate = useNavigate();


    return (
        <>
            <h4>О сайте:</h4>
            <p>Приложение для организации списка дел</p>
            <button className='btn' onClick={() => navigate(`/`)}>К списку дел</button>
        </>
    )
}

//// logout и login восстановить