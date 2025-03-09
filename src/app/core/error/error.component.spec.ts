import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, provideRouter } from "@angular/router";
import { ErrorComponent } from "./error.component";

describe("ErrorComponent", () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: {} },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default values", () => {
    expect(component.statusCode()).toBe(404);
    expect(component.message()).toBe("Page not found");
  });

  it("should set statusCode and message from history state", () => {
    // Mock history state
    spyOnProperty(window.history, "state").and.returnValue({
      statusCode: 403,
      message: "Forbidden access",
    });

    component.ngOnInit();

    expect(component.statusCode()).toBe(403);
    expect(component.message()).toBe("Forbidden access");
  });

  it("should set statusCode and message from route data", () => {
    // Mock route data
    spyOnProperty(window.history, "state").and.returnValue({});
    route.snapshot.data = { statusCode: 500, message: "Server error" };

    component.ngOnInit();

    expect(component.statusCode()).toBe(500);
    expect(component.message()).toBe("Server error");
  });

  it("should set only statusCode from history state", () => {
    spyOnProperty(window.history, "state").and.returnValue({
      statusCode: 400,
    });

    component.ngOnInit();

    expect(component.statusCode()).toBe(400);
    expect(component.message()).toBe("Page not found");
  });

  it("should set only message from history state", () => {
    spyOnProperty(window.history, "state").and.returnValue({
      message: "Bad Request",
    });

    component.ngOnInit();

    expect(component.statusCode()).toBe(404);
    expect(component.message()).toBe("Bad Request");
  });
});
