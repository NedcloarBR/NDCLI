import { existsSync } from "node:fs";

export async function CheckConfig(path: string) {
  return existsSync(path);
}

export async function GetConfigs(file ) {}