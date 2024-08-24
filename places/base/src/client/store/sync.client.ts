import { sync } from "@rbxts/charm";
import { fromSerializeablePayload } from "@rbxts/charm-payload-converter";
import { store } from "shared/remotes";
import { PayloadSerializer } from "shared/Serializer";
import { atoms } from "shared/store/atoms";

const client = sync.client({ atoms });

store.sync.connect((buffer, blobs) => {
	const modifiedPayload = PayloadSerializer.deserialize(buffer, blobs);
	client.sync(fromSerializeablePayload(modifiedPayload));
});

store.init.fire();
