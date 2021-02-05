import { Player } from '../types';
import { AvatarId } from '../types/player';

export const getAvatarURLForPlayer = (player: Player) => getAvatarURLForAvatarId(player.avatarId);

export const getAvatarURLForAvatarId = (avatarId: AvatarId) =>
	`${window.location.origin}/api/avatar/${avatarId}`;
