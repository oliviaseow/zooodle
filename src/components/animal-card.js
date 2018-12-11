import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`

const Title = styled.h2``

const Text = styled.h3``

const getRandomFact = facts => {
  const factsList = facts.split('.')
  return factsList[Math.floor(Math.random() * factsList.length)]
}

const AnimalCard = ({
  animal,
  taxonomyClass,
  diet,
  element,
  facts,
  home,
  legs,
}) => (
  <Container>
    <Title>Name: {animal.toUpperCase()}</Title>
    <Text>Class: {taxonomyClass}</Text>
    <Text>Diet: {diet}</Text>
    <Text>Element: {element}</Text>
    <Text>Home: {home}</Text>
    <Text>Legs: {legs}</Text>
    <Text>Fact: {getRandomFact(facts)}</Text>
  </Container>
)

export default AnimalCard
