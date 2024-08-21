import { CombineStates } from "@rbxts/reflex";

import { saveSlice } from "./save";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	saves: saveSlice,
};
