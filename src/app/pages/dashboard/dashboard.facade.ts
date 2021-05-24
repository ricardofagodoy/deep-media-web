import { Injectable } from '@angular/core';
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable } from 'rxjs';
import { Performance } from 'src/app/models/Performance';
import { shareReplay } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root',
})
export class DashboardFacade {

    private performance : Observable<Performance>

    public constructor(private repository : ApiRepository) {
        this.performance = this.loadPerformance().pipe(shareReplay(1))
    }

    get performance$() {
        return this.performance
    }

    private loadPerformance() {
        return this.repository.getPerformance()
    }
}