import { join } from "node:path";
import { rmdir } from "node:fs/promises";
import { CheckConfig } from "../../Utils";

export async function Exit(): Promise<void> {
  if(await CheckConfig("Temp")) {
    console.log("aaaa")
    await rmdir( "Temp")
  }
  console.log("👋 Goodbye!")
  process.exit(0);
}