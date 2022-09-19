import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Background, Container, Title, Text, Button } from './styles';
import { AiOutlineLike } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import Badge from 'react-bootstrap/Badge';

export default function Table({ data, visible, color, liked }) {
    const [news, setNews] = useState([]);

    function like(noticia) {
        /*api.get(`/liked`).then(({ data }) => {
            setNews(data)
        })*/
        api.delete(`/news/${noticia.id}`).then(({ data }) => {
            window.location.reload();
        })
        /*noticia.id = news.length + 1
        console.log(noticia.id)*/
        api.post(`/liked`, noticia).then(({ data }) => {
        }).catch((error) => {
            alert("Erro ao dar like na notícia!!")
            console.log(error)
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

                                    <Badge bg="secondary" style={{ marginLeft: "4px" }}>{noticia.tag}</Badge>

                                </div>
                            }
                            {liked &&
                                <div>
                                    <BsHeart size={"2em"} color={color} />

                                    <Badge bg="danger" style={{ marginLeft: "4px" }}>{noticia.tag}</Badge>

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
