import React from 'react'
import api from '../../services/api'
import { Background, Container, Title, Text, Button } from './styles';
import { AiOutlineLike } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import Badge from 'react-bootstrap/Badge';

export default function Table({ data, visible, color, liked }) {
    function like(noticia) {
        api.post(`/liked`, noticia).then(({ data }) => {
        }).catch((error) => {
            alert("Erro ao dar like na notícia!!")
            console.log(error)
        })
        api.delete(`/news/${noticia.id}`).then(({ data }) => {
            window.location.reload();
        })
    }
    return (
        <>
            <div>
                <Background>
                    {data.map(noticia => (
                        <Container key={noticia.id} color={color}>
                            <Title>{noticia.title}  </Title>
                            {visible &&
                                <div>
                                    <AiOutlineLike size={"2em"} onClick={event => like(noticia)} />
                                    {noticia.tags.map(tag => (
                                        <Badge key={tag.id} bg="secondary" style={{ marginLeft: "4px" }}>{tag.Text}</Badge>
                                    ))}
                                </div>
                            }
                            {liked &&
                                <div>
                                    <BsHeart size={"2em"} color={color} />
                                    {noticia.tags.map(tag => (
                                        <Badge key={tag.id} bg="danger" style={{ marginLeft: "4px" }}>{tag.Text}</Badge>
                                    ))}
                                </div>
                            }

                            <Text>{noticia.text}</Text>
                            <Button as="a" href={noticia.link} color={color}>Link da notícia</Button>
                        </Container>

                    ))}
                </Background>

            </div>
        </>
    )
}
