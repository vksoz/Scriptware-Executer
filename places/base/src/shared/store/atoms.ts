import { AtomMap } from "@rbxts/charm";
import { SerializeablePayload } from "@rbxts/charm-payload-converter";
import { save } from "common/shared/store";

//define all your atoms here to sync
export const atoms: AtomMap = {
	save: save,
};

export interface AtomsMap {
	save: typeof save;
}
export type ModifiedPayload = SerializeablePayload<typeof atoms>;
