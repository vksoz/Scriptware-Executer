import { Service } from "@flamework/core";
import { MarketplaceService } from "@rbxts/services";

import { OnPlayerJoin } from "../hooks";

@Service()
export class TestService implements OnPlayerJoin {
	onPlayerJoin(player: Player): void {
		MarketplaceService.PromptGamePassPurchase(player, 1645608670);
	}
}
