import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoCompleteComponent } from "./auto-complete/auto-complete.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AutoCompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  showAlert(event: string) {
    alert(event);
  }
}
