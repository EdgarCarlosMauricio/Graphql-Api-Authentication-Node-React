import './Header.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Image } from 'semantic-ui-react';

import logo from '../../assets/png/instaclone.png';
import RightHeader from './RightHeader/RightHeader';
import SearchX from './SearchX/SearchX';

export default function Header() {
    return (
        <div className='header'>
            <Container>
                <Grid>
                    <Grid.Column width={3} className="header__logo">
                        <Link to={"/"}>
                            <Image src={logo} />
                       </Link>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <SearchX />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <RightHeader />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}
