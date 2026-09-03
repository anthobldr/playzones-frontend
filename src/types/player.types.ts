import type { Avatar } from './avatar.types';

export interface Player {
    id: number;
    name: string;
    avatar: Avatar;
    online: boolean;
}