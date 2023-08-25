import Experience from "./Experience"
import { WebGLRenderer, CineonToneMapping, PCFSoftShadowMap } from 'three'

export default class Renderer {
  constructor() {

    this.experience = new Experience()

    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.scenePS5 = this.experience.scenePS5
    this.camera = this.experience.camera
    
    this.webglMain = document.querySelector('canvas#webglMain')
    this.webglPS5 = document.querySelector('#webglPS5')

    this.setInstance()
    this.setInstancePS5()
  }

  setInstance() {

    this.instance = new WebGLRenderer({
      canvas: this.webglMain,
      powerPreference: 'high-performance',
      antialias: false,
      alpha: true,
      autoClear : true
    })
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.toneMapping = CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = PCFSoftShadowMap
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 0.8))
  }

  setInstancePS5() {

    this.instancePS5 = new WebGLRenderer({
      canvas: this.webglPS5,
      powerPreference: 'high-performance',
      antialias: false,
      alpha: true,
      autoClear : true
    })
    this.instancePS5.setSize(this.sizes.width, this.sizes.height);
    this.instancePS5.toneMapping = CineonToneMapping
    this.instancePS5.toneMappingExposure = 1.75
    this.instancePS5.shadowMap.enabled = true
    this.instancePS5.shadowMap.type = PCFSoftShadowMap
    this.instancePS5.setPixelRatio(Math.min(this.sizes.pixelRatio, 0.8))
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height )
    this.instance.setPixelRatio(this.sizes.pixelRatio)
    this.instancePS5.setSize(this.sizes.width, this.sizes.height )
    this.instancePS5.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
    this.instancePS5.render(this.scenePS5, this.camera.instancePS5)
  }
}