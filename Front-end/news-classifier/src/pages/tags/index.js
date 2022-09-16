import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Background } from './styles';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function Tags() {
    const [tags, setTags] = useState([]);

    const [tagsSelecionadas, setSelecionarTag] = useState([])


    useEffect(() => {
        api.get(`/tags`).then(({ data }) => {
            setTags(data)
        })
        api.get(`/tagsSelecionadas`).then(({ data }) => {
            setSelecionarTag(data)
        })
    }, []);


    function handleRemoveTag(tag) {
        setTags(prevTags => [...prevTags, tag])
        const newTags = tagsSelecionadas.filter((tags) => tags.id !== tag.id);
        setSelecionarTag(newTags);
    }

    function selecionarTag(tag) {
        setSelecionarTag(prevTags => [...prevTags, tag])
        const newTags = tags.filter((tags) => tags.id !== tag.id);
        setTags(newTags);
    }

    function selecionarTags() {

        api.post(`/tagsSelecionadas`, tagsSelecionadas).then(({ data }) => {

        })
        api.post(`/tags`, tags).then(({ data }) => {

        })
        

    }


    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Tags</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/news">News</Nav.Link>
                        <Nav.Link href="/liked">Liked</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <Background>
                <div>
                    <h1>Tags Disponíveis</h1>
                    {tags.map(tag => (
                        <h1 style={{ display: "inline", margin: "10px" }} key={tag.id}>
                            <Badge onClick={() => selecionarTag(tag)} bg="secondary">{tag.Text}</Badge>
                        </h1>
                    ))}


                    <h1 style={{ marginTop: "100px" }}>Tags Selecionadas</h1>
                    {tagsSelecionadas.map(tag => (
                        <h1 style={{ display: "inline", margin: "10px" }} key={tag.id}>
                            <Badge onClick={() => handleRemoveTag(tag)} bg="primary">{tag.Text}</Badge>
                        </h1>
                    ))}
                </div>
                <Button variant="secondary" style={{ marginTop: "100px" }} onClick={selecionarTags}>Selecionar Tags</Button>

            </Background>
        </>
    )
}
