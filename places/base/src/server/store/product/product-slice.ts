import { produce } from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import Signal from "@rbxts/signal";

export type productState = Array<Reconstruct<Signal>>;
const initalState: productState = new Array<Reconstruct<Signal>>();
let duck!: productState;

export const productSlice = createProducer(initalState, {
	addBinding: (state, productid: number) =>
		produce(state, (draft) => {
			draft[productid] = new Signal();
		}),
});
