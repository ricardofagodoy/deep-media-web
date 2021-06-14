import { Injectable } from '@angular/core';
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/models/configuration';

@Injectable({
    providedIn: 'root',
})
export class CampaignsFacade {

    public constructor(private repository : ApiRepository) {}

    public loadConnectorOptions(type : string) : Observable<any> {
        return this.repository.getConnectorOptions(type)
    }

    public loadConnectors() {
        return this.repository.getConnectors()
    }

    public loadConfiguration() {
        return this.repository.getConfigurations()
    }

    public saveConfiguration(configuration : Configuration) {
        return this.repository.setConfigurations(configuration)
    }

    public deleteConfiguration(id : string) {
        return this.repository.deleteConfiguration(id)
    }
}