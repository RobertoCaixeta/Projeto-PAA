import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  width: 50vw;
  min-height: 100vh;
  justify-content: center;
  flex-direction: column; 
  padding: 1%;
  margin: 0 auto 0 auto;
`;

export const Container = styled.div`
  display: flex;
  border-style:solid;
  border-color: black;
  border-radius: 20px;
  justify-content: center;
  flex-direction: column; 
  padding: 1em;
  margin-bottom: 1em;
`
export const Title = styled.h1`
  font-weight: bold;
`

export const Text = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-size: 18px;
`
export const Button = styled.button`
  color: #ff4d4d;
  font-size: 1em;
  margin: 1em 0;
  padding: 0.5em 1em;
  border: 2px solid #ff4d4d;
  border-radius: 10px;
  width: 9em;
`;
