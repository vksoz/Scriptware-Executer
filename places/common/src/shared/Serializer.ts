import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";

import { PlayerSave } from "./store/save/save-types";

export const PlayerSerializer = createBinarySerializer<PlayerSave>();
