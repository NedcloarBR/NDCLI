import { prompt } from "inquirer";
import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { CheckConfig } from "../../Utils";
import { BasePackageJSON, PackageJSONAnswers } from "../../Config";
import { Exit } from "../";

export async function PackageJSON(): Promise<void> {
  var ConfigPath: string;
  var ND_CLI;

  if(process.env.inDev === "true") {
    ConfigPath = join(process.cwd(), "test", "package.json");
    ND_CLI = await import(join(process.cwd(), "test", "ND_CLI.json"));
  } else {
    ConfigPath = join(process.cwd(), "package.json");
    ND_CLI = await import(join(process.cwd(), "ND_CLI.json"));
  }

  if(!await CheckConfig(ConfigPath)) {
    prompt(await PackageJSONAnswers()).then(async (answers) => {
      var extension = ND_CLI.language === "javascript" 
        ? extension = ".js" 
        : extension = ".ts";
    })
  }
}