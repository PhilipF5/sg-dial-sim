import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { AlertComponent } from "app/shared/components/alert/alert.component";
import { AlertConfig } from "app/shared/models";
import { AlertService } from "app/shared/services";

@Component({
	selector: "sg-alert-factory",
	templateUrl: "./alert-factory.component.html",
	styleUrls: ["./alert-factory.component.scss"],
})
export class AlertFactoryComponent implements OnInit {
	@ViewChild("container", { read: ViewContainerRef, static: true }) private container: ViewContainerRef;

	private alert: ComponentRef<AlertComponent>;

	constructor(private alertService: AlertService) {}

	ngOnInit() {
		this.alertService.alerts.subscribe((a) => this.createAlert(a));
	}

	private createAlert(config: AlertConfig) {
		this.container.clear();
		this.alert = this.container.createComponent(AlertComponent);

		this.alert.instance.title = config.title;
		this.alert.instance.text1 = config.text1;
		this.alert.instance.text2 = config.text2;
		this.alert.instance.footer = config.footer;

		if (config.duration) {
			setTimeout(() => {
				this.alert.destroy();
			}, config.duration);
		}
	}
}
