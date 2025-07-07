import fs from "fs";
import path from "path";
import readline from "readline";
import { EntityConfig } from "./modules/types";
import { generateModel } from "./modules/gen-model";
import { generateController } from "./modules/gen-controller";
import { generateService } from "./modules/gen-service";
import { generateRoute } from "./modules/gen-route";
import { generateQuery } from "./modules/gen-query";
import { generateMigration } from "./modules/gen-migration";
import { generateZodValidation } from "./modules/gen-validation";
import { generateSwagger } from "./modules/gen-swagger";
import { generateRepository } from "./modules/gen-repository";

const configPath = process.argv[2];

if (!configPath) {
  console.error("❌ Usage: ts-node scripts/gen-entity.ts <entity.config.json>");
  process.exit(1);
}

const config: EntityConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const entity = config.entity.toLowerCase();
const pascal = entity.charAt(0).toUpperCase() + entity.slice(1);

const basePath = path.resolve(__dirname, "../src");

const files = [
  ...generateModel(config, entity, pascal),
  ...generateController(entity, pascal),
  ...generateService(entity, pascal),
  ...generateRoute(entity, pascal),
  ...generateQuery(config, entity),
  ...generateMigration(config, entity),
  ...generateZodValidation(config, entity, pascal),
  ...generateSwagger(entity, config),
  ...generateRepository(config, entity, pascal),
];

console.log(`\n🔧 You are about to generate the following entity:`);
console.log(`\n🧩 Entity: ${pascal}`);
console.log(`📄 Files to be created:`);

files.forEach(file => {
  console.log(`  - src/${file.path}`);
});

console.log("\n🧬 Fields:");
Object.entries(config.fields).forEach(([key, type]) => {
  console.log(`  - ${key}: ${type.type}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("\n⚠️  Proceed with file creation? (y/n): ", answer => {
  rl.close();

  if (answer.toLowerCase() !== "y") {
    console.log("❌ Aborted.");
    process.exit(0);
  }

  files.forEach(({ path: relativePath, content }) => {
    const filePath = path.join(basePath, relativePath);
    const dir = path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });

    try {
      fs.writeFileSync(filePath, content, { flag: "wx" });
      console.log(`✅ Created: ${relativePath}`);
    } catch (err) {
      console.error(`⚠️  Skipped (already exists): ${relativePath}`);
    }
  });

  console.log("\n🎉 Done!");
});
