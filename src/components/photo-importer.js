import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const PhotoInput = styled.input.attrs({
  type: 'file',
  accept: 'image/*',
})`
  display: none;
`

const InputLabel = styled.label`
  width: auto;
  padding: 8px;
  color: white;
  background: blue;
  cursor: pointer;
`

const ImagePreview = styled.img`
  max-width: 200px;
  height: auto;
`

const AddPhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed blue;
  border-radius: 4px;
  width: 200px;
  height: 200px;
`

const UploadPhotoButton = styled.button`
  background: blue;
  border-radius: 4px;
  border: none;
  color: white;
  padding: 8px;
  margin-top: 8px;
  cursor: pointer;
`

const CancelButton = styled.button`
  background: white;
  border-radius: 4px;
  border: 2px solid blue;
  color: blue;
  padding: 8px;
  margin-top: 8px;
  cursor: pointer;
`

export default class PhotoImporter extends Component {
  state = {
    path: '',
    image: null,
  }

  static defaultProps = {
    onUpload: () => {},
  }

  handleChange = event => {
    this.setState({
      path: URL.createObjectURL(event.target.files[0]),
      image: event.target.files[0],
    })
  }

  handleClear = () => {
    this.setState({ path: '' }, () => {
      this.props.clearAll()
    })
  }

  handleUpload = image => {
    this.props.onUpload(image)
  }

  render() {
    const { path, image } = this.state
    return (
      <Container>
        {path ? (
          <Fragment>
            <ImagePreview src={path} />
            <UploadPhotoButton onMouseDown={() => this.handleUpload(image)}>
              Upload
            </UploadPhotoButton>
            <CancelButton onMouseDown={this.handleClear}>Cancel</CancelButton>
          </Fragment>
        ) : (
          <AddPhotoContainer>
            <InputLabel for="photo-upload">Photo</InputLabel>
            <PhotoInput onChange={this.handleChange} id="photo-upload" />
          </AddPhotoContainer>
        )}
      </Container>
    )
  }
}
