import { Component, OnInit, Input } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ApiRepository } from 'src/app/repository/ApiRepository';

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
  public active : boolean

  @Input()
  public type : string

  constructor(
    private repository : ApiRepository, 
    private auth: AngularFireAuth) {}

  ngOnInit() {}

  connect() {

    const provider = new firebase.auth.GoogleAuthProvider()
    this.SCOPES.forEach(scope => provider.addScope(scope))

    this.auth.signInWithPopup(provider).then(credentials => {
      this.repository.setConnector({
        type: this.type,
        credentials: {
          access_token: credentials.credential.toJSON()['oauthAccessToken'],
          refresh_token: credentials.user.refreshToken
        }
      }).subscribe(() => this.active = true)
    })
  }
}
