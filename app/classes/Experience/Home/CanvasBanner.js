//import { BoxGeometry } from "three";
//import { MeshNormalMaterial } from "three";
import Experience from "..";
import conrad from '../../../../shared/images/air-conrad-banner.webp'
import vertex from '../../../shaders/vertex.glsl'
import fragment from '../../../shaders/fragment.glsl'
import { gsap } from "gsap"
import { DataTexture, NearestFilter, RGBAFormat, ShaderMaterial, FloatType, Vector4, TextureLoader, DoubleSide, PlaneGeometry, Mesh, Color } from "three";




export default class CanvasBanner {
  constructor() {

    this.experience = new Experience()
    this.renderer = this.experience.renderer
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera.instance
    this.time = this.experience.time

    this.mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vX: 0,
      vY: 0
    }


    //this.createCube()
    this.createBanner()
    this.mouseEvents()
    this.resize()
  }

  createCube() {
    this.geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
    this.material = new MeshNormalMaterial();

    this.mesh = new Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
  }

  mouseEvents() {
    window.addEventListener('mousemove', (e)=>{
      this.mouse.x = e.clientX / this.sizes.width;
      this.mouse.y = e.clientY / this.sizes.height;

      this.mouse.vX = this.mouse.x - this.mouse.prevX;
      this.mouse.vY = this.mouse.y - this.mouse.prevY;


      this.mouse.prevX = this.mouse.x
      this.mouse.prevY = this.mouse.y;

    })
  }

  createBanner() {
    this.size = 10

    let mm = gsap.matchMedia()
    mm.add("(min-width: 1100px)", () => {
      this.size = 20
    })

    const width = this.size
    const height = this.size

    const size = width * height
    const data = new Float32Array(4 * size)
    const color = new Color( 0xffffff)

    const r = Math.floor( color.r * 255)
    const g = Math.floor( color.g * 255)
    const b = Math.floor( color.b * 255)
    const a = 1

    for (let i = 0; i<size; i++) {
      let r = Math.random()*255

      const stride = i * 4;
      data[stride] = r
      data[stride + 1] = r
      data[stride + 2] = r
      data[ stride + 3 ] = 255;
    }

    this.texture = new DataTexture(data, width, height, RGBAFormat, FloatType);
    this.texture.magFilter = this.texture.minFilter = NearestFilter;
    this.texture.needsUpdate = true

    this.material = new ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: DoubleSide,
      uniforms: {
        time: {value: 0},
        resolution: {value: new Vector4()},
        uTexture: {value: new TextureLoader().load(conrad)},
        uDataTexture: {value: this.texture}
      },
      vertexShader: vertex,
      fragmentShader: fragment
    });

    this.geometry = new PlaneGeometry(1, 1, 1, 1);
    this.mesh = new Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  updateDataTexture() {
    let data = this.texture.image.data
    for(let i = 0; i < data.length; i+= 4) {
      data[i] *= 0.99
      data[i+1] *= 0.99
    }

    let gridMouseX = this.size*this.mouse.x
    let gridMouseY = this.size*(1 - this.mouse.y)
    let maxDist = 4
    
    for(let i = 0; i<this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        let distance = (gridMouseX - i)**2 + (gridMouseY - j)**2
        
        if(distance < maxDist**2) {
          let index = 4*(i + this.size*j)

          let power = maxDist / Math.sqrt(distance)

          data[index] += 3 * this.mouse.vX * power
          data[index+1] -= 3 * this.mouse.vY * power
        }
      }
    }
    this.mouse.vX *=0.9
    this.mouse.vY *= 0.9

    this.texture.needsUpdate = true
  }

  resize() {
    this.renderer.instance.setSize(this.sizes.width, this.sizes.height)
    this.camera.aspect = this.sizes.width / this.sizes.height

    this.imageAspect = 1. / 1.77;
    let a1
    let a2

    if(this.sizes.height/this.sizes.width > this.imageAspect) {
      a1 = (this.sizes.width/this.sizes.height) * this.imageAspect
      a2 = 1
    } else {
      a1 = 1
      a2 = (this.sizes.height/this.sizes.width) / this.imageAspect
    }

    this.material.uniforms.resolution.value.x = this.sizes.width
    this.material.uniforms.resolution.value.y = this.sizes.height
    this.material.uniforms.resolution.value.z = a1
    this.material.uniforms.resolution.value.w = a2 
  }



  update() {
    // this.mesh.rotation.x = this.time.elapsed / 2000;
    // this.mesh.rotation.y = this.time.elapsed / 1000;
    this.updateDataTexture()
  }
}