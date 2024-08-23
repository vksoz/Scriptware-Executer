/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Flamework } from "@flamework/core";

import { ISODate } from "../../../types/utils/roblox";

export interface PlayerSave {
	purchaseHistory: Array<{ purchaseid: string; robux: number; timestamp: string | ISODate }>;
}

export const DefaultPlayerSave: PlayerSave = {
	purchaseHistory: new Array(),
};

export const PlayerSaveGuard = Flamework.createGuard<PlayerSave>();
