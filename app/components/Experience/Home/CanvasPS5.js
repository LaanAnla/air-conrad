import * as THREE from 'three'
import Experience from '../Experience'
import { Box3, Vector3, PointsMaterial,  AmbientLight, BufferGeometry, BufferAttribute, ColorManagement } from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader,  } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from "gsap"


export default class HomeCanvasPS5 {
  constructor() {

    this.experience = new Experience()
    this.renderer = this.experience.renderer.instancePS5
    this.sizes = this.experience.sizes
    this.scene = this.experience.scenePS5
    this.camera = this.experience.camera.instancePS5
    this.time = this.experience.time
    //this.body = document.querySelector('body')
      
    this.addObjects()
    //this.createMovement()
    //this.makeStars()
    //this.setControls()
    
  }

  createMovement(e) {
    window.addEventListener('mousemove', (e)=> {
      console.log(e)
      const x = e.clientX
      const y = e.clientY
  
      gsap.to(this.scene.rotation, {
        y: gsap.utils.mapRange(0, this.sizes.width, .2, -.2, x)
      })
    })
  }

  addObjects() {
    this.dracoLoader = new DRACOLoader()
    this.dracoLoader.setDecoderPath('/draco/')
    this.gltfLoader = new GLTFLoader()
    this.gltfLoader.setDRACOLoader(this.dracoLoader)
    this.gltfLoader.load(
      'scene.gltf', (gltf) => {
          const box = new Box3().setFromObject( gltf.scene );
          const center = box.getCenter( new Vector3() );
          this.gltfObject = gltf.scene.children
          gltf.scene.children[0].position.x += ( gltf.scene.children[0].position.x - center.x );
          gltf.scene.children[0].position.y += ( gltf.scene.children[0].position.y - center.y );
          gltf.scene.children[0].position.z += ( gltf.scene.children[0].position.z - center.z );
          this.scene.add(gltf.scene.children[0])
      },
      // window.addEventListener('mousemove', e => {

      //   const x = e.clientX
      //   const y = e.clientY
    
      //   gsap.to(this.gltfObject.rotation, {
      //     y: gsap.utils.mapRange(0, this.sizes.width, .5, -.5, x),
      //     x: gsap.utils.mapRange(0, this.sizes.height, .5, -.5, y)
      //   })
      // })
    )

    const ambientLight = new AmbientLight(0xffffff, 0.9)
    this.scene.add(ambientLight)  
  }

  makeStars() {
    ColorManagement.enabled = false
    const particlesGeometry = new BufferGeometry()
    const count = 500
    const position = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i=0; i < count * 3; i++) {
      position[i] = 3 * (Math.random() - 0.5)
      colors[i] = Math.random()
    }

    particlesGeometry.setAttribute(
      'position',
      new BufferAttribute(position, 3)
    )
    particlesGeometry.setAttribute(
      'color', 
      new BufferAttribute(colors, 3))

      const particlesMaterial = new PointsMaterial({
        size: 0.015,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
      })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    this.scene.add(particles)

  }

  setControls() {
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableDamping = false
    this.controls.enableZoom = false
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 0.7
    this.controls.dampingFactor = 0.05;
  }

  resize() {
    // if(this.body.classList === 'desktop') {
    //   this.camera.aspect = this.sizes.width / this.sizes.height
    //   this.renderer.setSize( this.sizes.width, this.sizes.height );
    //   this.renderer.render( this.scene, this.camera );
    //   this.camera.updateProjectionMatrix()
    // }
  }

  update() {
    //this.controls.update()
  }
}



// import Experience from "../Experience"
// import { BoxGeometry, MeshNormalMaterial, Mesh } from 'three';

// export default class CanvasPS5 {
//   constructor() {

//     this.experience = new Experience();
//     this.sizes = this.experience.sizes;
//     this.scene = this.experience.scenePS5;
//     this.camera = this.experience.camera.instancePS5;
//     this.renderer = this.experience.renderer.instancePS5
//     this.time = this.experience.time;

//     this.addObject()
//   }

//   addObject() {

//     this.geometry = new BoxGeometry( 2, 2, 2 );
//     this.material = new MeshNormalMaterial();

//     this.mesh = new Mesh( this.geometry, this.material );
//     this.scene.add( this.mesh );

//   }

//   resize() {
//     this.renderer.setSize(this.sizes.width, this.sizes.height)
//     this.camera.aspect = this.sizes.width / this.sizes.height
//   }

//   update() {
//     this.mesh.rotation.x = this.time.elapsed / 2000;
//     this.mesh.rotation.y = this.time.elapsed / 2000;
//   }
// }