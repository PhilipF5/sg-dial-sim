import { Action } from "@ngrx/store";
import { Glyph } from "app/shared/models";

export enum DialingComputerActionTypes {
	AbortDialing = "[Dialing Computer] Abort Dialing",
	BeginDialing = "[Dialing Computer] Begin Dialing",
	DialGlyph = "[Dialing Computer] Dialing Glyph",
	EngageChevron = "[Dialing Computer] Engage Chevron",
	OpenGate = "[Dialing Computer] Open Gate",
	ShutdownGate = "[Dialing Computer] Shutdown Gate",
}

export namespace DialingComputerActions {
	export class AbortDialing implements Action {
		readonly type = DialingComputerActionTypes.AbortDialing;
	}

	export class BeginDialing implements Action {
		readonly type = DialingComputerActionTypes.BeginDialing;
		constructor(public payload: { address: Glyph[] }) {}
	}

	export class DialGlyph implements Action {
		readonly type = DialingComputerActionTypes.DialGlyph;
		constructor(public payload: { index: number }) {}
	}

	export class EngageChevron implements Action {
		readonly type = DialingComputerActionTypes.EngageChevron;
		constructor(public payload: { chevron: number; glyph: Glyph }) {}
	}

	export class OpenGate implements Action {
		readonly type = DialingComputerActionTypes.OpenGate;
	}

	export class ShutdownGate implements Action {
		readonly type = DialingComputerActionTypes.ShutdownGate;
	}
}

export type DialingComputerAction =
	| DialingComputerActions.AbortDialing
	| DialingComputerActions.BeginDialing
	| DialingComputerActions.DialGlyph
	| DialingComputerActions.EngageChevron
	| DialingComputerActions.OpenGate
	| DialingComputerActions.ShutdownGate;
