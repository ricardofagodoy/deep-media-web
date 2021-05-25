import { Injectable } from '@angular/core';
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/models/configuration';

@Injectable({
    providedIn: 'root',
})
export class CampaignsFacade {

    private configuration : Observable<Configuration[]>

    public constructor(private repository : ApiRepository) {
        this.configuration = this.loadConfiguration()
    }

    get configuration$() {
        return this.configuration
    }

    public loadConnectorOptions(type : string) {
        return this.repository.getConnectorOptions(type)
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