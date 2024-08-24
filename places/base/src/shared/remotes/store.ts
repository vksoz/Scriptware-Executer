import { Client, createRemotes, remote, Server } from "@rbxts/remo";

export const store = createRemotes({
	sync: remote<Client, [buffer: buffer, blobs: defined[]]>(),
	init: remote<Server>(),
});
