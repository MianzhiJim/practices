import { Component, EventEmitter, Output, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [FormsModule, AutoCompleteModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.css'
})
export class AutoCompleteComponent {
  service = inject(SearchService);
  keyword = '';
  results: string[] = [];
  @Output()
  onSelect = new EventEmitter();

  onChange() {
    this.service.getInfo(this.keyword)
    .pipe(
      map(response => response[1] || [])
    )
    .subscribe(data => {
      console.log(data);
      this.results = [...data];
    })
  }
}
