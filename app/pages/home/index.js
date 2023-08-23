import Page from "../../classes/Page";
import Pining from "../../animation/Pining";

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
    this.createPining()
  }

  create() {
    super.create();
   
  }

  createPining() {
    this.genesisPining = new Pining()
  }
}
