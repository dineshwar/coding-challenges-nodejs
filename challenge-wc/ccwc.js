const fs = require("node:fs").promises;
const readline = require("node:readline");

const argv = process.argv.slice(2);

const byteSize = (str) => new Blob([str]).size;
const lineCount = (data) => data.split("\n").length - 1;
const wordCount = (data) => data.split(/\s+/).filter((d) => d !== "").length;

let option;
let fileName;
let fWc, fBc, fLc, fCc;
let isReadFile = true;
if (argv.length > 1) {
  [option, fileName] = argv;
} else {
  if (!argv[0].startsWith("-")) {
    [fileName] = argv;
  } else {
    isReadFile = false;
    [option] = argv;
  }
}

async function getFileData(filename) {
  try {
    const data = await fs.readFile(fileName, "utf8");
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function getFileInputData() {
  const rl = readline.createInterface({
    input: process.stdin,
  });
  let data = "";

  rl.on("line", (line) => {
    data += line + "\n";
  });

  // Wait for the "close" event before returning data
  await new Promise((resolve) => {
    rl.once("close", resolve);
  });

  return data;
}

function outputText(val) {
  if (!isReadFile) {
    console.log("%s", val);
  } else {
    console.log("%s %s", val, fileName);
  }
}

const fileData = isReadFile ? getFileData(fileName) : getFileInputData();
fileData.then((data) => {
  fBc = byteSize(data);
  fLc = lineCount(data);
  fWc = wordCount(data);
  fCc = byteSize(data);
  // -c: Count bytes
  if (option === "-c") {
    outputText(fBc);
  }
  // -l: Count lines
  if (option === "-l") {
    outputText(fLc);
  }
  // -w: Count words
  if (option === "-w") {
    outputText(fWc);
  }
  // -m: Count characters
  if (option === "-m") {
    outputText(fCc);
  }
  if (option === undefined) {
    outputText(`${fLc} ${fWc} ${fBc}`);
  }
});
