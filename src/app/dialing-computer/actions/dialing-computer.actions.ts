import { createAction, props } from "@ngrx/store";
import { Destination, Glyph } from "app/shared/models";

export const abortDialing = createAction("[Dialing Computer] Abort Dialing");
export const beginDialing = createAction("[Dialing Computer] Begin Dialing", props<{ address: Glyph[] }>());
export const chevronEngaged = createAction("[Dialing Computer] Chevron Engaged", props<{ chevron: number }>());
export const chevronFailed = createAction("[Dialing Computer] Chevron Failed", props<{ chevron: number }>());
export const dialNextGlyph = createAction("[Dialing Computer] Dial Next Glyph");
export const engageChevron = createAction(
	"[Dialing Computer] Engage Chevron",
	props<{ chevron: number; glyph: Glyph }>()
);
export const establishConnection = createAction(
	"[Dialing Computer] Establish Connection",
	props<{ destination: Destination }>()
);
export const failChevron = createAction("[Dialing Computer] Fail Chevron", props<{ chevron: number; glyph: Glyph }>());
export const gateClosed = createAction("[Dialing Computer] Gate Closed");
export const glyphReady = createAction("[Dialing Computer] Glyph Ready", props<{ chevron: number; glyph: Glyph }>());
export const openGate = createAction("[Dialing Computer] Open Gate");
export const reset = createAction("[Dialing Computer] Reset");
export const sequenceComplete = createAction("[Dialing Computer] Sequence Complete");
export const sequenceFailed = createAction("[Dialing Computer] Sequence Failed");
export const shutdownGate = createAction("[Dialing Computer] Shutdown Gate");
export const spinRing = createAction("[Dialing Computer] Spin Ring", props<{ chevron: number; glyph: Glyph }>());
export const tryEngageChevron = createAction(
	"[Dialing Computer] Try Engage Chevron",
	props<{ chevron: number; glyph: Glyph }>()
);
