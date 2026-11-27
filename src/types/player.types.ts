import type { Avatar } from './avatar.types';

export interface Player {
    id: number;
    username: string;
    avatar: Avatar | null;
}