import { Component, OnInit } from "@angular/core";
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { Observable, EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, catchError } from 'rxjs/operators';

@Component({
  selector: "app-connector",
  templateUrl: "connector.component.html"
})
export class ConnectorComponent implements OnInit {

  public connectors : Observable<string[]>

  constructor(private repository : ApiRepository,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    
    this.spinner.show()

    this.connectors = this.repository.getConnectors()
    .pipe(
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