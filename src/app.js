import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PhotoImporter from './components/photo-importer'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default class App extends Component {
  state = {
    path: '',
  }

  onUpload = path => {
    this.setState({ path })
  }

  render() {
    return (
      <Container>
        <PhotoImporter onUpload={this.onUpload} />
      </Container>
    )
  }
}
