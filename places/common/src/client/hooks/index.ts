export interface OnCharacterAdd {
	onCharacterAdd(character: character): void;
}

export interface OnCharacterRemove {
	onCharacterRemove(character: character): void;
}

export * from "./character";
