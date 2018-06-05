import { Component, OnInit } from '@angular/core';

import { ExecuteService } from './execute/execute.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls:[ './home.component.scss' ]
})
export class HomePageComponent implements OnInit {
  tableOfItems:any[] = [];

  constructor(private executeService: ExecuteService) { }

  ngOnInit(): void {

    this.executeService.getCSVFile()
      .subscribe(
        data => {
          let response = data._body;
          let rows = response.split("\n");
          this.tableOfItems = rows.map(row => row.split(","));
        },
        error => { console.log(error); }
      );
  }

}
