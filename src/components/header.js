import React from 'react'
import styled from 'styled-components'

const Container = styled.header`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  height: 80px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
`

const Title = styled.h2`
  color: blue;
  margin: 0 0;
`

const Header = () => (
  <Container>
    <Title>zooodle</Title>
  </Container>
)

export default Header
