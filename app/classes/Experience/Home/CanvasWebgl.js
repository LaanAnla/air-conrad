import { PlaneGeometry } from "three/src/geometries/PlaneGeometry.js";
import Experience from "..";
import { Mesh } from "three/src/objects/Mesh.js";
import map from "lodash/map"
import each from "lodash/each"
import { Texture } from "three/src/textures/Texture.js";
import { ShaderMaterial } from "three";
import { Vector2 } from "three/src/math/Vector2.js";
import vertexPS5 from "../../../shaders/vertex-ps5.glsl"
import fragmentPS5 from "../../../shaders/fragment-ps5.glsl"
import ps5 from '../../../../shared/images/play-station.webp'
import { TextureLoader } from "three";
import { gsap } from "gsap"
import { Raycaster } from "three/src/core/Raycaster.js";
import { DoubleSide } from "three";

export default class CanvasWebgl {
  constructor() {

    this.experience = new Experience()

    this.renderer = this.experience.rendererPS5
    this.sizes = this.experience.sizes
    this.scene = this.experience.scenePS5
    this.camera = this.experience.camera.instancePS5
    this.time = this.experience.time

    this.raycaster = new Raycaster();
    this.pointer = new Vector2();

    this.image = document.querySelectorAll('.webgl-image')

    this.addImage()
    this.createMovement()

  }

  addImage() {

    this.material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 1 },
        uImage: { value: 0},
        uHover: { value: new Vector2(0.5, 0.5)},
        uHoverState: { value : 0 },
        uTexture: {  value: new TextureLoader().load(ps5)},
        uTexture2: {  value: new TextureLoader().load(ps5)},
      },
      side: DoubleSide,
      vertexShader: vertexPS5,
      fragmentShader: fragmentPS5
    })

    this.materials = []

    this.imagesStore = map(this.image, img => {
  
      let bounds = img.getBoundingClientRect()
      let geometry = new PlaneGeometry(1, 1, 100, 100)
      let CLONED_IMAGE = img.cloneNode(true); // this helped when img set image width in JS
      let texture = new Texture(CLONED_IMAGE);
      texture.needsUpdate = true

      let material = this.material.clone()

      material.uniforms.uTexture.value = texture

      this.materials.push(material)

      this.materials.forEach( m => {
        img.addEventListener('mouseenter', ()=> {
          gsap.to(m.uniforms.uHoverState, {
            value: 1
          })
        })
  
        img.addEventListener('mouseout', ()=> {
          gsap.to(m.uniforms.uHoverState, {
            value: 0,
            duration: 0.5
          })
        })

        img.addEventListener('touchstart', () => {
          this.tl = gsap.timeline()
          this.tl
          .to(m.uniforms.uHoverState, {
            value: 1,
            duration: 0.5
          })
          .to(m.uniforms.uHoverState, {
            value: 0,
            duration: 1
          })
        })
      })


      material.uniforms.uImage.value = texture

      let mesh = new Mesh(geometry, material)
      mesh.scale.set(bounds.width, bounds.height, 1)
      this.scene.add(mesh)
  
      return {
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height
      }
    })
  }

  createMovement() {
    this.mouseMoveHandler = (event) => {
      this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
  
      // update the picking ray with the camera and pointer position
      this.raycaster.setFromCamera(this.pointer, this.camera);
  
      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(this.scene.children);
  
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        obj.material.uniforms.uHover.value = intersects[0].uv;
      }
    };
  
    document.addEventListener('mousemove', this.mouseMoveHandler, false);
  }

  resize() {
    each(this.imagesStore, i => {
      
      let bounds = i.img.getBoundingClientRect()
      i.mesh.scale.set(bounds.width, bounds.height, 1)
      i.top = bounds.top
      i.left = bounds.left
      i.width = bounds.width
      i.height = bounds.height
    })
  }


  update() {
    this.materials.forEach( m => {
      m.uniforms.uTime.value = this.time.elapsed / 2000
    })
  }
}