import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(SplitText, ScrollTrigger);

export default class Split {
  constructor(text, item, logo, cursor) {
    this.text = text;
    this.item = item;
    this.logo = logo;
    this.cursor = cursor;
    this.createSplit()
  }

  createSplit() {
    const body = document.querySelector('body')
    body.style.position = 'fixed'

    const split = new SplitText(this.text, {charsClass:'chars', linesClass: 'lines'}) 
    const splitElement = document.querySelector(this.item)

    const tl = gsap.timeline()
    gsap.set(this.item, {autoAlpha: 1})
    split.lines.forEach( (line, index)=> {
      tl.from(line.querySelectorAll(".chars"), {
        yPercent: 100, 
        stagger: 0.05,
        duration: 0.4,
        onComplete: ()=>{
          const tl1 = gsap.timeline()
          tl.to(this.logo, {
            autoAlpha: 1,
            duration: 0.7,
          })
          tl.to(this.cursor, {
            autoAlpha: 1
          }, 0)
          body.style.position = "relative",
          ScrollTrigger.refresh()
        }
      }, ">-80%")
    })
  }
}
