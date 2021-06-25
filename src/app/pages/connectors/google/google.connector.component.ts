import { Component, OnInit, Input } from "@angular/core";
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-google-connector",
  templateUrl: "google.connector.component.html",
  styleUrls: ["google.connector.scss"]
})
export class GoogleConnectorComponent implements OnInit {

  private readonly type = 'google'

  public readonly SCOPES = [
    'https://www.googleapis.com/auth/adwords',
    'https://www.googleapis.com/auth/analytics.readonly'
  ]

  @Input()
  public active: boolean

  constructor(
    private repository: ApiRepository,
    private authService: SocialAuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() { }

  connect() {

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, {
      scope: this.SCOPES.join(' ')
    }).then(response => {

      this.spinner.show()

      // Sends to backend
      this.repository.setConnector({
        type: this.type,
        configuration: {
          authorization_code: response.authorizationCode
        }
      }).pipe(
        finalize(() => this.spinner.hide())
      ).subscribe(() => {
        this.active = true

        this.toastr.success('Google Ads connected.', 'Success', {
          positionClass: 'toast-bottom-center'
        })
      }, (error) => {

        const message = error?.error?.error?.join(', ') || 'Internal error - please try again'

        this.toastr.error(message, 'Error', {
          positionClass: 'toast-bottom-center',
          disableTimeOut: true
        })
      })
    })
  }

  disconnect() {

    this.spinner.show()

    this.repository.deleteConnector(this.type).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(() => {

      this.active = false

      this.toastr.success('Google Ads removed.', 'Success', {
        positionClass: 'toast-bottom-center'
      })
    }, () => {
      this.toastr.error('Something went wrong, try again in a few seconds.', 'Error', {
        positionClass: 'toast-bottom-center'
      })
    })
  }

  refresh() {

    this.spinner.show()

    this.repository.refreshConnector(this.type).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(() => {
      this.toastr.success('Google Ads refreshed.', 'Success', {
        positionClass: 'toast-bottom-center'
      })
    }, () => {
      this.toastr.error('Something went wrong, try again in a few seconds.', 'Error', {
        positionClass: 'toast-bottom-center'
      })
    })
  }
}
