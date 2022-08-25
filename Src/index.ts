#! /usr/bin/env node

import CLIClient from "./Client/CLIClient"

async function Start() {
  const args = process.argv.slice(2)
  const client = new CLIClient(args)
  await client.Prompt();
}

Start().catch(async (error: Error) => {
  console.log(error)
})