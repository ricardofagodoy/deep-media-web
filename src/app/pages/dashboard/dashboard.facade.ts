import { Injectable } from '@angular/core';
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable } from 'rxjs';
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

    public loadTicks(configuration_id: string, data?) {
        return this.repository.getTicks(configuration_id, data)
    }
}