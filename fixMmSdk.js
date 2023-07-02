// https://github.com/MetaMask/metamask-sdk/issues/172

const fs = require("fs")

const PATH = "./node_modules/@metamask/sdk/package.json"

try {
  const packageString = fs.readFileSync(PATH, { encoding: "utf-8" })
  const package = JSON.parse(packageString)
  package.types = "dist/browser/es/sdk/src/index.d.ts"
  fs.writeFileSync(PATH, JSON.stringify(package))
  console.log("Successfully patched types in @metamask/sdk/package.json.")
} catch (e) {
  console.error("Failed to patch types in @metamask/sdk/package.json:\n", e)
}
