const fs = require("node:fs").promises;
const readline = require("node:readline");

const argv = process.argv.slice(2);
const [fileName] = argv;

async function readFileData(file) {
  fs.readFile(file, "utf8").then((data) => {
    console.log(data);
  });
}

readFileData(fileName);
