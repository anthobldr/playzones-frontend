import type { Avatar } from "@/types";
import { apiFetch } from "./api";

const DEFAULT_AVATAR_URL = "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=playzone";

export function getAvatarUrl(avatar?: Avatar | null): string {
    if (!avatar) return DEFAULT_AVATAR_URL;
    const url = new URL(`https://api.dicebear.com/9.x/${avatar.style}/svg`);

    url.searchParams.set("seed", avatar.seed);

    Object.entries(avatar.options).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            url.searchParams.set(key, value.join(","));
        } else {
            url.searchParams.set(key, value);
        }
    });

    return url.toString();
}

export function updateAvatar(avatar: Avatar) {
    return apiFetch("/avatar", {
        method: "PATCH",
        body: JSON.stringify(avatar),
    });
}