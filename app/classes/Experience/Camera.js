import Experience from "."
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js"
import { OrthographicCamera } from "three/src/cameras/OrthographicCamera.js"

export default class Camera {
  constructor() {

    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene

    this.createCameraBanner()
    this.createCameraPS5()
  }

  createCameraBanner() {
      let frustumSize = 1;
      this.instance = new OrthographicCamera(
        frustumSize / -2, 
        frustumSize / 2, 
        frustumSize / 2, 
        frustumSize / -2, 
        -1000, 
        1000
      );
      this.instance.position.set(0, 0, 2);
  
      this.scene.add(this.instance)
  }

  createCameraPS5() {
    // this.instancePS5 = new PerspectiveCamera( 35, this.sizes.width / this.sizes.height, 0.01, 100 );
    // this.instancePS5.position.z = 1
    // this.scene.add(this.instancePS5)

    this.instancePS5 = new PerspectiveCamera( 70, this.sizes.width / this.sizes.height, 100, 2000 );
    this.instancePS5.position.z = 600
    this.instancePS5.fov = 2 * Math.atan((this.sizes.height / 2) / 600) * (180 / Math.PI)
    this.instancePS5.updateProjectionMatrix()
    this.scene.add(this.instancePS5)
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
    this.instancePS5.aspect = this.sizes.width / this.sizes.height
    this.instancePS5.updateProjectionMatrix()
  }

  update() {

  }
}