import './RightHeader.scss';

import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';

import avatarNoFound from '../../../assets/png/avatar.png';
import { GET_USER } from '../../../gql/user';
import useAuth from '../../../hooks/useAuth';

export default function RightHeader() {
    const { auth } = useAuth();
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username: auth.username },
    });

    if (loading || error) return null;
    const { getUser } = data;

    return (
            
        <div className='right-header'>
            <Link to={"/"}>
                <Icon name='home' /> 
            </Link>
            <Icon name='plus' /> 
            <Link to={`/${auth.username}`}>
                <Image src={getUser.avatar ? getUser.avatar : avatarNoFound} avatar />
            </Link>
        </div>
            
    )
}

