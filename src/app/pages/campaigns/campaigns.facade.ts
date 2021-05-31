import { Injectable } from '@angular/core';
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/models/configuration';
import { shareReplay } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root',
})
export class CampaignsFacade {

    private configuration : Observable<Configuration[]>
    private connectorOptions : Map<string, Observable<any>>

    public constructor(private repository : ApiRepository) {
        this.configuration = this.loadConfiguration()
        this.connectorOptions = new Map()
    }

    get configuration$() {
        return this.configuration
    }

    public loadConnectorOptions(type : string) {

        if (this.connectorOptions[type])
            return this.connectorOptions[type]

        this.connectorOptions[type] = this.repository
            .getConnectorOptions(type)
            .pipe(shareReplay(1))

        return this.connectorOptions[type]
    }

    public loadConnectors() {
        return this.repository.getConnectors()
    }

    private loadConfiguration() {
        return this.repository.getConfigurations()
    }

    public saveConfiguration(configuration : Configuration) {
        return this.repository.setConfigurations(configuration)
    }
}