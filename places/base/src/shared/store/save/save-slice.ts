import Immut, { produce } from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";

import { ISODate } from "../../../types/utils/roblox";
import { PlayerSave } from "./save-types";

export type SaveState = Map<Player, PlayerSave>;
const initalState: SaveState = new Map<Player, PlayerSave>();

export const saveSlice = createProducer(initalState, {
	setPlayerSave: (state, player: Player, save: PlayerSave) =>
		produce(state, (draft) => {
			draft.set(player, save);
		}),

	deletePlayerSave: (state, player: Player) =>
		produce(state, (draft) => {
			draft.delete(player);
		}),

	patchPlayerSave: (state, player: Player, patch: Partial<PlayerSave>) =>
		produce(state, (draft) => {
			draft.set(player, { ...(state.get(player) as PlayerSave), ...patch });
		}),
	patchPurchaseHistory: (
		state,
		player: Player,
		purchaseInfo: { purchaseid: string; robux: number; timestamp: string | ISODate },
	) =>
		produce(state, (draft) => {
			print("ee");
			Immut.table.insert(draft.get(player)!.purchaseHistory, purchaseInfo);
		}),
});
