import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollIndex {
  constructor() {
    this.pixelTag = document.querySelector('.scroll__index__text');
    this.bodyTag = document.querySelector('body');
    this.pixelsScrolled = window.pageYOffset;
    this.progressTag = document.querySelector('.progress');

    this.handleScroll();
    this.updateSectionIndex();
  }

  handleScroll() {
    document.addEventListener('scroll', () => {
      this.pixelsScrolled = window.pageYOffset;

      if(this.pixelsScrolled <= 1) {
        this.pixelTag.innerHTML = this.pixelsScrolled + ' PIXEL';
      } else {
        this.pixelTag.innerHTML = this.pixelsScrolled + ' PIXELS';
      }

      const pageHeight = this.bodyTag.getBoundingClientRect().height;
      const totalScrollableHeight = pageHeight - window.innerHeight;
      const percentageScrolled = this.pixelsScrolled / totalScrollableHeight;

      this.progressTag.style.width = `${100 * percentageScrolled}%`;
    });
  }

  updateSectionIndex() {
    const sections = document.querySelectorAll('section');

    const clientTag = document.querySelector('.navigation__text p');

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top+=10",
        end: "bottom top",
        onEnter: () => {
          const sectionColor = section.getAttribute('data-color');

          gsap.to(clientTag, {
            innerHTML: section.getAttribute('data-client'),
            color: sectionColor
          });
        },
        onEnterBack: () => {
          const sectionColor = section.getAttribute('data-color');

          gsap.to(clientTag, {
            scrollTrigger: {
              trigger: section,
              start: "bottom center-=200",
              end: "top top",
            },
            innerHTML: section.getAttribute('data-client'),
            color: sectionColor,
          });
        }
      });
    });
  }
}
