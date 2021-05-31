import { Component, OnInit, Input } from "@angular/core";
import { ApiRepository } from 'src/app/repository/ApiRepository';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: "app-google-connector",
  templateUrl: "google.connector.component.html"
})
export class GoogleConnectorComponent implements OnInit {

  public readonly SCOPES = [
    'https://www.googleapis.com/auth/adwords',
    'https://www.googleapis.com/auth/analytics.readonly'
  ]

  @Input()
  public active: boolean

  @Input()
  public type: string

  constructor(
    private repository: ApiRepository,
    private authService: SocialAuthService) { }

  ngOnInit() { }

  connect() {

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, {
      scope: this.SCOPES.join(' ')
    }).then(response => {

      // Sends to backend
      this.repository.setConnector({
        type: this.type,
        configuration: {
          authorization_code: response.authorizationCode
        }
      }).subscribe(() => this.active = true)
    })
  }
}
