import { World } from "@rbxts/jecs";
import { combineProducers, CombineStates } from "@rbxts/reflex";
import { slices } from "shared/store";

const clientSlices = {};

export type RootStore = typeof slices & typeof clientSlices;
export type RootState = CombineStates<RootStore>;

export function createStore() {
	const store = combineProducers({ ...slices, ...clientSlices });
	return store;
}

export const store = createStore();

const world = new World();
const Name = world.component<string>();
const Animal = world.component<string>();
const Duck = world.entity();
