import type { Avatar } from "./avatar.types";

export interface User {
    id:number;
    email:string;
    username:string;
    avatar:Avatar;
}