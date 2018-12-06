import React from 'react'
import styled from 'styled-components'

const Container = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 32px;
  height: 160px;
  width: 400px;
  cursor: pointer;
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`

const Thumbnail = styled.img.attrs({
  width: '160',
  height: 'auto',
})`
  height: 80px;
  width: 80px;
  object-fit: cover;
  margin-right: 16px;
`

const Name = styled.h3`
  color: blue;
  margin: 0 0;
`

const ThingiverseCard = ({ url, name, link }) => (
  <Container href={link} target={'_blank'}>
    <Thumbnail src={url} />
    <Name>{name}</Name>
  </Container>
)

export default ThingiverseCard
