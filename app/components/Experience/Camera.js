//import * as THREE from 'three'
import Experience from "./Experience";
import { PerspectiveCamera, OrthographicCamera } from 'three';
import { gsap } from "gsap"


export default class Camera {
  constructor() {

    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.scenePS5 = this.experience.scenePS5
 
    this.createCamera()
    this.createCameraPS5()
  }

  createCamera() {
    // this.instance = new PerspectiveCamera( 70, this.sizes.width / this.sizes.height, 0.01, 100 );
    // this.instance.position.z = 3;
    // this.scene.add(this.instance)
    let frustumSize = 1;
    this.instance = new OrthographicCamera(frustumSize / -2, frustumSize / 2, frustumSize / 2, frustumSize / -2, -1000, 1000);
    this.instance.position.set(0, 0, 2);

    this.scene.add(this.instance)
  }

  createCameraPS5() {
    // this.instancePS5 = new PerspectiveCamera( 70, this.sizes.width / this.sizes.height, 0.01, 100 );
    // this.instancePS5.position.z = 3;
    // this.scenePS5.add(this.instancePS5)
    let mm = gsap.matchMedia()

    this.instancePS5 = new PerspectiveCamera( 35, this.sizes.with / this.sizes.height, 0.01, 100 );
    this.instancePS5.position.z = 3
    this.scenePS5.add(this.instancePS5)
    this.instancePS5.updateProjectionMatrix()

    mm.add("(min-width: 1100px)", () => {
      this.instancePS5 = new PerspectiveCamera( 15, this.sizes.width / this.sizes.height, 0.01, 100 );
      this.instancePS5.position.z = 3
      this.scenePS5.add(this.instancePS5)
      this.instancePS5.updateProjectionMatrix()
    })
    mm.revert()
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
    this.instancePS5.aspect = this.sizes.width / this.sizes.height
    this.instancePS5.updateProjectionMatrix()
  }
}