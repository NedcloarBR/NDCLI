import { type QuestionCollection } from "inquirer";
import { basename, join } from "node:path";

export const BaseConfigAnswers: QuestionCollection = [
  {
    name: "name",
    message: "📰 What's the name of the project? 🤔",
    type: "text",
    default: basename(process.cwd())
  },
  {
    name: "packageManager",
    message: "📦 Which package manager do you want to use? 🤔",
    type: "list",
    choices: ["npm", "yarn", "pnp"]
  },
  {
    name: "projectType",
    message: "💨 What type of project? 🤔 (🚧 WIP 🚧)",
    type: "list",
    choices: [/*"discord.js", "React-default", "React-clean", "Express", "Electron", "View Boilerplates",*/ "Only Config File(NDCLI.json)"]
  },
  {
    name: "language",
    message: "🌎 What's the Language of the Project? 🤔",
    type: "list",
    choices: ["JavaScript", "TypeScript"],
  }
]

export const OverwriteAnswers: QuestionCollection = [
  {
    name: "overwrite",
    message: "🚫 NDCLI.json already exists! 🚨\n Would you like to overwrite it? 🤔\n(Y) Regenerate Config / (N) Manage Project",
    type: "confirm",
    default: true
  }
]

export async function PackageJSONAnswers(): Promise<QuestionCollection> {
  const packageJSON = await import(join(process.cwd(), "package.json"));
  return [
    {
      name: "mainFile",
      message: "📁 What's the main file of the Project? 🤔",
      type: "text",
      default: packageJSON.main
    }
  ]
} 
