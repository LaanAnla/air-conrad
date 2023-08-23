import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export default class Pining {
  constructor() {

    this.createPining()
  }

  createPining() {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {

      // this setup code only runs when viewport is at least 900px wide
      const photos = gsap.utils.toArray(".home__genesis__gallery--desktop--photo:not(:first-child)")

      gsap.set(photos, { yPercent: 100 })
  
      const animation = gsap.to(photos, { yPercent: 0, stagger: 0.5})
  
      ScrollTrigger.create({
        trigger: ".home__genesis__gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".home__genesis__gallery--right",
        animation: animation,
        scrub: true
      })
    });
  }
}
