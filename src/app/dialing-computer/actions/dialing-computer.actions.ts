import { Action } from "@ngrx/store";
import { Destination, Glyph } from "app/shared/models";

export enum DialingComputerActionTypes {
	AbortDialing = "[Dialing Computer] Abort Dialing",
	BeginDialing = "[Dialing Computer] Begin Dialing",
	ChevronEngaged = "[Dialing Computer] Chevron Engaged",
	ChevronFailed = "[Dialing Computer] Chevron Failed",
	DialNextGlyph = "[Dialing Computer] Dial Next Glyph",
	EngageChevron = "[Dialing Computer] Engage Chevron",
	EstablishConnection = "[Dialing Computer] Establish Connection",
	FailChevron = "[Dialing Computer] Fail Chevron",
	GlyphReady = "[Dialing Computer] Glyph Ready",
	OpenGate = "[Dialing Computer] Open Gate",
	Reset = "[Dialing Computer] Reset",
	SequenceComplete = "[Dialing Computer] Sequence Complete",
	SequenceFailed = "[Dialing Computer] Sequence Failed",
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

	export class ChevronFailed implements Action {
		readonly type = DialingComputerActionTypes.ChevronFailed;
		constructor(public payload: { chevron: number }) {}
	}

	export class DialNextGlyph implements Action {
		readonly type = DialingComputerActionTypes.DialNextGlyph;
	}

	export class EngageChevron implements Action {
		readonly type = DialingComputerActionTypes.EngageChevron;
		constructor(public payload: { chevron: number; glyph: Glyph }) {}
	}

	export class EstablishConnection implements Action {
		readonly type = DialingComputerActionTypes.EstablishConnection;
		constructor(public payload: { destination: Destination }) {}
	}

	export class FailChevron implements Action {
		readonly type = DialingComputerActionTypes.FailChevron;
		constructor(public payload: { chevron: number; glyph: Glyph }) {}
	}

	export class GlyphReady implements Action {
		readonly type = DialingComputerActionTypes.GlyphReady;
		constructor(public payload: { chevron: number; glyph: Glyph }) {}
	}

	export class OpenGate implements Action {
		readonly type = DialingComputerActionTypes.OpenGate;
	}

	export class Reset implements Action {
		readonly type = DialingComputerActionTypes.Reset;
	}

	export class SequenceComplete implements Action {
		readonly type = DialingComputerActionTypes.SequenceComplete;
	}

	export class SequenceFailed implements Action {
		readonly type = DialingComputerActionTypes.SequenceFailed;
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
		constructor(public payload: { chevron: number; glyph: Glyph }) {}
	}
}

export type DialingComputerAction =
	| DialingComputerActions.AbortDialing
	| DialingComputerActions.BeginDialing
	| DialingComputerActions.ChevronEngaged
	| DialingComputerActions.ChevronFailed
	| DialingComputerActions.DialNextGlyph
	| DialingComputerActions.EngageChevron
	| DialingComputerActions.EstablishConnection
	| DialingComputerActions.FailChevron
	| DialingComputerActions.GlyphReady
	| DialingComputerActions.OpenGate
	| DialingComputerActions.Reset
	| DialingComputerActions.SequenceComplete
	| DialingComputerActions.SequenceFailed
	| DialingComputerActions.ShutdownGate
	| DialingComputerActions.SpinRing
	| DialingComputerActions.TryEngageChevron;
