import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class NavigationLink {
  constructor() {
    this.link = document.querySelector('.navigation__link');

    this.animNavigationLink();
    this.animNavigation()
  }

  animNavigationLink() { // animation du lien official shop
    let mm = gsap.matchMedia();

    // add a media query. When it matches, the associated function will run
    mm.add("(min-width: 1280px)", () => {
      this.link.addEventListener('mouseleave', () => {
        this.link.classList.add('animate-out');
        setTimeout(() => {
          this.link.classList.remove('animate-out');
        }, 300);
      });
    });
  }

  animNavigation() { // animation de nav 
    this.navigationItems = document.querySelectorAll(".navigation__logo, .navigation__link__wrapper")
    ScrollTrigger.create({
      trigger: ".navigation__wrapper",
      start: "50px",
      end: "center 30px",
      onLeave: ()=>{
        gsap.to(this.navigationItems, {
          autoAlpha: 0,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: ()=>{
            gsap.to('.navigation__wrapper', {
              backgroundColor: 'transparent'
            })
          }
        })
      },
      onLeaveBack: ()=>{
        gsap.to(this.navigationItems, {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: ()=>{
            gsap.to('.navigation__wrapper', {
              backgroundColor: 'rgba(0, 0, 0, 0.121)',
            })
          }
        })
      }
    });
  }
}
