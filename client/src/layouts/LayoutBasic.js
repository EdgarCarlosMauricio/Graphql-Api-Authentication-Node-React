import React from "react";
import { Container } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header/Header";

export default function LayoutBasic(props) { 
    console.log(props);
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}