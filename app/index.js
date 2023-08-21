import Home from "./pages/home";
import Preloader from "./components/Preloader";
import Cursor from "./utils/Cursor";
import NavigationLink from "./utils/NavigationLink";
import ScrollIndex from "./utils/ScrollIndex";
import GridAnimation from "./utils/GridAnimation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

class App {
  constructor() {

    this.scrollSmoother = ScrollSmoother.create({
      smooth: 2,               // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true,           // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, 
      preventDefault: true,
      normalizeScroll: true, 
      ignoreMobileResize: true,
      });
      this.createPreloader();
      this.createContent();
      this.createPages();
    
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createGrid() {
    this.gridAnimation = new GridAnimation()
  }

  createCursor() {
    this.cursor = new Cursor();
  }

  createPixels() {
    this.scrollIndex = new ScrollIndex();
  }

  createNavigationLink() {
    this.navigationLink = new NavigationLink()
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
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
  }

  onPreloaded() {
    this.preloader.destroy()
  }
}

new App();