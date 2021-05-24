import { Component, OnInit } from "@angular/core";
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable } from 'rxjs';

@Component({
  selector: "app-connector",
  templateUrl: "connector.component.html"
})
export class ConnectorComponent implements OnInit {

  public connectors : Observable<string[]>

  constructor(private repository : ApiRepository) {
    this.connectors = this.repository.getConnectors()
  }

  ngOnInit() {}
}