import each from 'lodash/each';
import map from 'lodash/map';
import { gsap } from "gsap";
import Title from '../animation/Titles';
import Paragraph from '../animation/Paragraph';
import Photos from '../animation/Photos';
import PhotoZoom from '../animation/PhotoZoom';

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = { 
      ...elements, 
      animationsBanner: '[data-animation="banner"]',
      animationsTitles: '[data-animation="title"]',
      animationsParagraph: '[data-animation="paragraph"]',
      animationsPhotos: '[data-animation="photos"]',
      animationsPhotoZoom: '[data-animation="photoZoom"]',
    };
    this.id = id;
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);
        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });
    //this.createAnimations()
  }

  createAnimations() {
    this.animations = [];

    this.animationsTitles = map(this.elements.animationsTitles, element => {
      return new Title({
        element
      })
    })
    this.animations.push(...this.animationsTitles);

    this.animationsParagraph = map(this.elements.animationsParagraph, element => {

      return new Paragraph({
        element
      })
    })
    this.animations.push(...this.animationsParagraph);

    this.animationsPhotos = map(this.elements.animationsPhotos, element => {

      return new Photos({
        element
      })
    })
    this.animations.push(...this.animationsPhotos);

    let elementsArray = Array.isArray(this.elements.animationsPhotoZoom) 
                      ? this.elements.animationsPhotoZoom 
                      : [this.elements.animationsPhotoZoom];

    this.animationsPhotoZoom = elementsArray.map(element => {
        return new PhotoZoom({
            element
        });
    });
    this.animations.push(...this.animationsPhotoZoom);
  }

  show() {
    gsap.from(this.element, {
      autoAlpha: 0,
    });
  }

  hide() {
    gsap.to(this.element, {
      autoAlpha: 0,
    });
  }
}