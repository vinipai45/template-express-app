import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";
import fs from "fs";

export const setupSwagger = (app: Express) => {
  const docsDir = path.join(__dirname, "../docs");
  const files = fs.readdirSync(docsDir).filter(f => f.endsWith(".swagger.json"));

  const mergedSwagger = {
    openapi: "3.0.0",
    info: {
      title: "Template Express API",
      version: "1.0.0",
    },
    paths: {},
    components: {
      schemas: {},
    },
  };

  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(path.join(docsDir, file), "utf-8"));

    // Merge paths
    if (content.paths) {
      Object.assign(mergedSwagger.paths, content.paths);
    }

    // Merge components.schemas
    if (content.components?.schemas) {
      Object.assign(mergedSwagger.components.schemas, content.components.schemas);
    }
  }

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(mergedSwagger));
};
