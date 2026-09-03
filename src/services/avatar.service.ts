interface Avatar {
    style: string;
    seed: string;
    options: Record<string, string | string[]>;
}

export function getAvatarUrl(avatar: Avatar): string {
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

export async function updateAvatar(avatar: Avatar) {
    const response = await fetch("http://localhost:8000/avatar", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(avatar),
    });

    const data = await response.json();

    console.log(data);

    return data;
}