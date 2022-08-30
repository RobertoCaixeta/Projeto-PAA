import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Table from '../../components/Table';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Disliked() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        api.get(`/news`).then(({ data }) => {
            setNews(data)
        })
    }, []);
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/disliked">Disliked</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">News</Nav.Link>
                        <Nav.Link href="/liked">Liked</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <Table data={news} visible={false} color={"#0d6efd"}/>
        </>
    )
}
