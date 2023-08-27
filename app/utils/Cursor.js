    // special thanks to Blake Bowen & Zack Saucier for most of the code.
import { gsap } from 'gsap';

export default class Cursor {
  constructor() {
    this.initCursorMovement();
  }

  initCursorMovement() {
    gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

    const cursorElement = document.querySelector(".cursor");
    const allLinks = document.querySelectorAll('a, iframe');
    
    let position = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2,
    };
    
    let mousePosition = { 
      x: position.x, 
      y: position.y 
    };
  
    let speedSettings = {
      speed1: 0.1,
      speed2: 0.15 
    };
    
    const framesPerMillisecond = 60 / 1000;
    
    let setXPosition = gsap.quickSetter(cursorElement, "x", "px");
    let setYPosition = gsap.quickSetter(cursorElement, "y", "px");
    
    window.addEventListener("mousemove", event => {    
      mousePosition.x = event.x;
      mousePosition.y = event.y;  
    });
    
    gsap.ticker.add((time, deltaTime) => {
      let delta = deltaTime * framesPerMillisecond;
      let dampingTime = 1.0 - Math.pow(1.0 - speedSettings.speed1, delta); 
      
      position.x += (mousePosition.x - position.x) * dampingTime;
      position.y += (mousePosition.y - position.y) * dampingTime;
      
      setXPosition(position.x);
      setYPosition(position.y);
    });
  
    allLinks.forEach(link => {
      link.addEventListener("mouseover", () => {
        gsap.to(cursorElement, {
          scale: 1.5,
          autoAlpha: 0,
          duration: 0.5,
          cursor: 'grab'
        });
      });
  
      link.addEventListener("mouseout", () => {
        gsap.to(cursorElement, {
          scale: 1,
          autoAlpha: 1
        });
      });
    });
  }
}