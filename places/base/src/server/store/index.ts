import { combineProducers, CombineStates } from "@rbxts/reflex";
import { slices } from "shared/store";

const serverSlices = {};

export type RootStore = typeof slices & typeof serverSlices;
export type RootState = CombineStates<RootStore>;

export function createStore() {
	const store = combineProducers({ ...slices, ...serverSlices });
	return store;
}

export const store = createStore();
