import React from 'react'
import { Background, Container, Title, Text, Button} from './styles';



export default function Table({ props }) {
    console.log(props)
    return (
        <>
            <div>
                <Background>
                    {props.map(noticia => (
                        <Container key={props?.id}>
                            <Title>{noticia.title}</Title>
                            <Text>{noticia.text}</Text>
                            <Button as="a" href={noticia.link}>Link da notícia</Button>
                        </Container>

                    ))}
                </Background>

            </div>
        </>
    )
}
