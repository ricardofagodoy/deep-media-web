import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Performance } from '../models/Performance';
import { Connector } from '../models/connector';
import { Configuration } from '../models/configuration';
import { Optimization } from '../models/optimization';

@Injectable({
    providedIn: 'root'
})
export class ApiRepository {

    constructor(private http: HttpClient) {}

    getPerformance(): Observable<Performance> {
        return this.http.get<Performance>(
            `${environment.backend_host}/performance`
        )
    }

    getOptimizations(): Observable<Optimization> {
        return this.http.get<Optimization>(
            `${environment.backend_host}/optimizations`
        )
    }

    getConnectors(): Observable<string[]> {
        return this.http.get<string[]>(
            `${environment.backend_host}/connectors`
        )
    }

    getConnectorOptions(type : string): Observable<any> {
        return this.http.get<any>(
            `${environment.backend_host}/connectors/${type}`
        )
    }

    setConnector(connector : Connector): Observable<unknown> {
        return this.http.post<unknown>(
            `${environment.backend_host}/connectors`,
            connector
        )
    }

    getConfigurations(): Observable<Configuration[]> {
        return this.http.get<Configuration[]>(
            `${environment.backend_host}/configurations`
        )
    }

    setConfigurations(configurations : Configuration): Observable<Configuration> {
        return this.http.post<Configuration>(
            `${environment.backend_host}/configurations`,
            configurations
        )
    }
}