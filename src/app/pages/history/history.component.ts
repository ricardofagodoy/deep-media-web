import { Component, OnInit } from "@angular/core";
import { HistoryFacade } from './history.facade';
import { Observable } from 'rxjs';
import { History } from 'src/app/models/history';

@Component({
  selector: "app-history",
  templateUrl: "history.component.html",
  styleUrls: ["history.component.scss"]
})
export class HistoryComponent implements OnInit {

  history : Observable<History[]>

  constructor(private facade : HistoryFacade) {}

  ngOnInit() {
    this.history = this.facade.history$
  }
}
