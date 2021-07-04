import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'calendar-popup',
  templateUrl: 'calendar-popup.html',
  styles: [`
    .form-group.hidden {
      width: 0;
      margin: 0;
      border: none;
      padding: 0;
    }
    .picker {
        flex: auto;
        justify-content: center;
    }
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class CalendarPopupComponent implements OnInit {

  @Output()
  valid = new EventEmitter<any>()

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {}

  ngOnInit() {
    this.fromDate = this.calendar.getPrev(this.calendar.getToday(), 'd', 7)
    this.onDateSelection(this.calendar.getToday())
  }

  onDateSelection(date: NgbDate) {

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
        this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    // Event to parent
    this.valid.emit({
        from: this.fromDate,
        to: this.toDate
    })
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(input: string) {

    const parsed = this.formatter.parse(input)

    if (parsed && this.calendar.isValid(NgbDate.from(parsed)))
        this.onDateSelection(NgbDate.from(parsed))
  }
}