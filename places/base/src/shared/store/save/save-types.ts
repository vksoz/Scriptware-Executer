import { Flamework } from "@flamework/core";

export interface PlayerSave {}

export const DefaultPlayerSave: PlayerSave = {};

export const PlayerSaveGuard = Flamework.createGuard<PlayerSave>();
