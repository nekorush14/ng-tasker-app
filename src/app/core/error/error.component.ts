import { Component, OnInit, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, RouterModule } from "@angular/router";

@Component({
  selector: "app-error",
  imports: [MatButtonModule, RouterModule, RouterModule],
  templateUrl: "./error.component.html",
  styleUrl: "./error.component.scss",
})
export class ErrorComponent implements OnInit {
  readonly statusCode = signal<number>(404);
  readonly message = signal<string>("Page not found");

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const state = history.state;

    if (state && (state.statusCode || state.message)) {
      if (state.statusCode) this.statusCode.set(state.statusCode);
      if (state.message) this.message.set(state.message);
    } else {
      // Otherwise, use the data from the route
      const data = this.route.snapshot.data;
      console.log("[DEBUG] route data:", data);
      if (data["statusCode"]) this.statusCode.set(data["statusCode"]);
      if (data["message"]) this.message.set(data["message"]);
    }
  }
}
