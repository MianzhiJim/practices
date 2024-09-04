import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  template: `
    <div class="btns">
      <button class="btn" (click)="leftClick()">{{ months[pre] }}</button>
      <button class="btn" disabled>{{ months[cur_month] }}/{{ cur_year }}</button>
      <button class="btn" (click)="rightClick()">{{ months[next] }}</button>
    </div>
    <div class="container">
      @if (!selected) {
      <h3>Not Selected</h3>
      } @else {
      <h3>You Selected: {{ selected }}</h3>
      }
      <div class="table">
        <tr>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wen</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
        @for (week of weeks; track week) {
        <tr>
          @for (day of week; track day) {
          <td (click)="onSelect(cur_month, day, cur_year)">{{ day }}</td>
          }
        </tr>
        }
      </div>
    </div>
  `,
  styles: `
    .btns {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn {
    width: 150px;
  }

  .container {
    text-align: center;
  }

  .table {
    width: fit-content;
    margin-inline: auto;
  }

  th,
  td {
    border: 1px solid black;
    height: 35px;
    width: 35px;
  }
  `
})
export class CalendarComponent {
  date = new Date();
  cur_month = this.date.getMonth();
  pre = this.cur_month === 0 ? 11 : this.cur_month - 1;
  next = this.cur_month === 11 ? 0 : this.cur_month + 1;
  cur_year = this.date.getFullYear();
  selected = '';
  days: any[] = [];
  weeks: any[] = [];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  ngOnInit() {
    this.generateCalendar(this.cur_month, this.cur_year);
  }

  generateCalendar(month: number, year: number) {
    const first_day = new Date(year, month).getDay();
    const total_days = new Date(year, month + 1, 0).getDate();

    this.days = [];
    for (let i = 0; i < first_day; i++) {
      this.days.push(null);
    }
    for (let i = 1; i <= total_days; i++) {
      this.days.push(i);
    }

    this.weeks = [];
    for (let i = 0; i < this.days.length; i += 7) {
      this.weeks.push(this.days.slice(i, i + 7));
    }
  }

  leftClick() {
    this.cur_month--;
    this.pre--;
    this.next--;
    if (this.pre < 0) {
      this.pre = 11;
    }
    if (this.cur_month < 0) {
      this.cur_month = 11;
      this.cur_year--;
    }
    if (this.next < 0) {
      this.next = 11;
    }
    this.generateCalendar(this.cur_month, this.cur_year);
  }

  rightClick() {
    this.cur_month++;
    this.pre++;
    this.next++;
    if (this.next > 11) {
      this.next = 0;
    }
    if (this.cur_month > 11) {
      this.cur_month = 0;
      this.cur_year++;
    }
    if (this.pre > 11) {
      this.pre = 0;
    }
    this.generateCalendar(this.cur_month, this.cur_year);
  }

  onSelect(month: number, day: number, year: number) {
    if (day !== null) {
      this.selected = `${month + 1}/${day}/${year}`;
    }
  }
}
