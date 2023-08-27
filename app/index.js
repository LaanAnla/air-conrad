import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Cursor from "./utils/Cursor";
import GridAnimation from "./utils/GridAnimation";
import Home from "./pages/home";
import NavigationLink from "./utils/NavigationLink";
import Preloader from "./components/Preloader";
import Split from "./animation/Banner";
import ScrollIndex from "./utils/ScrollIndex";
import Experience from "./classes/Experience";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

class App {
  constructor() {

    this.scrollSmoother = ScrollSmoother.create({
      effects: true,           // looks for data-speed and data-lag attributes on elements
      // ignoreMobileResize: true,
      normalizeScroll: true, 
      // preventDefault: true,
      smooth: 2,               // how long (in seconds) it takes to "catch up" to the native scroll position
      smoothTouch: 0.1,
      });
      this.createContent();
      this.createPreloader();
      this.createCanvas();
      this.createPages();
    
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createCanvas() {
    this.experience = new Experience({
      canvas: this.canvas,
      template: this.template
    })
  }
  
  createPages() {
    this.pages = {
      home: new Home()
    };

    this.page = this.pages[this.template];
    this.page.create();
    this.page.show();
    this.createCursor();
    this.createNavigationLink();
    this.createPixels();
    this.createGrid();
    this.createJump();
  }

  createCursor() {
    this.cursor = new Cursor();
  }

  createGrid() {
    this.gridAnimation = new GridAnimation()
  }

  createJump() {
    document.querySelector("a#win-console").addEventListener("click", () => {
      this.scrollSmoother.scrollTo(
          "#console", 
          true, 
          "center center-=50px");
      });
  }

  createNavigationLink() {
    this.navigationLink = new NavigationLink()
  }

  createPixels() {
    this.scrollIndex = new ScrollIndex();
  }

  createSplitTitle() {
    this.splitTitle = new Split(
      ".home__banner__title", 
      ".home__banner__wrapper", 
      ".home__banner__scroll--down",
      ".cursor"
    )
  }

  onPreloaded() {
    this.preloader.destroy()
    this.createSplitTitle()
  }
}

new App();