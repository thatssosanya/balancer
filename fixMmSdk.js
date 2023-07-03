const fs = require("fs")

try {
  // https://github.com/MetaMask/metamask-sdk/issues/172
  const PATH = "./node_modules/@metamask/sdk/package.json"
  const packageString = fs.readFileSync(PATH, { encoding: "utf-8" })
  const package = JSON.parse(packageString)
  package.types = "dist/browser/es/sdk/src/index.d.ts"
  fs.writeFileSync(PATH, JSON.stringify(package))
  console.log("Successfully patched types in @metamask/sdk/package.json.")
} catch (e) {
  console.error("Failed to patch types in @metamask/sdk/package.json:\n", e)
}

try {
  // metamask sdk depends on this
  // strict mode doesn't allow octal numeric literals. changing them to hexadecimal
  const PATH = "./node_modules/qrcode-terminal/lib/main.js"
  const mainString = fs.readFileSync(PATH, { encoding: "utf-8" })
  fs.writeFileSync(PATH, mainString.replace("\033", "\x1b"))
  console.log("Successfully patched octal escapes in qrcode-terminal/lib/main.js.")
} catch (e) {
  console.error("Failed to patch octal escapes in qrcode-terminal/lib/main.js:\n", e)
}
