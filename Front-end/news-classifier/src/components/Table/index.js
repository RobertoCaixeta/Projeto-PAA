import React from 'react'
import { Background, Container, Title, Text, Button } from './styles';
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

export default function Table({ data, visible }) {
    return (
        <>
            <div>
                <Background>
                    {data.map(noticia => (
                        <Container key={data.id}>
                            <Title>{noticia.title}  </Title>
                            {visible &&
                                <div>
                                    <AiOutlineLike size={"2em"} />
                                    <AiOutlineDislike size={"2em"} />
                                </div>
                            }

                            <Text>{noticia.text}</Text>
                            <Button as="a" href={noticia.link}>Link da notícia</Button>
                        </Container>

                    ))}
                </Background>

            </div>
        </>
    )
}
