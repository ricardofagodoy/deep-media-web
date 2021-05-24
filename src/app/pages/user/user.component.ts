import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  
  constructor(
    private toastr: ToastrService, 
    public auth: AngularFireAuth) {}

  ngOnInit() {}

  save() {
    this.toastr.info('Hello world!', 'Toastr fun!', {
      positionClass: 'toast-bottom-center'
    });
  }
}
