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

import { Sound } from "shared/models";

@Injectable()
export class AudioService {
	private eventHorizonAudio: HTMLAudioElement;
	private ringAudio: HTMLAudioElement;

	public failRing(): HTMLAudioElement {
		let audio = new Audio();
		audio.src = Sound.RingFail;
		audio.volume = 0.05;
		audio.play();
		this.ringAudio.pause();
		return audio;
	}

	public play(sound: Sound): HTMLAudioElement {
		let audio = new Audio();
		audio.src = sound;
		audio.volume = 0.05;
		audio.play();
		return audio;
	}

	public startEventHorizon(): void {
		this.eventHorizonAudio = new Audio();
		this.eventHorizonAudio.src = Sound.EventHorizon;
		this.eventHorizonAudio.volume = 0.05;
		this.eventHorizonAudio.loop = true;

		let audio = new Audio();
		audio.src = Sound.GateOpen;
		audio.volume = 0.05;
		audio.play();

		audio.onended = () => {
			this.eventHorizonAudio.play();
		};
	}

	public startRing(): void {
		this.ringAudio = new Audio();
		this.ringAudio.src = Sound.RingSpin;
		this.ringAudio.volume = 0.05;
		this.ringAudio.play();
	}

	public stopEventHorizon(): void {
		let audio = new Audio();
		audio.src = Sound.GateClose;
		audio.volume = 0.05;
		audio.play();
		this.eventHorizonAudio.pause();
	}

	public stopRing(): void {
		let audio = new Audio();
		audio.src = Sound.RingStop;
		audio.volume = 0.05;
		this.ringAudio.pause();
		audio.play();
	}
}
