import { Component, OnInit } from "@angular/core";
import { HistoryFacade } from './history.facade';
import { Observable, EMPTY, combineLatest } from 'rxjs';
import { Optimization } from 'src/app/models/optimization';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Component({
  selector: "app-history",
  templateUrl: "history.component.html",
  styleUrls: ["history.component.scss"]
})
export class HistoryComponent implements OnInit {

  readonly connector_names: object
  optimizations: Observable<object>

  constructor(private facade: HistoryFacade,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.connector_names = environment.connectors
  }

  ngOnInit() {

    this.spinner.show()

    // Bind data
    this.optimizations = combineLatest([this.facade.optimizations$, this.facade.loadFutureOptimizations()]).pipe(
      map(([history, future]) => {
        return {
          history: history,
          future: future
        }
      }),
      finalize(() => this.spinner.hide()),
      catchError(() => {

        this.toastr.error('Something went wrong, please try again.', 'Oh no!', {
          positionClass: 'toast-bottom-center'
        })

        return EMPTY
      })
    )
  }
}
