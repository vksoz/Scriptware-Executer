import { Service } from "@flamework/core";
import { Collection, createCollection, Document, setConfig } from "@rbxts/lapis";
import DataStoreServiceMock from "@rbxts/lapis-mockdatastore";
import { RunService } from "@rbxts/services";
import { store } from "server/store";
import { PlayerSerDes } from "shared/SerDes";
import { selectPlayerSave } from "shared/store/save/save-selectors";
import { DefaultPlayerSave } from "shared/store/save/save-types";

import { retry } from "../../shared/utils/retry";
import { OnPlayerJoin } from "../hooks";

@Service()
export class SaveService implements OnPlayerJoin {
	private PlayerSaveCollection: Collection<ReturnType<typeof PlayerSerDes.serialize>>;
	private Documents = new Map<Player, Document<ReturnType<typeof PlayerSerDes.serialize>>>();
	constructor() {
		if (RunService.IsStudio()) setConfig({ dataStoreService: new DataStoreServiceMock() });
		this.PlayerSaveCollection = createCollection("PlayerSave", {
			defaultData: PlayerSerDes.serialize(DefaultPlayerSave),
		});
	}
	/**
	 * Hooks onPlayerJoin, used internally.
	 * @deprecated
	 * @hidden
	 */
	async onPlayerJoin(player: Player) {
		const document = await this.PlayerSaveCollection.load("PlayerSave", [player.UserId]);
		store.setPlayerSave(player, PlayerSerDes.deserialize(document.read().buffer, document.read().blobs));
		this.Documents.set(player, document);
		document.beforeSave(() => document.write(PlayerSerDes.serialize(store.getState(selectPlayerSave(player))!)));
		document.beforeClose(() => {
			store.deletePlayerSave(player);
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
