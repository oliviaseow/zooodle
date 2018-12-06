import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PhotoImporter from './components/photo-importer'
import axios from 'axios'
//import cloudVisionCredentials from './cloud-vision.json'
import ModelViewer from './components/3d-model-viewer'

const requestTemplate = path => ({
  requests: [
    {
      image: {
        content: path,
      },
      features: [
        {
          type: 'LABEL_DETECTION',
          maxResults: 4,
        },
      ],
    },
  ],
})

const readImage = imageFile => {

  let reader = new FileReader()
  reader.readAsDataURL(imageFile)
  
  reader.onload = () => {
    let response = reader.result.split(',')[1]
    console.log({ response })
    axios
      .post(
        `https://vision.googleapis.com/v1/images:annotate?key=${'AIzaSyDFh9lBFoXxoYBdZ6iQwo2hRw213qPHeAQ'}`,
        requestTemplate(response)
      )
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default class App extends Component {
  state = {
    image: null,
  }

  onUpload = image => {
    readImage(image)
  }

  handleRequest = () => {
    // axios
    //   .get(
    //     `https://api.thingiverse.com/search/dogs?access_token=${'62cdb21d2b2b842088ac694a25058a55'}`
    //   )
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error))
    axios
      .get(
        `https://api.thingiverse.com/files/744827?access_token=${'62cdb21d2b2b842088ac694a25058a55'}`
      )
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  componentDidMount() {}

  render() {
    return (
      <Container>
        <PhotoImporter onUpload={this.onUpload} />
        <button onMouseDown={this.handleRequest}>request</button>
        <ModelViewer />
      </Container>
    )
  }
}
