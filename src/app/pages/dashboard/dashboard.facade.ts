import { Injectable } from '@angular/core';
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable } from 'rxjs';
import { Performance } from 'src/app/models/Performance';
import { shareReplay } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root',
})
export class DashboardFacade {

    public constructor(private repository : ApiRepository) {
    }

    public loadConfiguration() {
        return this.repository.getConfigurations()
    }

    public loadPerformance(configuration_id: string) {
        return this.repository.getPerformance(configuration_id)
    }
}