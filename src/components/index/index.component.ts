import { Component, OnInit } from '@angular/core';
import {ContextService} from "../../mercury/services/base/ContextService";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  quotestate: string = "NV";
  quotezip: string = "";

  constructor(private contextService: ContextService) { }

  ngOnInit(): void {
  }

}
