import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";

import { ModifiedPayload } from "./store/atoms";

export const PayloadSerializer = createBinarySerializer<ModifiedPayload>();
