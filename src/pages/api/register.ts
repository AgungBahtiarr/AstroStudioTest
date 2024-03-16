import { lucia } from "../../../lib/auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

import { user, db, eq, session } from "astro:db";

import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const username = formData.get("username");
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
    ) {
        return new Response("Invalid username", {
            status: 400
        });
    }
    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return new Response("Invalid password", {
            status: 400
        });
    }

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    // TODO: check if username is already used
    // await db.table("user").insert({
    //     id: userId,
    //     username: username,
    //     hashed_password: hashedPassword
    // });

    await db.insert(user).values({
        id: userId,
        username: username,
        hashed_password: hashedPassword
    })

    const createdUser = await db.select().from(user).where(eq(user.username, username)).get();
    // const createdSession = await db.select().from(session);

    console.log(createdUser)
    // console.log(createdSession)

    const sessions = await lucia.createSession(userId, {});
    const sessionCookie = await lucia.createSessionCookie(sessions.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    console.log(sessions)
    return context.redirect("/login");
}
