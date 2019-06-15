import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { AlertComponent } from "app/shared/components/alert/alert.component";
import { AlertConfig } from "app/shared/models";
import { AlertService } from "app/shared/services";

@Component({
	selector: "alert-factory",
	templateUrl: "./alert-factory.component.html",
	styleUrls: ["./alert-factory.component.scss"],
	entryComponents: [AlertComponent],
})
export class AlertFactoryComponent implements OnInit {
	@ViewChild("container", { read: ViewContainerRef, static: true }) private container: ViewContainerRef;

	private alert: ComponentRef<AlertComponent>;

	constructor(private alertService: AlertService, private resolver: ComponentFactoryResolver) {}

	ngOnInit() {
		this.alertService.alerts.subscribe(a => this.createAlert(a));
	}

	private createAlert(config: AlertConfig) {
		this.container.clear();
		let factory = this.resolver.resolveComponentFactory(AlertComponent);
		this.alert = this.container.createComponent(factory);

		this.alert.instance.critical = config.critical;
		this.alert.instance.message = config.message;
		this.alert.instance.title = config.title;

		if (config.duration) {
			setTimeout(() => {
				this.alert.destroy();
			}, config.duration);
		}
	}
}
