/* SGC Computer Simulator
Copyright (C) 2018  Philip Fulgham

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */

import { Injectable } from "@angular/core";

import { BehaviorSubject, Subscription } from "rxjs";

import { GateStatus } from "shared/models";

@Injectable()
export class GateStatusService {
	public readonly status$: BehaviorSubject<GateStatus> = new BehaviorSubject<GateStatus>(GateStatus.Idle);

	public aborted(): void {
		this.update(GateStatus.Aborted);
	}

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
	}

	public subscribe(observer: (status: GateStatus) => any): Subscription {
		return this.status$.subscribe(observer);
	}

	public update(status: GateStatus): void {
		this.status$.next(status);
	}
}
