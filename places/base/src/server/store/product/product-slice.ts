import { createProducer } from "@rbxts/reflex";
import Signal from "@rbxts/signal";

export type productState = Map<number, Reconstruct<Signal>>;
const initalState: productState = new Map<number, Reconstruct<Signal>>();
let duck!: productState;

export const productSlice = createProducer(initalState, {
	addBinding: (state, productid: number) => ({ ...state, [productid]: new Signal() }),
});
