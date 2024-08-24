import { atom } from "@rbxts/charm";
import Remap from "@rbxts/remap";
import { push } from "@rbxts/sift/out/Array";

import { PlayerSave, purchaseInfo } from "./save-types";

export const save = atom(new ReadonlyMap<Player, PlayerSave>());

export function setSave(player: Player, data: PlayerSave) {
	save((state) => Remap.set(state, player, data));
}

export function deleteSave(player: Player) {
	save((state) => Remap.delete(state, player));
}

export function patchSave(player: Player, patch: Partial<PlayerSave>) {
	save((state) => Remap.update(state, player, (value) => ({ ...value!, ...patch })));
}

export function patchPurchaseHistory(player: Player, purchaseInfo: purchaseInfo) {
	save((state) =>
		Remap.update(state, player, (value) => ({
			...value,
			purchaseHistory: push(value!.purchaseHistory, purchaseInfo),
		})),
	);
}
