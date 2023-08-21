import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default class GridAnimation {
  constructor() {

    this.gridAnimation()
  }

  gridAnimation() {
    let gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".grid-section",
        scrub: 1,
        start: "top center",
        end: "center+=20% bottom",
      },
      defaults: {
        ease: "power4.inOut"
      }
    });
    
    gridTl.add("start")
      .from(".grid-layout", {
        ease: "power1",
        scale: 3
      }, "start")
      .from(".column-1 .grid-image", {
        duration: 1,
        autoAlpha: 0,
        xPercent: i => -((i + 1) * 40 + i * 100),
        yPercent: i => (i + 1) * 40 + i * 100,
      }, "start")
      .from(".column-3 .grid-image", {
        duration: 1,
        autoAlpha: 0,
        xPercent: i => (i + 1) * 40 + i * 100,
        yPercent: i => (i + 1) * 40 + i * 100
      }, "start");
  }
}

