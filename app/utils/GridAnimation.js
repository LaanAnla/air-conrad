import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default class GridAnimation {
  constructor() {

    this.gridAnimation()
  }

  gridAnimation() {

    let mm = gsap.matchMedia()
    let mm2 = gsap.matchMedia()

    mm.add("(min-width: 1100px)", () => {

      let gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".grid-section",
          scrub: 1,
          start: "top center+=20%",
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
        duration: 1.2,
        autoAlpha: 0,
        xPercent: i => -((i + 1) * 40 + i * 100),
        yPercent: i => (i + 1) * 40 + i * 100,
      }, "start")
      .from(".column-3 .grid-image", {
        duration: 1.2,
        autoAlpha: 0,
        xPercent: i => (i + 1) * 40 + i * 100,
        yPercent: i => (i + 1) * 40 + i * 100
      }, "start");
    })

    mm2.add("(max-width: 1099px)", ()=> {
      let gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".grid-section",
          scrub: 1,
          start: "top center",
          end: "bottom+=500 bottom",
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
    })
  }
}

