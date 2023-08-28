import Page from "../../classes/Page";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        banner: document.querySelector(".home__banner"),
      },
    });

    this.create();
  }

  create() {
    super.create();

    let mm = gsap.matchMedia()

    mm.add("(min-width: 1100px)", () => {
      const colors = ["#906030", "#911441",  "#767AB9", "#5C5EA7"]
      gsap.set(".step__line", {background:gsap.utils.wrap(colors)})
      
      const animation = gsap.fromTo('.step__line', { y: -70},{ y: 100, ease: "none", duration: 1, stagger: 0.6})
  
        ScrollTrigger.create({
          trigger: '.step__lines',
          start: "top 350",
          end: "bottom 100",
          animation: animation,
          scrub: 1,
        }) 
    })
  }
}
