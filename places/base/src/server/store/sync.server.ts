import { sync } from "@rbxts/charm";
import { toSerializeablePayload } from "@rbxts/charm-payload-converter";
import { store } from "shared/remotes";
import { PayloadSerializer } from "shared/Serializer";
import { atoms } from "shared/store/atoms";

const server = sync.server({ atoms });
server.connect((player, payload) => {
	const { buffer, blobs } = PayloadSerializer.serialize(toSerializeablePayload(payload));
	store.sync.fire(player, buffer, blobs);
});

store.init.connect((player) => {
	server.hydrate(player);
});
