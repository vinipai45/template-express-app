import fs from "fs";
import path from "path";
import readline from "readline";
import { Pool } from "pg";
import dotenv from "dotenv";

// figure out which file to load
const envFile = `.env.${process.env.NODE_ENV || "test"}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const MIGRATIONS_DIR = path.resolve(__dirname, "../src/migrations");
const dbUrl = process.env.DATABASE_URL;

const ask = (question: string): Promise<string> => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve =>
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    })
  );
};

(async () => {
  const pool = new Pool({
    connectionString: dbUrl,
  });

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter(file => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const filePath = path.join(MIGRATIONS_DIR, file);
    const sql = fs.readFileSync(filePath, "utf-8");

    const answer = await ask(`⚠️  Run migration '${file}'? (y/n): `);
    if (answer.toLowerCase() !== "y") {
      console.log(`⏭️  Skipped: ${file}`);
      continue;
    }

    try {
      await pool.query(sql);
      console.log(`✅ Success: ${file}`);
    } catch (err) {
      console.error(`❌ Failed: ${file}\n`, err);
    }
  }

  await pool.end();
  console.log("\n🏁 All done!");
})();
