import { Service } from "@flamework/core";
import { MarketplaceService } from "@rbxts/services";

import { retry } from "../../shared/utils/retry";

/**
 * A wrapper around MarketPlaceService. Uses promises for yielding methods.
 * Please use MarketPlaceService for non-yielding code.
 */
@Service()
export class MarketService {
	async GetDeveloperProductsAsync(): Promise<
		StandardPages<{
			Description: string;
			PriceInRobux: number;
			ProductId: number;
			IconImageAssetId: number;
			Name: string;
		}>
	> {
		return await retry(() => MarketplaceService.GetDeveloperProductsAsync());
	}
	async GetProductInfo(id: number): Promise<AssetProductInfo>;
	async GetProductInfo(id: number, infoType: CastsToEnum<Enum.InfoType.Asset>): Promise<AssetProductInfo>;
	async GetProductInfo(id: number, infoType: CastsToEnum<Enum.InfoType.Bundle>): Promise<BundleInfo>;
	async GetProductInfo(id: number, infoType: CastsToEnum<Enum.InfoType.GamePass>): Promise<GamePassProductInfo>;
	async GetProductInfo(id: number, infoType: CastsToEnum<Enum.InfoType.Product>): Promise<DeveloperProductInfo>;
	async GetProductInfo(
		id: number,
		infoType: CastsToEnum<Enum.InfoType.Subscription>,
	): Promise<SubscriptionProductInfo>;
	async GetProductInfo(
		id: number,
		infoType?: CastsToEnum<Enum.InfoType>,
	): Promise<AssetProductInfo | BundleInfo | GamePassProductInfo | DeveloperProductInfo | SubscriptionProductInfo>;
	/**
	 * Return Promose<any> so it correctly implements all returns
	 * @hidden
	 * @deprecated
	 */
	async GetProductInfo(id: number, infoType?: CastsToEnum<Enum.InfoType>): Promise<any> {
		return await retry(() => MarketplaceService.GetProductInfo(id, infoType));
	}
	async GetSubscriptionProductInfoAsync(subscriptionId: string) {
		return await retry(() => MarketplaceService.GetSubscriptionProductInfoAsync(subscriptionId));
	}
	async GetUserSubscriptionDetailsAsync(user: Player, subscriptionId: string) {
		return await retry(() => MarketplaceService.GetUserSubscriptionDetailsAsync(user, subscriptionId));
	}
	async GetUserSubscriptionPaymentHistoryAsync(user: Player, subscriptionId: string) {
		return await retry(() => MarketplaceService.GetUserSubscriptionPaymentHistoryAsync(user, subscriptionId));
	}
	async GetUserSubscriptionStatusAsync(user: Player, subscriptionId: string) {
		return await retry(() => MarketplaceService.GetUserSubscriptionStatusAsync(user, subscriptionId));
	}
	async PlayerOwnsAsset(user: Player, assetid: number) {
		return await retry(() => MarketplaceService.PlayerOwnsAsset(user, assetid));
	}
	async PlayerOwnsBundle(player: Player, bundleId: number) {
		return await retry(() => MarketplaceService.PlayerOwnsAsset(player, bundleId));
	}
	async UserOwnsGamePassAsync(userId: number, gamePassId: number) {
		return await retry(() => MarketplaceService.UserOwnsGamePassAsync(userId, gamePassId));
	}
}
