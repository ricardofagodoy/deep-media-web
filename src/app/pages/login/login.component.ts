import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  
  constructor(
    private toastr: ToastrService, 
    public auth: AngularFireAuth,
    private router : Router) {
  }

  ngOnInit() {
    this.auth.user.subscribe(() => {
      this.router.navigate(['/dashboard'])
    })
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  save() {
    this.toastr.info('Hello world!', 'Toastr fun!', {
      positionClass: 'toast-bottom-center'
    });
  }
}
