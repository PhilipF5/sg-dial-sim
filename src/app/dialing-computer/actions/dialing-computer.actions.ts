import { createAction } from "@ngrx/store";
import { Destination, Glyph } from "app/shared/models";

const addressProp = (address: Glyph[]) => ({ address });
const chevronProp = (chevron: number) => ({ chevron });
const chevronGlyphProps = (chevron: number, glyph: Glyph) => ({ chevron, glyph });
const destinationProp = (destination: Destination) => ({ destination });

export const abortDialing = createAction("[Dialing Computer] Abort Dialing");
export const beginDialing = createAction("[Dialing Computer] Begin Dialing", addressProp);
export const chevronEngaged = createAction("[Dialing Computer] Chevron Engaged", chevronProp);
export const chevronFailed = createAction("[Dialing Computer] Chevron Failed", chevronProp);
export const dialNextGlyph = createAction("[Dialing Computer] Dial Next Glyph");
export const engageChevron = createAction("[Dialing Computer] Engage Chevron", chevronGlyphProps);
export const establishConnection = createAction("[Dialing Computer] Establish Connection", destinationProp);
export const failChevron = createAction("[Dialing Computer] Fail Chevron", chevronGlyphProps);
export const gateClosed = createAction("[Dialing Computer] Gate Closed");
export const glyphReady = createAction("[Dialing Computer] Glyph Ready", chevronGlyphProps);
export const openGate = createAction("[Dialing Computer] Open Gate");
export const reset = createAction("[Dialing Computer] Reset");
export const sequenceComplete = createAction("[Dialing Computer] Sequence Complete");
export const sequenceFailed = createAction("[Dialing Computer] Sequence Failed");
export const shutdownGate = createAction("[Dialing Computer] Shutdown Gate");
export const spinRing = createAction("[Dialing Computer] Spin Ring", chevronGlyphProps);
export const tryEngageChevron = createAction("[Dialing Computer] Try Engage Chevron", chevronGlyphProps);
