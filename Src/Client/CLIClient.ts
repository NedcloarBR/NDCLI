import { prompt, type Answers } from "inquirer";
import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { CheckConfig } from "../Utils";
import { BaseConfig, BaseConfigAnswers, OverwriteAnswers } from "../Config";
import { Exit, ManageProject } from "../Modules";

if(process.env.inDev === "true") {
  var ConfigPath: string = join(process.cwd(), "test", "NDCLI.json");
  mkdir(join(process.cwd(), "test"));
} else {
  var ConfigPath: string = join(process.cwd(), "NDCLI.json");
}

var GenerateProject = async function() {
  return;
};

export default class CLIClient {
  public constructor(public readonly args: string[]) {}

  public async Prompt(): Promise<void> {
    async function BuildConfigFile(config: typeof BaseConfig) {
      await prompt(BaseConfigAnswers).then(async (answers) => {
        config.name = answers.name
        config.packageManager = answers.packageManager
        config.language = answers.language
        var SwitchObject = [
          ...new Set([
            { projectType: "Only Config File(ND_CLI.json)", path: Exit}
          ])
        ].map((object) => {
          return {
            projectType: object.projectType,
            path: object.path as any,
          };
        })
        .map(async (object) => {
          switch (answers.projectType) {
            case object.projectType:
              config.projectType = answers.projectType;
              GenerateProject = object.path;
              break;
          
            default:
              break;
          }
        })
        writeFileSync(ConfigPath, JSON.stringify(config), { encoding: "utf-8" });
        await GenerateProject();
      })
    }

    if(await CheckConfig(ConfigPath)) {
      prompt(OverwriteAnswers).then(async (ansewers) => {
        if(ansewers.overwrite) {
          await BuildConfigFile(BaseConfig);
        } else {
          await ManageProject()
        }
      })
    } else {
      await BuildConfigFile(BaseConfig);
      await Exit();
    }
  }
}
