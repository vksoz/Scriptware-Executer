import { createBroadcaster, loggerMiddleware } from "@rbxts/reflex";
import { Events } from "server/network";
import { APPLY_MIDDLEWARE } from "shared/constants/middleware";
import { HydrateSerDes } from "shared/SerDes";
import { SharedState, slices } from "shared/store";

import { store } from "..";

export const broadcaster = createBroadcaster({
	producers: slices,
	dispatch: (player, actions) => {
		Events.store.dispatch.fire(player, actions);
	},
	hydrate: (player, state) => {
		Events.store.hydrate.fire(player, HydrateSerDes.serialize(state as unknown as SharedState));
	},
	hydrateRate: 60,
});

Events.store.start.connect((player) => {
	broadcaster.start(player);
});

store.applyMiddleware(broadcaster.middleware);
if (APPLY_MIDDLEWARE) store.applyMiddleware(loggerMiddleware);
