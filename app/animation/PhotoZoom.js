import Animation from "../classes/Animation"
import { gsap } from "gsap"

export default class PhotoZoom extends Animation {
  constructor({element, elements}) {
    super({
      element,
      elements
    })
  }

  animateIn() {
    gsap.fromTo(this.element, {
      scale: 2
    },{
      scale: 1,
      duration: 0.7
    })
  }

  animateOut() {
    gsap.set(this.element, {
      scale: 1
    })
  }
}