import Page from "../../classes/Page";

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        banner: document.querySelector('.home__banner'),
      },
    });

    this.create();
  }

  create() {
    super.create();

    // Empêche le défilement de la banner pendant 500ms
    const preventScroll = (e) => {
      e.preventDefault();
      setTimeout(() => {
        this.elements.banner.removeEventListener('wheel', preventScroll);
      }, 500); // Le scroll est bloqué pendant 0,5 seconde

      return false;
    };
    this.elements.banner.addEventListener('wheel', preventScroll, { passive: false });

  }
}
