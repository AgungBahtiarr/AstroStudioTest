/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />


// declare namespace App {
// 	interface Locals {
// 		session: import("lucia").Session | null;
// 		user: import("lucia").User | null;
// 	}
// }



type User = typeof import("astro:db").User.$inferSelect;

declare namespace App {
	interface Locals {
		session: import("lucia").Session | null;
		user: import("lucia").User | null;
		dbUser: User | null;
		isLoggedIn: boolean;
	}
}