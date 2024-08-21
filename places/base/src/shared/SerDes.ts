import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";

import { SharedState } from "./store";
import { PlayerSave } from "./store/save/save-types";

export const PlayerSerDes = createBinarySerializer<PlayerSave>();
export const HydrateSerDes = createBinarySerializer<SharedState>();
