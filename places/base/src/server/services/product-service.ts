import { OnStart, Service } from "@flamework/core";
import { MarketplaceService } from "@rbxts/services";

import { SaveService } from "./save-service";

@Service()
export class ProductService implements OnStart {
	constructor(private saveService: SaveService) {}
	onStart(): void {
		print("hello worldS");
	}
	private ProcessReceipt(receiptInfo: ReceiptInfo) {
		print("ok");
		return Enum.ProductPurchaseDecision.PurchaseGranted;
	}
}
print("aa");
function ProcessReceipt(receiptInfo: ReceiptInfo) {
	print("e");
	return Enum.ProductPurchaseDecision.PurchaseGranted;
}
MarketplaceService.ProcessReceipt = ProcessReceipt;
