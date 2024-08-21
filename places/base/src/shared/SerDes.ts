import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { PlayerSave } from "./store/save/save-types";
import { SharedState } from "./store";

export const PlayerSerDes = createBinarySerializer<PlayerSave>();
export const HydrateSerDes = createBinarySerializer<SharedState>();
