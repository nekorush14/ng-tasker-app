import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements OnInit {
  statusCode = signal(404);
  message = signal('Page not found');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      if (data['statusCode']) {
        this.statusCode.set(data['statusCode']);
      }
      if (data['message']) {
        this.message.set(data['message']);
      }
    });
  }
}
