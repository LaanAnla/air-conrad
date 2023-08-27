import Experience from ".";
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer.js"

export default class Renderer {
  constructor() {

    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.scenePS5 = this.experience.scenePS5
    this.camera = this.experience.camera
    this.webglBanner = document.getElementById("webglBanner")
    this.webglPS5 = document.getElementById("webglPS5")

    this.createRenderer()
    this.createRendererPS5()

  }

  createRenderer() {
    this.instance = new WebGLRenderer({
      canvas: this.webglBanner,
      antialias: true
    });
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  createRendererPS5() {
    this.instancePS5 = new WebGLRenderer({
      canvas: this.webglPS5,
      antialias: true,
      alpha: true,
    });
    this.instancePS5.setSize(this.sizes.width, this.sizes.height)
    this.instancePS5.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
    this.instancePS5.setSize(this.sizes.width, this.sizes.height)
    this.instancePS5.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
    this.instancePS5.render(this.scenePS5, this.camera.instancePS5)
  }
}