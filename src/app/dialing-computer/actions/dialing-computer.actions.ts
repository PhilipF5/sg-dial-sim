import { Action } from "@ngrx/store";
import { Glyph } from "app/shared/models";

export enum DialingComputerActionTypes {
	AbortDialing = "[Dialing Computer] Abort Dialing",
	BeginDialing = "[Dialing Computer] Begin Dialing",
	ChevronEngaged = "[Dialing Computer] Chevron Engaged",
	DialNextGlyph = "[Dialing Computer] Dial Next Glyph",
	EngageChevron = "[Dialing Computer] Engage Chevron",
	GlyphReady = "[Dialing Computer] Glyph Ready",
	OpenGate = "[Dialing Computer] Open Gate",
	ShutdownGate = "[Dialing Computer] Shutdown Gate",
	SpinRing = "[Dialing Computer] Spin Ring",
	TryEngageChevron = "[Dialing Computer] Try Engage Chevron",
}

export namespace DialingComputerActions {
	export class AbortDialing implements Action {
		readonly type = DialingComputerActionTypes.AbortDialing;
	}

	export class BeginDialing implements Action {
		readonly type = DialingComputerActionTypes.BeginDialing;
		constructor(public payload: { address: Glyph[] }) {}
	}

	export class ChevronEngaged implements Action {
		readonly type = DialingComputerActionTypes.ChevronEngaged;
		constructor(public payload: { chevron: number }) {}
	}

	export class DialNextGlyph implements Action {
		readonly type = DialingComputerActionTypes.DialNextGlyph;
	}

	export class EngageChevron implements Action {
		readonly type = DialingComputerActionTypes.EngageChevron;
		constructor(public payload: { chevron: number; glyph: Glyph }) {}
	}

	export class GlyphReady implements Action {
		readonly type = DialingComputerActionTypes.GlyphReady;
		constructor(public payload: { chevron: number; glyph: Glyph }) {}
	}

	export class OpenGate implements Action {
		readonly type = DialingComputerActionTypes.OpenGate;
	}

	export class ShutdownGate implements Action {
		readonly type = DialingComputerActionTypes.ShutdownGate;
	}

	export class SpinRing implements Action {
		readonly type = DialingComputerActionTypes.SpinRing;
		constructor(public payload: { chevron: number; glyph: Glyph }) {}
	}

	export class TryEngageChevron implements Action {
		readonly type = DialingComputerActionTypes.TryEngageChevron;
	}
}

export type DialingComputerAction =
	| DialingComputerActions.AbortDialing
	| DialingComputerActions.BeginDialing
	| DialingComputerActions.ChevronEngaged
	| DialingComputerActions.DialNextGlyph
	| DialingComputerActions.EngageChevron
	| DialingComputerActions.GlyphReady
	| DialingComputerActions.OpenGate
	| DialingComputerActions.ShutdownGate
	| DialingComputerActions.SpinRing
	| DialingComputerActions.TryEngageChevron;
