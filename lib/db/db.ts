import { drizzle } from "drizzle-orm/postgres-js"
import postgres from 'postgres'

// src/db.ts
export const client = postgres( process.env.POSTGRES_URL! )
export const db = drizzle( client )

/*
// src/db.ts
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import postgres from "postgres"

// config( { path: ".env.local" } ) // or .env.local

// const sql = neon( process.env.DATABASE_URL! )
// export const db = drizzle( { client: sql } )


const client = postgres( process.env.POSTGRES_URL! )
const db = drizzle( client )

``
// const db = drizzle( process.env.DATABASE_URL )

// const result = await db.execute( 'select 1' )
*/