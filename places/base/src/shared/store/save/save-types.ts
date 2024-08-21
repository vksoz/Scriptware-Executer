/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Flamework } from "@flamework/core";

export interface PlayerSave {}

export const DefaultPlayerSave: PlayerSave = {};

export const PlayerSaveGuard = Flamework.createGuard<PlayerSave>();
