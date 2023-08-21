import Component from "./Component"

export default class Animation extends Component {
  constructor({element, elements}) {
    super({
      element,
      elements
    })
    
    this.createObserver()
    this.animateOut()

  }

  createObserver() {
    this.observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          console.log('animation In')
          this.animateIn()
        } else {
          console.log('animation Out')
          this.animateOut()
        }

      })
    })
    this.observer.observe(this.element)
  }

  animateIn() {

  }

  animateOut() {

  }
}