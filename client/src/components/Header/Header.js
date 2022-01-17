import React from 'react';
import "./Header.scss";
import { Container, Grid, Image } from 'semantic-ui-react';
import logo from "../../assets/png/instaclone.png";
import { Link } from 'react-router-dom';
import RightHeader from './RightHeader/RightHeader';

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
                        <p>Buscador</p>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <RightHeader />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}
