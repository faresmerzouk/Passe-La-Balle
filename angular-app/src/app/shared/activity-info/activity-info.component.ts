import {Component, Input, OnInit} from '@angular/core';
import {faClock, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {Timestamp} from 'rxjs';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.scss']
})
export class ActivityInfoComponent implements OnInit {

  @Input() place: string;
  @Input() sport: string;
  @Input() date: Date;

  newDate: number;
  // fa-icon
  faClock = faClock;
  faMapMarkerAlt = faMapMarkerAlt;

  constructor() { }

  ngOnInit() {
    if (this.date['seconds'] === undefined) {
      this.newDate = this.date.getTime();
    } else {
      this.newDate = this.date['seconds'] * 1000;
    }
  }
}
