import Animation from "../classes/Animation"
import { gsap } from "gsap"

export default class Paragraph extends Animation {
  constructor({element, elements}) {
    super({
      element,
      elements
    })
  }

  animateIn() {
    gsap.fromTo(this.element, {
      autoAlpha: 0,
      y: 40
    },{
      autoAlpha: 1,
      duration: 0.9,
      y: 0
    })
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0
    })
  }
}