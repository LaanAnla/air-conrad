import Experience from "."
//import { PerspectiveCamera } from "three"
import { OrthographicCamera } from "three"

export default class Camera {
  constructor() {

    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    //this.createCamera()
    this.createCameraBanner()
  }

  createCamera() {
    this.instance = new PerspectiveCamera( 70, this.sizes.width / this.sizes.height, 0.01, 10 );
    this.instance.position.z = 1;
    this.scene.add(this.instance)
  }

  createCameraBanner() {
      let frustumSize = 1;
      this.instance = new OrthographicCamera(frustumSize / -2, frustumSize / 2, frustumSize / 2, frustumSize / -2, -1000, 1000);
      this.instance.position.set(0, 0, 2);
  
      this.scene.add(this.instance)
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {

  }
}