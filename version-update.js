const fs = require("fs");
const packageJsonPath = "./package.json";

const now = new Date();
const formattedDate = `${now.getFullYear().toString().slice(-2)}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

packageJson.version = formattedDate;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n", "utf8");

console.log(` Updated version to: ${formattedDate}`);
