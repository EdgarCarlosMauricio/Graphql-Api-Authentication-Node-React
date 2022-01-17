import React from 'react';
import "./RightHeader.scss";
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
import avatarNoFound from "../../../assets/png/avatar.png";

export default function RightHeader() {
    const { auth } = useAuth();

    return (
            
        <div className='right-header'>
            <Link to={"/"}>
                <Icon name='home' /> 
            </Link>
            <Icon name='plus' /> 
            <Link to={`/${auth.username}`}>
                <Image src={avatarNoFound} avatar />
            </Link>
        </div>
            
    )
}

