import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default class HorizontallScroll {
  constructor() {

    this.horizontalScroll()
  }

  horizontalScroll() {

    //Horizontal Scroll Galleries
if (document.getElementById("portfolio")) {
  const horizontalSections = gsap.utils.toArray('.horiz-gallery-wrapper')

  horizontalSections.forEach(function (sec, i) {

    const pinWrap = sec.querySelector(".horiz-gallery-strip");

    let pinWrapWidth;
    let horizontalScrollLength;
    
    function refresh() {
      pinWrapWidth = pinWrap.scrollWidth;
      horizontalScrollLength = pinWrapWidth - window.innerWidth;
    }

    // window.addEventListener("load", function () {
      refresh();
      // Pinning and horizontal scrolling
      let scrollTween = gsap.to(pinWrap, {
        scrollTrigger: {
          scrub: true,
          trigger: sec,
          pin: sec,
          start: "center center",
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true
        },
        x: () => -horizontalScrollLength,
        ease: "none"
      });
    
    pinWrap.querySelectorAll("[data-speed-x]").forEach((el, i) => {
      let speed = parseFloat(el.getAttribute("data-speed-x"));
      gsap.to(el, {
        x: () => (1 - speed) * (window.innerWidth + el.offsetWidth),
        ease: "none",
        scrollTrigger: {
          containerAnimation: scrollTween,
          trigger: el,
          onRefresh: self => {
            let start = Math.max(0, self.start);
            self.setPositions(start, start + (self.end - self.start) / Math.abs(speed)); // adjust for how long it'll stay in view
            self.animation.progress(0);
          },
          scrub: true
        }
      });
    });
    

      ScrollTrigger.addEventListener("refreshInit", refresh);
    // });
  });
}
  }
}


