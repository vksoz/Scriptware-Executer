import { createSelector } from "@rbxts/reflex";

import { SharedState } from "..";

export const selectSave = (state: SharedState) => state.saves;

export const selectPlayerSave = (player: Player) => createSelector(selectSave, (save) => save.get(player));
