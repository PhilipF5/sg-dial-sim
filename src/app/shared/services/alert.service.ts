import { Injectable } from "@angular/core";
import { AlertConfig } from "app/shared/models";
import { Subject } from "rxjs";

@Injectable()
export class AlertService {
	public alerts: Subject<AlertConfig> = new Subject<AlertConfig>();
}
