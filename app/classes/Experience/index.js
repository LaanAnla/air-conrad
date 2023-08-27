import Camera from "./Camera"
import CanvasBanner from "./Home/CanvasBanner"
import CanvasPS5 from "./Home/CanvasPS5"
import CanvasWebgl from "./Home/CanvasWebgl"
import Renderer from "./Renderer"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import { Scene } from "three"
import Stats from 'stats.js'


let instance = null

export default class Experience {
  constructor(canvas, template) {
    if(instance) {
      return instance
    }
    instance = this

    window.experience = this
    this.body = document.querySelector('body')

    this.canvas = canvas
    this.template = template

    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new Scene()
    this.scenePS5 = new Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
      this.update()
    })
    this.createWebgl()
    this.createStats()
  }

  createStats() {
    this.stats = new Stats()
    this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom)
  }

  createWebgl() {
    this.canvasBanner = new CanvasBanner()
    if(this.body.classList.contains("desktop")) {
      this.canvasWebgl = new CanvasWebgl()
    }
  }

  resize() {
    if(this.body.classList.contains("desktop")) {
      this.canvasWebgl.resize()
    }
    this.renderer.resize()
    this.camera.resize()
  }

  update() {
    this.stats.begin()
    this.canvasBanner.update()
    if(this.body.classList.contains("desktop")) {
      this.canvasWebgl.update()
    }
    this.camera.update()
    this.renderer.update()
    this.stats.end()
  }

}