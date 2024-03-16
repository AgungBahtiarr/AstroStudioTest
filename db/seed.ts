import { Childs, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Childs).values([
		{ idUsers: 1, firstName: "Agung" },
		{ idUsers: 2, firstName: "Falen" }
	])
}
