import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mig-progression-header',
  templateUrl: './mig-progression-header.component.html',
  styleUrls: ['./mig-progression-header.component.css']
})
export class MigProgressionHeaderComponent implements OnInit {

  @Input() page?: string;
  public migClickable: boolean = false;
  public editUnchanged: boolean = false;
  public menuEditMode: boolean = false;
  public percentComplete: number = 0;
  public hideDateOfBirth: boolean = false;
  public rate: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  public hideMenu() {

  }

  public goToNextView() {

  }

  public showUpdateRate() {

  }

  public enableMenu() {

  }

  public enableBreadcrumbs() {

  }

  public updateSubmissionMenu(label: string, page: any, rate: number) {
  }

  public showSelectedView(label: string, page: any, rate?: number) {
  }

  public updateRate(rate: number) {

  }

  public hideModalOverlay() {

  }
}
