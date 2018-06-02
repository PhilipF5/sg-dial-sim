import { Injectable } from "@angular/core";

import { BehaviorSubject, PartialObserver, Subscription } from "rxjs";

import { GateStatus } from "shared/models";

@Injectable()
export class GateStatusService {
	public readonly status$: BehaviorSubject<GateStatus> = new BehaviorSubject<GateStatus>(GateStatus.Idle);

	public active(): void {
		this.update(GateStatus.Active);
	}

	public dialing(): void {
		this.update(GateStatus.Dialing);
	}

	public engaged(): void {
		this.update(GateStatus.Engaged);
	}

	public idle(): void {
		this.update(GateStatus.Idle);
	}

	public incoming(): void {
		this.update(GateStatus.Incoming);
	}

	public shutdown(): void {
		this.update(GateStatus.Shutdown);
		this.status$.subscribe()
	}

	public subscribe(observer: (status: GateStatus) => any): Subscription {
		return this.status$.subscribe(observer);
	}

	public update(status: GateStatus): void {
		this.status$.next(status);
	}
}
