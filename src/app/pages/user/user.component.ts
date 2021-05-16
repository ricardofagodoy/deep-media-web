import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  
  constructor(private toastr: ToastrService) {}

  ngOnInit() {}

  save() {
    this.toastr.info('Hello world!', 'Toastr fun!', {
      positionClass: 'toast-bottom-center'
    });
  }
}
