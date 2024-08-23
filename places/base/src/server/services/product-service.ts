import { OnStart, Service } from "@flamework/core";
import { MarketplaceService, Players } from "@rbxts/services";
import { store } from "client/store";

import { SaveService } from "./save-service";

@Service()
export class ProductService implements OnStart {
	constructor(private saveService: SaveService) {}
	onStart(): void {
		MarketplaceService.ProcessReceipt = this.ProcessReceipt;
	}
	private ProcessReceipt(info: ReceiptInfo) {
		const player = Players.GetPlayerByUserId(info.PlayerId)!;
		store.patchPurchaseHistory(player, {
			purchaseid: info.PurchaseId,
			robux: info.CurrencySpent,
			timestamp: DateTime.now().ToIsoDate(),
		});
		const [success] = pcall(() => {
			this.saveService.ForceSave(player);
		});
		if (success) {
			return Enum.ProductPurchaseDecision.PurchaseGranted;
		} else {
			return Enum.ProductPurchaseDecision.NotProcessedYet;
		}
	}
}
