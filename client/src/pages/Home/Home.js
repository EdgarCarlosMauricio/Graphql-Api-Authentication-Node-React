import './Home.scss';

import isJwtTokenExpired from 'jwt-check-expiry';
import { useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getToken, removeToken } from '../../utils/token';

export default function Home() {
    let navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate("/");
        } else {
            const tokenValido = isJwtTokenExpired(token);
            if (tokenValido) {
                removeToken();
                navigate("/");
            }
        }
    }, []);

    
    return (
        <div>
            <h1>Estamos En La Home</h1>
        </div>
    )
}
