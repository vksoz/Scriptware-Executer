import { OnStart, Service } from "@flamework/core";
import { MarketplaceService, Players } from "@rbxts/services";
import { SaveService } from "common/server/services/save-service";
import { patchPurchaseHistory } from "common/shared/store/save/save-atom";

@Service()
export class ProductService implements OnStart {
	constructor(private saveService: SaveService) {}
	onStart(): void {
		MarketplaceService.ProcessReceipt = this.ProcessReceipt;
	}
	private ProcessReceipt(info: ReceiptInfo) {
		const player = Players.GetPlayerByUserId(info.PlayerId)!;
		patchPurchaseHistory(player, {
			purchaseid: info.PurchaseId,
			robux: info.CurrencySpent,
			timestamp: DateTime.now().ToIsoDate(),
		});
		const [success] = pcall(() => {
			this.saveService.ForceSave(player).await();
		});
		if (success) {
			return Enum.ProductPurchaseDecision.PurchaseGranted;
		} else {
			return Enum.ProductPurchaseDecision.NotProcessedYet;
		}
	}
}
