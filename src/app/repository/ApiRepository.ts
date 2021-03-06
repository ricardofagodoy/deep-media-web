import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Connector } from '../models/connector';
import { Configuration } from '../models/configuration';
import { Optimization } from '../models/optimization';
import { Tick } from "../models/tick";

@Injectable({
    providedIn: 'root'
})
export class ApiRepository {

    constructor(private http: HttpClient) {}

    getTicks(configuration_id: string, data?): Observable<Tick[]> {
        return this.http.get<Tick[]>(
            `${environment.backend_host}/performance/${configuration_id}`,
            {params: data}
        )
    }

    getOptimizations(): Observable<Optimization> {
        return this.http.get<Optimization>(
            `${environment.backend_host}/optimizations`
        )
    }

    getFutureOptimizations(): Observable<Optimization> {
        return this.http.get<Optimization>(
            `${environment.backend_host}/future_optimizations`
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

    setConnector(connector : Connector): Observable<string> {
        return this.http.post<string>(
            `${environment.backend_host}/connectors`,
            connector
        )
    }

    refreshConnector(type : string): Observable<unknown> {
        return this.http.get<unknown>(
            `${environment.backend_host}/connectors/${type}/refresh`
        )
    }

    deleteConnector(type : string): Observable<unknown> {
        return this.http.delete<unknown>(
            `${environment.backend_host}/connectors/${type}`
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

    deleteConfiguration(id : string): Observable<unknown> {
        return this.http.delete<unknown>(
            `${environment.backend_host}/configurations/${id}`,
        )
    }
}