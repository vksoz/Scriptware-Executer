/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Networking } from "@flamework/networking";
import { BroadcastAction } from "@rbxts/reflex";

import { HydrateSerDes } from "./SerDes";

interface ClientToServerEvents {
	store: {
		start: () => void;
	};
}

interface ServerToClientEvents {
	store: {
		dispatch: (actions: Array<BroadcastAction>) => void;
		hydrate: (state: ReturnType<typeof HydrateSerDes.serialize>) => void;
	};
}
interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
