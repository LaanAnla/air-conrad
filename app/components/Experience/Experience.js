import { Scene } from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import CanvasBanner from './Home/CanvasBanner';
import CanvasPS5 from "./Home/CanvasPS5";

let instance = null;

export default class Experience {
  constructor(canvas, template) {

    if(instance) {
      return instance
    }
    instance = this

    window.experience = this
    
    this.canvas = canvas
    this.template = template
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new Scene()
    this.scenePS5 = new Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    
    this.sizes.on('resize', ()=> {
      this.resize()
    })
    
    this.time.on('tick', ()=> {
      this.update()
    })
    this.createCanvas()
  }

  createCanvas() {
    this.canvasBanner = new CanvasBanner();
    this.canvasPS5 = new CanvasPS5()
  }

  resize() {
    this.canvasBanner.resize()
    this.canvasPS5.resize()
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.canvasBanner.update()
    this.canvasPS5.update()
    this.renderer.update()
  }
}