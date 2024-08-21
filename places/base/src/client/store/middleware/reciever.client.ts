import { createBroadcastReceiver } from "@rbxts/reflex";
import { Events } from "client/network";
import { HydrateSerDes } from "shared/SerDes";

import { store } from "..";

const receiver = createBroadcastReceiver({
	start: () => {
		Events.store.start.fire();
	},
});
Events.store.dispatch.connect((actions) => {
	receiver.dispatch(actions);
});
Events.store.hydrate.connect(({ buffer, blobs }) => {
	receiver.hydrate(HydrateSerDes.deserialize(buffer, blobs));
});
store.applyMiddleware(receiver.middleware);
// store.applyMiddleware(loggerMiddleware)
