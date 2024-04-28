const fs = require("node:fs").promises;
const readline = require("node:readline");

const argv = process.argv.slice(2);
const [fileName] = argv;

async function readFileData(file) {
  fs.readFile(file, "utf8").then((data) => {
    let ans = 1;
    const dataLen = data.length;
    if (!dataLen) {
      ans = 0;
    }
    if (data[0] !== "{" && data[dataLen - 1] !== "}") {
      ans = 0;
    }
    console.log(ans);
  });
}

readFileData(fileName);
