import './Profile.scss';

import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';

import AvatarNoFound from '../../assets/png/avatar.png';
import { GET_USER } from '../../gql/user';
import userAuth from '../../hooks/useAuth';
import ModalBasic from '../Modal/ModalBasic/ModalBasic';
import AvatarForm from '../User/AvatarForm';
import UserNotFound from '../UserNotFound';

export default function Profile(props) {
    const { username } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childenModal, setChildenModal] = useState(null);
    const { auth } = userAuth();
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            username,
        }
    });
    if (loading) return null;
    if (error) return <UserNotFound />
    
    const { getUser } = data;


    const handlerModal = (type) => {
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar Foto De Perfil");
                setChildenModal(<AvatarForm setShowModal={setShowModal}></AvatarForm>);
                setShowModal(true);
                break;
        
            default:
                break;
        }
     }

    return (
        <>
            <Grid className='profile'>
                <Grid.Column width={5} className='profile__left'>
                    <Image src={AvatarNoFound} avatar onClick={() => username===auth.username && handlerModal("avatar")}></Image>
                </Grid.Column>
                <Grid.Column width={11} className='profile__right'>
                    <div>HeaderProfile</div>
                    <div>Followers</div>
                    <div className='other'>
                        <p className='name'>{getUser.name}</p>
                        {getUser.siteWeb && (
                            <a href={getUser.siteWeb} className='siteWeb'>{getUser.siteWeb}</a>
                        )}
                        {getUser.description && (
                            <p className='description'>{getUser.description}</p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childenModal}
            </ModalBasic>
        </>
    )
}
