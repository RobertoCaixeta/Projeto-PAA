import React from 'react'
import { Background, Container, Title, Text, Button } from './styles';
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";

export default function Table({ data, visible, color, liked }) {
    return (
        <>
            <div>
                <Background>
                    {data.map(noticia => (
                        <Container key={data.id} color={color}>
                            <Title>{noticia.title}  </Title>
                            {visible &&
                                <div>
                                    <AiOutlineLike size={"2em"} />
                                    <AiOutlineDislike size={"2em"} />
                                </div>
                            }
                            {liked &&
                                <div>
                                    <BsHeart size={"2em"} color={color}/>
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
