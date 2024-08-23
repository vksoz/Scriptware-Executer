import { Players } from "@rbxts/services";
import { store } from "server/store";

import { retry } from "../../shared/utils/retrier";

export function processReceipt(receiptInfo: ReceiptInfo) {
	const [success, respnose] = pcall(() => {
		retry(
			() => {
				const player = Players.GetPlayerByUserId(receiptInfo.PlayerId)!;
				store.patchPurchaseHistory(player, {
					assetid: receiptInfo.ProductId,
					timestamp: DateTime.now().ToIsoDate(),
					robux: receiptInfo.CurrencySpent,
				});
			},
			3,
			1,
		).await();
	});
	if (success) return Enum.ProductPurchaseDecision.PurchaseGranted;
	return Enum.ProductPurchaseDecision.NotProcessedYet;
}
