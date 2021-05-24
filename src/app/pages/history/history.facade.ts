import { Injectable } from '@angular/core';
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/internal/operators';
import { History } from 'src/app/models/history';

@Injectable({
    providedIn: 'root',
})
export class HistoryFacade {

    private history : Observable<History[]>

    public constructor(private repository : ApiRepository) {
        this.history = this.loadHistory().pipe(shareReplay(1))
    }

    get history$() {
        return this.history
    }

    private loadHistory() {
        return this.repository.getHistory()
    }
}