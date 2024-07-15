import { Testimonial } from './../models/data.model';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { GetDataService } from 'src/services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InfiniteScroll';
  service = inject(GetDataService);
  testimonialContainer: Array<Testimonial> = [];
  hasNext = false;
  after = -1;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.service.getFirstFive().subscribe(data => {
      // console.log(data);
      this.hasNext = data.hasNext;
      for (let testimonial of data.testimonials) {
        this.testimonialContainer.push(testimonial);
      }
      this.after = this.testimonialContainer[this.testimonialContainer.length - 1].id;
      // console.log(this.after)
    });
  }

  onScroll() {
    const ele = this.elRef.nativeElement.querySelector('#container');
    // console.log(ele.scrollHeight, ele.clientHeight, ele.scrollTop);
    if (ele.scrollTop + ele.clientHeight === ele.scrollHeight) {
      // console.log(this.hasNext)
      if (this.hasNext) {
        this.service.getMore(this.after).subscribe(data => {
          // console.log(data);
          this.hasNext = data.hasNext;
          for (let testimonial of data.testimonials) {
            this.testimonialContainer.push(testimonial);
          }
          this.after = this.testimonialContainer[this.testimonialContainer.length - 1].id;
        });
      }
      else {
        alert('No more data');
      }
    }
  }
}
