import { Component, OnInit } from "@angular/core";
import { HistoryFacade } from './history.facade';
import { Observable } from 'rxjs';
import { Optimization } from 'src/app/models/optimization';

@Component({
  selector: "app-history",
  templateUrl: "history.component.html",
  styleUrls: ["history.component.scss"]
})
export class HistoryComponent implements OnInit {

  optimizations : Observable<Optimization>

  constructor(private facade : HistoryFacade) {}

  ngOnInit() {
    this.optimizations = this.facade.optimizations$
  }
}
