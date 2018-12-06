import React, { Component } from 'react'
import * as THREE from 'three'

THREE.ImageUtils.crossOrigin = 'use-credentials';

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

    //this.cube = new THREE.Mesh(geometry, material)
    //this.scene.add(this.cube)


    //load url

    var loader = new THREE.ObjectLoader();

    loader.crossOrigin = 'use-credentials';

    loader.load(
      // resource URL
      "http://thingiverse-production.s3.amazonaws.com/threejs_json/70/42/c4/f6/d6/c96461c9bearing_20130404-23308-1fcl0el-0.js",

      // onLoad callback
      // Here the loaded data is assumed to be an object
      function ( obj ) {
        this.scene.add( obj );
      },
      /*let mesh = 0;

      object.traverse((node) => {
        if (node.isMesh) mesh = node;
      });

      mesh.material.morphTargets = true;

      this.scene.add( mesh );
      },*/

      // onProgress callback
      function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },

      // onError callback
      function ( err ) {
        console.error( 'An error happened' );
      }
    );

/*   let loader = new THREE.JSONLoader();
    let loadCallback = function ( geometry, materials ) {
          var obj, i;
          for ( i = this.scene.children.length - 1; i >= 0 ; i -- ) {
              obj = this.scene.children[ i ];
              if ( obj !== this.camera) {
                  this.scene.remove(obj);
              }
          }
          var mesh = new THREE.Mesh( geometry, material );
          this.scene.add( mesh );
        };

    var url = "http://thingiverse-production.s3.amazonaws.com/threejs_json/70/42/c4/f6/d6/c96461c9bearing_20130404-23308-1fcl0el-0.js";
    
    loader.load(url, loadCallback);*/

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
    //this.cube.rotation.x += 0.01
    //this.cube.rotation.y += 0.01
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

/*  load = () => {
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
  }*/

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
