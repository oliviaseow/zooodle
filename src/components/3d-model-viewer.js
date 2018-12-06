import React, { Component } from 'react'
import * as THREE from 'three'

class ModelViewer extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.camera.position.z = 4
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    this.cube = new THREE.Mesh(geometry, material)
    // this.scene.add(this.cube)

    //load url
    THREE.Cache.enabled = true
    this.load()

    this.start()
  }
  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  stop = () => {
    cancelAnimationFrame(this.frameId)
  }
  animate = () => {
    // this.model.rotation.x += 0.01
    // this.model.rotation.y += 0.01
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  load = () => {
    const renderToScene = this.addToRenderer
    const loader = new THREE.ObjectLoader()
    // loader.setResponseType('json')
    loader.load(
      'https://cdn.thingiverse.com/threejs_json/04/8e/20/de/95/0489bf0eHD2.js',
      function(data) {
        // const model = new THREE.Mesh(data, new THREE.MeshBasicMaterial())
        // console.log(model)
        renderToScene(data)
      },

      // onProgress callback
      function(xhr) {},

      // onError callback
      function(err) {
        console.error('An error happened')
      }
    )
  }

  addToRenderer = geom => {
    this.scene.add(geom)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }
  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={mount => {
          this.mount = mount
        }}
      />
    )
  }
}

export default ModelViewer
