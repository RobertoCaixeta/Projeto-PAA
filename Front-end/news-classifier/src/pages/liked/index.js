import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Table from '../../components/Table';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Liked() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        api.get(`/news`).then(({ data }) => {
            setNews(data)
        })
    }, []);
    return (
        <>
            <Navbar bg="danger" variant="dark">
                <Container>
                    <Navbar.Brand href="#liked">Liked</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">News</Nav.Link>
                        <Nav.Link href="/disliked">Disliked</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <Table data={news} visible={false}  color={"#dc3545"}/>
        </>
    )
}
