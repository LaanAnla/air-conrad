import { BoxGeometry } from "three/src/geometries/BoxGeometry.js";
import { MeshNormalMaterial } from "three/src/materials/MeshNormalMaterial.js";
import { Mesh } from "three/src/objects/Mesh.js"
import Experience from "..";


export default class CanvasPS5 {
  constructor() {

    this.experience = new Experience()
    this.renderer = this.experience.rendererPS5
    this.sizes = this.experience.sizes
    this.scene = this.experience.scenePS5
    this.camera = this.experience.camera.instancePS5
    this.time = this.experience.time

    this.createCube()
  }

  createCube() {

    this.geometry = new BoxGeometry( 0.5, 0.5, 0.5 );
    this.material = new MeshNormalMaterial();

    this.mesh = new Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
  }

  update() {
    this.mesh.rotation.x = this.time.elapsed / 2000;
    this.mesh.rotation.y = this.time.elapsed / 1000;
  }
}