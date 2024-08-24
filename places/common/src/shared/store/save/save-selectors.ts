import { save } from "./save-atom";
export const selectPlayerSave = (player: Player) => save().get(player);
