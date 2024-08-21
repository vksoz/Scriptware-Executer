import { Flamework } from "@flamework/core";
import { $NODE_ENV } from "rbxts-transform-env";

if ($NODE_ENV === "common") {
	Flamework.addPaths("src/server/components");
	Flamework.addPaths("src/server/services");
	Flamework.addPaths("src/shared/components");

	Flamework.ignite();
}
