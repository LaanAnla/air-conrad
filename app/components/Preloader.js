import Component from "../classes/Component";
import each from "lodash/each";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        logo: document.querySelectorAll(".preloader__brands, .preloader__number"),
        wiperUpTwo: ".preloader__up--two",
        wiperDownTwo: ".preloader__down--two",
        wiperUpOne: ".preloader__up--one",
        wiperDownOne: ".preloader__down--one",
        number: ".preloader__number--text",
        images: document.querySelectorAll("img.preloaded")
      }
    });
    this.length = 0;
    this.createLoader();
  }

  createLoader() {
      each(this.elements.images, element => {
        
        element.onload = _ => {
          this.onAssetLoaded(element);
        };
        element.src = element.getAttribute('data-src');
      });
  }

  onAssetLoaded(image) {
    this.length +=1;
    const percent = this.length / this.elements.images.length;
    this.elements.number.innerHTML = `${Math.round(percent * 100)}%`;

    if(percent === 1) {
      this.elements.number.innerHTML = ` RISE TO THE CHALLENGE `;
      setTimeout(()=>{
        this.onLoaded();
      }, 1000);
    }
  }

  onLoaded() {
    return new Promise( res => {
      this.tl = new gsap.timeline({ onComplete: ()=> {
        this.emit('completed');
      }});
      this.tl
      .to(this.elements.logo, {
        autoAlpha: 0,
        duration: 0.3,
      })
      .to(this.elements.wiperUpOne, {
        y: "200%",
        duration: 0.7
      }, ">")
      .to(this.elements.wiperDownOne, {
        y: "-200%",
        duration: 0.7
      }, "-=0.7")
      .to(this.elements.wiperUpTwo, {
        y: "200%",
        duration: 0.8,
      }, ">-0.5")
      .to(this.elements.wiperDownTwo, {
        y: "-200%",
        duration: 0.8
      }, "-=0.8");
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
    ScrollTrigger.refresh();
  }
}
