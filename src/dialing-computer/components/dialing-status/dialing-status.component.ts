import { Component, Input } from "@angular/core";

@Component({
	selector: "dialing-status",
	templateUrl: "./dialing-status.component.html",
	styleUrls: ["./dialing-status.component.scss"]
})
export class DialingStatusComponent {
	@Input() status = "IDLE";
}
