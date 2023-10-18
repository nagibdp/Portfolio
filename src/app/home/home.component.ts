import { Component, HostListener, Inject, OnInit } from '@angular/core';
//import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { GeturlService } from '../services/geturl.service';
//@Inject(DOCUMENT) private document: Document

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    previousUrl: string = '';
    violet: string = '#5932E6';
    yellow: string = '#FFFE00';
    pink: string = '#CF5DFF';
    green: string = '#74FF9E';
    lightGray: string = '#F6F4FE';
    white: string = '#fff';
    black: string = '#000';

    constructor(private router: Router, private urlService : GeturlService) {
        this.urlService.previousUrlObs.subscribe((previousUrl: string) => {
            this.previousUrl = previousUrl;
        });
    }


    redirect(route: string) {
        this.router.navigate([`/${route}`]);        
    }

    ngOnInit(): void {
        switch (this.previousUrl) {
            case '/contact':
                this.fadeInBackgrouncolor(this.green, this.violet);
                break;
            case '/about':
                this.fadeInBackgrouncolor(this.pink, this.violet);
                break;
            case '/proyects':
                this.fadeInBackgrouncolor(this.yellow, this.violet);
                break;
            default:
                break;
        }
    }

    fadeInBackgrouncolor(colorFrom : string, colorTo : string) {
        let fromTo = [
            { background: colorFrom },
            { background: colorTo }
        ];
        let timing = { duration: 1300, easing: 'ease' };
        let divMain = document.querySelector('.divMain') as HTMLElement;

        divMain.animate(fromTo, timing);
    }

    rotateCards(card: string) {
        let el1 = document.querySelector('#homeCard1') as HTMLElement;
        let el2 = document.querySelector('#homeCard2') as HTMLElement;
        let el3 = document.querySelector('#homeCard3') as HTMLElement;
        this.resetPosition(el1);
        this.resetPosition(el2);
        this.resetPosition(el3);

        switch (card) {
            case 'card1':
                this.putPosition(el3, el1, el2);
                break;
            case 'card2':
                this.putPosition(el1, el2, el3);
                break;
            case 'card3':
                this.putPosition(el2, el3, el1);
                break;
            default:
                console.log('error :(');
                break;
        }
    }

    putPosition(el1: HTMLElement, el2: HTMLElement, el3: HTMLElement) {
        el3.style.transform = 'translateX(20%)';
        el2.classList.add('selected');
        el1.style.transform = 'translateX(-20%)';
    }

    resetPosition(el: HTMLElement) {
        el.removeAttribute('style');
        el.classList.remove('selected');
    }

    @HostListener('document:mousemove', ['$event']) onMouseMove(e: MouseEvent) {
        let maxWidthWin = window.innerWidth;
        let maxHeightWin = window.innerHeight;
        let header1 = document.querySelector('.divLeft__h1--1') as HTMLElement;
        let header2 = document.querySelector('.divLeft__h1--2') as HTMLElement;
        let header3 = document.querySelector('.divLeft__h1--3') as HTMLElement;
        let cards = document.querySelector('#divRight') as HTMLElement;
        let linksA = document.querySelectorAll(
            '.divLinks__a'
        ) as NodeListOf<HTMLElement>;
        let linksP = document.querySelectorAll(
            '.divLinks__a--text'
        ) as NodeListOf<HTMLElement>;
        let { pageX: x, pageY: y } = e,
            { offsetWidth: cWidth, offsetHeight: cHeight } = cards,
            { offsetWidth: h1Width, offsetHeight: h1Height } = header1,
            { offsetWidth: h2Width, offsetHeight: h2Height } = header2,
            { offsetWidth: h3Width, offsetHeight: h3Height } = header3,
            { offsetWidth: aWidth, offsetHeight: aHeight } = linksA[0],
            { offsetWidth: pWidth, offsetHeight: pHeight } = linksP[0],
            //-(MaxWidth of Window - (X Cursor position * 2))
            //- to invert direction movement
            //Cursor position * 2 to get half the size of the window
            //when the total size is substacted
            cxMove = -(maxWidthWin - x * 2) / cWidth,
            cyMove = -(maxHeightWin - y * 2) / cHeight,
            axMove = -(maxWidthWin - x * 2) / (aWidth + 50),
            ayMove = -(maxHeightWin - y * 2) / (aHeight + 50),
            pxMove = -(maxWidthWin - x * 2) / (pWidth + 600),
            pyMove = -(maxHeightWin - y * 2) / (pHeight + 600),
            h1xMove = -(maxWidthWin - x * 2) / (h1Width - 300),
            h1yMove = -(maxHeightWin - y * 2) / (h1Height - 105),
            h2xMove = -(maxWidthWin - x * 2) / (h2Width - 200),
            h2yMove = -(maxHeightWin - y * 2) / (h2Height - 75),
            h3xMove = -(maxWidthWin - x * 2) / (h3Width - 100),
            h3yMove = -(maxHeightWin - y * 2) / h3Height;

        cards.style.transform = `translate(${cxMove}px, ${cyMove}px)`;
        header1.style.transform = `translate(${h1xMove}px, ${h1yMove}px)`;
        header2.style.transform = `translate(${h2xMove}px, ${h2yMove}px)`;
        header3.style.transform = `translate(${h3xMove}px, ${h3yMove}px)`;
        linksA.forEach((e) => {
            e.style.transform = `translate(${axMove}px, ${ayMove}px)`;
        });
        linksP.forEach((e) => {
            e.style.transform = `translate(${pxMove}px, ${pyMove}px)`;
        });
    }
}
