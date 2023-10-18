import {
    AfterContentInit,
    Component,
    HostListener,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { GeturlService } from '../services/geturl.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterContentInit, OnInit {
    previousUrl: string = '';
    violet: string = '#5932E6';
    yellow: string = '#FFFE00';
    pink: string = '#CF5DFF';
    green: string = '#74FF9E';
    lightGray: string = '#F6F4FE';
    white: string = '#fff';
    black: string = '#000';
    timeout: boolean = false;
    optionAbout: string = 'gmail';

    constructor(private router: Router, private urlService: GeturlService) {
        this.urlService.previousUrlObs.subscribe((previousUrl: string) => {
            this.previousUrl = previousUrl;
        });
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.timeout = true;
        }, 1300);
        switch (this.previousUrl) {
            case '/':
                this.moveLogoToTopAnimation();
                this.moveLinksToBotAnimation();
                this.fadeInBackgrouncolor(this.violet, this.green);
                setTimeout(() => {
                    this.removeCards();
                    //this.timeout = true;
                }, 1300);
                break;
            case '/about':
                this.fadeInBackgrouncolor(this.pink, this.green);
                break;
            case '/proyects':
                this.fadeInBackgrouncolor(this.yellow, this.green);
                break;
            default:
                break;
        }
    }

    ngAfterContentInit(): void {}

    removeCards() {
        let divContainer = document.querySelector(
            '.divMain__divRight'
        ) as HTMLElement;
        divContainer.remove();
    }

    fadeInBackgrouncolor(colorFrom: string, colorTo: string) {
        let fromTo = [{ background: colorFrom }, { background: colorTo }];
        let timing = { duration: 1300, easing: 'ease' };
        let divMain = document.querySelector('.divMain') as HTMLElement;

        divMain.animate(fromTo, timing);
    }

    moveLogoToTopAnimation() {
        let fromTo = [
            {
                transform: 'translateY(35vh)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            },
            {},
        ];
        let timing = { duration: 1100, easing: 'ease' };
        let h1_1 = document.querySelector('.divLeft__h1--1') as HTMLElement;
        let h1_2 = document.querySelector('.divLeft__h1--2') as HTMLElement;
        let h1_3 = document.querySelector('.divLeft__h1--3') as HTMLElement;
        let h1_4 = document.querySelector('.divLeft__h1--4') as HTMLElement;
        let h1_5 = document.querySelector('.divLeft__h1--5') as HTMLElement;

        h1_1.animate(
            [
                {
                    transform: 'translateY(35vh)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    color: 'rgba(255, 255, 255, 1)',
                },
                {},
            ],
            timing
        );
        h1_2.animate(fromTo, timing);
        h1_3.animate(fromTo, timing);
        h1_4.animate(fromTo, timing);
        h1_5.animate(fromTo, timing);
    }

    moveLinksToBotAnimation() {
        let fromTo = [
            {
                transform: 'translateY(-28vh)',
                height: '47px',
            },
            {},
        ];
        let timing = { duration: 1300, easing: 'ease' };
        let divLinks = document.querySelectorAll(
            '.divLinks__div'
        ) as NodeListOf<HTMLElement>;

        divLinks.forEach((e) => {
            e.animate(fromTo, timing);
        });
    }

    showTextLinks(className: string) {
        let divLinks__a__text = document.querySelector(
            className
        ) as HTMLElement;
        divLinks__a__text.style.opacity = '100%';
    }

    hideTextLinks(className: string) {
        let divLinks__a__text = document.querySelector(
            className
        ) as HTMLElement;
        divLinks__a__text.style.opacity = '0';
    }

    selectedOptionAbout(option: string) {
        let github = document.querySelector(
            '.divRightAbout__divText--github'
        ) as HTMLElement;
        let gmail = document.querySelector(
            '.divRightAbout__divText--gmail'
        ) as HTMLElement;
        let linkedin = document.querySelector(
            '.divRightAbout__divText--linkedin'
        ) as HTMLElement;
        let youtube = document.querySelector(
            '.divRightAbout__divText--youtube'
        ) as HTMLElement;

        this.clearOptions(github);
        this.clearOptions(gmail);
        this.clearOptions(linkedin);
        this.clearOptions(youtube);

        switch (option) {
            case 'github':
                this.optionAbout = option;
                github.classList.add('selectedAbout');
                break;
            case 'gmail':
                this.optionAbout = option;
                gmail.classList.add('selectedAbout');
                break;
            case 'linkedin':
                this.optionAbout = option;
                linkedin.classList.add('selectedAbout');
                break;
            case 'youtube':
                this.optionAbout = option;
                youtube.classList.add('selectedAbout');
                break;
            default:
                break;
        }
    }

    clearOptions(element: HTMLElement) {
        //element.removeAttribute('style');
        element.classList.remove('selectedAbout');
    }

    @HostListener('document:mousemove', ['$event']) onMouseMove(e: MouseEvent) {
        let maxWidthWin = window.innerWidth;
        let maxHeightWin = window.innerHeight;
        let header1 = document.querySelector('.divLeft__h1--1') as HTMLElement;
        let header2 = document.querySelector('.divLeft__h1--2') as HTMLElement;
        let header3 = document.querySelector('.divLeft__h1--3') as HTMLElement;
        let header5 = document.querySelector('.divLeft__h1--5') as HTMLElement;
        let linksP = document.querySelectorAll(
            '.divLinks__a--text'
        ) as NodeListOf<HTMLElement>;
        let { pageX: x, pageY: y } = e;

        // SVGs
        try {
            let svgs = document.querySelector(
                '.divRightAbout__circle'
            ) as HTMLElement;
            let { offsetWidth: sWidth, offsetHeight: sHeight } = svgs,
                sxMove = -(maxWidthWin - x * 2) / (sWidth - 500),
                syMove = (maxHeightWin - y * 2) / (sHeight - 200);
            svgs.style.transform = `rotate(${syMove+sxMove}deg)`;
            //svgs.style.transform = `scale(1.2)`;
        } catch (e) {}

        //cards
        try {
            let cards = document.querySelector('#divRight') as HTMLElement;

            let { offsetWidth: cWidth, offsetHeight: cHeight } = cards,
                cxMove = -(maxWidthWin - x * 2) / cWidth,
                cyMove = -(maxHeightWin - y * 2) / cHeight;

            cards.style.transform = `translate(${cxMove}px, ${cyMove}px)`;
        } catch (e) {}

        let { offsetWidth: h1Width, offsetHeight: h1Height } = header1,
            { offsetWidth: h2Width, offsetHeight: h2Height } = header2,
            { offsetWidth: h3Width, offsetHeight: h3Height } = header3,
            { offsetWidth: h5Width, offsetHeight: h5Height } = header5,
            { offsetWidth: pWidth, offsetHeight: pHeight } = linksP[0],
            //-(MaxWidth of Window - (X Cursor position * 2))
            //- to invert direction movement
            //Cursor position * 2 to get half the size of the window
            //when the total size is substacted

            pxMove = -(maxWidthWin - x * 2) / (pWidth + 600),
            pyMove = -(maxHeightWin - y * 2) / (pHeight + 600),
            h5xMove = +(maxWidthWin - x * 2) / (h5Width - 300),
            h5yMove = -(maxHeightWin - y * 2) / (h5Height - 105),
            h1xMove = -(maxWidthWin - x * 2) / (h1Width - 300),
            h1yMove = -(maxHeightWin - y * 2) / (h1Height - 105),
            h2xMove = -(maxWidthWin - x * 2) / (h2Width - 200),
            h2yMove = -(maxHeightWin - y * 2) / (h2Height - 75),
            h3xMove = -(maxWidthWin - x * 2) / (h3Width - 100),
            h3yMove = -(maxHeightWin - y * 2) / h3Height;

        header1.style.transform = `translate(${h1xMove}px, ${h1yMove}px)`;
        header2.style.transform = `translate(${h2xMove}px, ${h2yMove}px)`;
        header3.style.transform = `translate(${h3xMove}px, ${h3yMove}px)`;
        header5.style.transform = `translate(${h5xMove}px, ${h5yMove}px)`;

        linksP.forEach((e) => {
            e.style.transform = `translate(${pxMove}px, ${pyMove}px)`;
        });
    }
}
