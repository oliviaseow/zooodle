import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PhotoImporter from './components/photo-importer'
import axios from 'axios'
//import cloudVisionCredentials from './cloud-vision.json'
import ModelViewer from './components/3d-model-viewer'
import ThingiverseCard from './components/thingiverse-card'

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

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: lightgray;
`

const CardCollection = styled.div`
  display: flex;
  flex-direction: column;
`

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 48px;
`

const Keyword = styled.h2`
  margin: 16px 0;
`

export default class App extends Component {
  state = {
    searchResults: [],
    keyword: '',
  }

  onUpload = image => {
    this.readImage(image)
  }

  readImage = imageFile => {
    let reader = new FileReader()
    reader.readAsDataURL(imageFile)

    reader.onload = () => {
      let response = reader.result.split(',')[1]
      console.log({ response })
      axios
        .post(
          `https://vision.googleapis.com/v1/images:annotate?key=${
            process.env.REACT_APP_GOOGLE_API_KEY
          }`,
          requestTemplate(response)
        )
        .then(res =>
          this.setState(
            {
              keyword: res.data.responses[0].labelAnnotations[0].description,
            },
            () => {
              this.handleRequest()
            }
          )
        )
        .catch(err => console.log(err))
    }
  }

  handleRequest = () => {
    axios
      .get(
        `https://api.thingiverse.com/search/${
          this.state.keyword
        }?access_token=${process.env.REACT_APP_THINGIVERSE_API_KEY}`
      )
      .then(response => this.setState({ searchResults: response.data }))
      .catch(error => console.log(error))
    // axios
    //   .get(
    //     `https://api.thingiverse.com/files/22655?access_token=${
    //       process.env.REACT_APP_THINGIVERSE_API_KEY
    //     }`
    //   )
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error))
  }

  componentDidMount() {}

  render() {
    const { searchResults, keyword } = this.state
    return (
      <Container>
        <PhotoContainer>
          <PhotoImporter onUpload={this.onUpload} />
          {keyword && <Keyword>{`Zooodle recognizes your ${keyword}`}</Keyword>}
        </PhotoContainer>
        {searchResults && (
          <CardCollection>
            {searchResults
              .slice(0, 3)
              .map(({ name, thumbnail, public_url }) => (
                <ThingiverseCard
                  key={name}
                  name={name}
                  url={thumbnail}
                  link={public_url}
                />
              ))}
          </CardCollection>
        )}
      </Container>
    )
  }
}
