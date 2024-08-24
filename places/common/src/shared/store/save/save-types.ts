import { ISODate } from "../../../types/utils/roblox";

export interface PlayerSave {
	purchaseHistory: Array<purchaseInfo>;
}

export const DefaultPlayerSave: PlayerSave = {
	purchaseHistory: new Array(),
};

export interface purchaseInfo {
	purchaseid: string;
	robux: number;
	timestamp: ISODate | string;
}
