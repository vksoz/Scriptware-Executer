import { Service } from "@flamework/core";

@Service({})
export class PlayerService {
	KickPlayerForBug(player: Player, reason: string) {
		player.Kick(`you have been kicked because of a bug: ${reason}`);
	}
	KickPlayerForCheat(player: Player, reason: string) {
		player.Kick(
			`you have been kicked because of cheating ${reason}. \n
            Please report this to a staff member if you believe this is a mistake \n
            This kick has been automatically recorded in modderator logs.`,
		);
	}
}
