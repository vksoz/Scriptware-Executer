import { Flamework } from "@flamework/core";
import { $NODE_ENV } from "rbxts-transform-env";

if ($NODE_ENV === "common") {
	Flamework.addPaths("src/client/components");
	Flamework.addPaths("src/client/controllers");
	Flamework.addPaths("src/shared/components");

	Flamework.ignite();
}
