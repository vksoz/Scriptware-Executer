import { Service } from "@flamework/core";
import { Collection, createCollection, Document, setConfig } from "@rbxts/lapis";
import DataStoreServiceMock from "@rbxts/lapis-mockdatastore";
import { RunService } from "@rbxts/services";
import { PlayerSerializer } from "common/shared/Serializer";
import { DefaultPlayerSave, deleteSave, selectPlayerSave, setSave } from "common/shared/store/save";
import { retry } from "common/shared/utils/retry";

import { OnPlayerJoin } from "../hooks";

@Service()
export class SaveService implements OnPlayerJoin {
	private PlayerSaveCollection: Collection<ReturnType<typeof PlayerSerializer.serialize>>;
	private Documents = new Map<Player, Document<ReturnType<typeof PlayerSerializer.serialize>>>();
	constructor() {
		if (RunService.IsStudio()) setConfig({ dataStoreService: new DataStoreServiceMock() });
		this.PlayerSaveCollection = createCollection("PlayerSave", {
			defaultData: PlayerSerializer.serialize(DefaultPlayerSave),
		});
	}
	/**
	 * Hooks onPlayerJoin, used internally.
	 * @deprecated
	 * @hidden
	 */
	async onPlayerJoin(player: Player) {
		const document = await this.PlayerSaveCollection.load("PlayerSave", [player.UserId]);
		setSave(player, PlayerSerializer.deserialize(document.read().buffer, document.read().blobs));
		this.Documents.set(player, document);
		document.beforeSave(() => document.write(PlayerSerializer.serialize(selectPlayerSave(player)!)));
		document.beforeClose(() => {
			deleteSave(player);
			this.Documents.delete(player);
		});
	}
	/**
	 * Force saves the player document
	 * @param player the document to force save
	 */
	public async ForceSave(player: Player) {
		await retry(() => this.Documents.get(player)?.save());
	}
}
