import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import PhotoImporter from './components/photo-importer'
import axios from 'axios'
import ThingiverseCard from './components/thingiverse-card'
import Header from './components/header'
import AnimalCard from './components/animal-card'
import firebase from './firebase'

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
  position: absolute;
  top: 80px;
  flex-direction: column;
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

const Info = styled.h4`
  margin: 8px 0;
`

export default class App extends Component {
  state = {
    searchResults: [],
    keyword: '',
    animals: [],
  }

  onUpload = image => {
    this.readImage(image)
  }

  clearAll = () => {
    this.setState({
      searchResults: [],
      keyword: '',
    })
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
        }?access_token=${process.env.REACT_APP_THINGIVERSE_API_KEY}`,
        { crossdomain: true }
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

  getAnimalFromKeyword = () => {
    const { animals, keyword } = this.state
    if (animals.length > 1) {
      return animals.find(({ animal }) => animal === keyword)
    }
    return null
  }

  componentDidMount() {
    this.firebaseRef = firebase.database().ref('/')
    this.firebaseCallback = this.firebaseRef.on('value', snap => {
      this.setState({ animals: snap.val() })
    })
  }

  componentWillUnmount() {
    this.firebaseRef.off('value', this.firebaseCallback)
  }

  render() {
    const { searchResults, keyword } = this.state
    const animal = this.getAnimalFromKeyword()
    return (
      <Fragment>
        <Header />
        <Container>
          <PhotoContainer>
            <PhotoImporter onUpload={this.onUpload} clearAll={this.clearAll} />
            {keyword && (
              <Keyword>{`Zooodle recognizes your ${keyword}`}</Keyword>
            )}
            {animal && <AnimalCard {...animal} />}
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
      </Fragment>
    )
  }
}
