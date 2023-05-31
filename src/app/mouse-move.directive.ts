import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMouseMove]'
})
export class MouseMoveDirective {
  constructor(private el:ElementRef){}

  //@HostListener('document:mousemove', ['$event'])onmouse(){}

  /* @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const cardsContainer = document?.querySelector('#divRight');
    const cards: HTMLElement = cardsContainer as HTMLElement;
    let { pageX: x, pageY: y } = e,
    { offsetWidth: width, offsetHeight: height } = cards, //400x600
    xMove =  (x / width) * 10 ,
    yMove =  (y / height) * 10 ;
    cards.style.transform = `translate(${xMove}px, ${yMove}px)`;
  } */

  /* @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: MouseEvent){
    const cardsContainer = document?.querySelector('#divRight');
    const cards: HTMLElement = cardsContainer as HTMLElement;
    cards.removeAttribute('style')
    cards.style.transition = 'transform .4s ease'
  } */
}
