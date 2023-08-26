import { BoxGeometry } from "three";
import { MeshNormalMaterial } from "three";
import { Mesh } from "three";
import Experience from "..";


export default class CanvasBanner {
  constructor() {

    this.experience = new Experience()
    this.renderer = this.experience.renderer
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera.instance
    this.time = this.experience.time

    this.createCube()
  }

  createCube() {
    this.geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
    this.material = new MeshNormalMaterial();

    this.mesh = new Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
  }

  update() {
    this.mesh.rotation.x = this.time.elapsed / 2000;
    this.mesh.rotation.y = this.time.elapsed / 1000;
  }
}