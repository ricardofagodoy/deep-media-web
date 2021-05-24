import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-guest-layout",
  templateUrl: "./guest-layout.component.html",
  styleUrls: ["./guest-layout.component.scss"]
})
export class GuestLayoutComponent implements OnInit {

  public sidebarColor: string = "red";

  constructor() {}
  
  changeSidebarColor(color){
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
        mainPanel.setAttribute('data',color);
    }
  }
  changeDashboardColor(color){
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
        body.classList.add(color);
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  ngOnInit() {}
}
