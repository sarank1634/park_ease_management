import {cookies} from "next/headers";
import { VerificationToken } from "next-auth/adapters";
import {redirect} from "next/navigation";
import { verifyToken } from "./signIn";

export function getUserFromToken(roles? : string[]) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const user = token ? verifyToken(token)?.value;

    if(!user || (roles && !roles.includes(user.role))) {
        redirect("/login");
    }
    return user;
}