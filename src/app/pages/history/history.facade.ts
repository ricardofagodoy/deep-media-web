import { Injectable } from '@angular/core';
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable } from 'rxjs';
import { Optimization } from 'src/app/models/optimization';

@Injectable({
    providedIn: 'root',
})
export class HistoryFacade {

    private optimizations : Observable<Optimization>

    public constructor(private repository : ApiRepository) {
        this.optimizations = this.loadOptimizations()
    }

    get optimizations$() {
        return this.optimizations
    }

    private loadOptimizations() {
        return this.repository.getOptimizations()
    }
}