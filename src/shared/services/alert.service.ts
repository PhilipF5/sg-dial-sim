import { Injectable } from "@angular/core";

import { Subject } from "rxjs";

import { AlertConfig } from "shared/models";

@Injectable()
export class AlertService {
	public alerts: Subject<AlertConfig> = new Subject<AlertConfig>();
}
