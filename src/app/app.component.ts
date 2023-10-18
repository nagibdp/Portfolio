import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { GeturlService } from './services/geturl.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'portfolio';

    previousUrl: string = '';
    currentUrl: string = '';

    constructor(private router: Router, private urlService : GeturlService) {}
    ngOnInit(): void {
        this.router.events
            .pipe(
                filter(
                    (event): event is NavigationEnd =>
                        event instanceof NavigationEnd
                )
            )
            .subscribe((e: NavigationEnd) => {
                this.previousUrl = this.currentUrl;
                this.currentUrl = e.url;
                this.urlService.setPreviousUrl(this.previousUrl);
            });
    }
}
