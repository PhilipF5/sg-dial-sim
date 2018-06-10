import { Injectable } from "@angular/core";

import { Sound } from "shared/models";

@Injectable()
export class AudioService {
	private eventHorizonAudio: HTMLAudioElement;
	private ringAudio: HTMLAudioElement;

	public failRing(): HTMLAudioElement {
		let audio = new Audio();
		audio.src = Sound.RingFail;
		audio.play();
		this.ringAudio.pause();
		return audio;
	}

	public play(sound: Sound): HTMLAudioElement {
		let audio = new Audio();
		audio.src = sound;
		audio.play();
		return audio;
	}

	public startEventHorizon(): void {
		this.eventHorizonAudio = new Audio();
		this.eventHorizonAudio.src = Sound.EventHorizon;
		this.eventHorizonAudio.loop = true;

		let audio = new Audio();
		audio.src = Sound.GateOpen;
		audio.play();

		audio.onended = () => {
			this.eventHorizonAudio.play();
		};
	}

	public startRing(): void {
		this.ringAudio = new Audio();
		this.ringAudio.src = Sound.RingSpin;
		this.ringAudio.play();
	}

	public stopEventHorizon(): void {
		let audio = new Audio();
		audio.src = Sound.GateClose;
		audio.play();
		this.eventHorizonAudio.pause();
	}

	public stopRing(): void {
		let audio = new Audio();
		audio.src = Sound.RingStop;
		this.ringAudio.pause();
		audio.play();
	}
}
