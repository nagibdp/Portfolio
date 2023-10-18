import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeturlService {
    private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public previousUrlObs: Observable<string> = this.previousUrl.asObservable();
    constructor() {}

    setPreviousUrl(previousUrl: string) {
        this.previousUrl.next(previousUrl);
    }
}
