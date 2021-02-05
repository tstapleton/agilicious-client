import { Player } from '../types';
import { AvatarId } from '../types/player';

export const getAvatarURLForPlayer = (player: Player) => getAvatarURLForAvatarId(player.avatarId);

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export const getAvatarURLForAvatarId = (avatarId: AvatarId) =>
	`${protocol}://${process.env.REACT_APP_BASE_URL}/api/avatar/${avatarId}`;
