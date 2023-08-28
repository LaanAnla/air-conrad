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
        wiper: document.querySelectorAll('.preloader__wiper'),
        number: ".preloader__number--text",
        images: document.querySelectorAll("img.preloaded"),
        body: document.querySelector('body'),
      }
    });
    this.length = 0;
    this.createLoader();
  }

  createLoader() {
    //this.elements.body.style.position = 'fixed' /* avoid scrolling during preloader */
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
      .to(this.elements.wiper, {
        yPercent:-100, 
        ease:"power1.inOut", 
        duration:0.8, 
         stagger:{
          each:0.15,
          from:"end",
          ease:"power1"
        }
      })
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
    ScrollTrigger.refresh(); /* refresh scrolltrigger after doinf position:fixed on preloader */
  }
}
