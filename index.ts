import readline from "readline";
import util from "util";

// Preparation
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const exec = util.promisify(require("child_process").exec);

// Main
rl.question("Is it a feature (f) or bugfix (b)?\n", callback1);

function callback1(pefixInput: string) {
  rl.question(
    "Enter issue name and number in the format 'Name #123'\n",
    (nameAndNumber: string) => {
      const prefix = pefixInput === "f" ? "feature" : "fix";
      const parts = nameAndNumber.split("#");
      const name = parts[0].trim();
      const number = parts[1].trim();
      const kebabName = kebabCase(name);
      createBranch(`${prefix}/${number}-${kebabName}`);
      rl.close();
    }
  );
}

// Util
async function createBranch(name: string) {
  const { stdout, stderr } = await exec(`git checkout -b ${name}`);
  console.log(stdout);
  console.log(stderr);
  rl.close();
}

const disallowedCharacters = /[^a-zA-Z0-9]/g;
const multipleHyphens = /--+/g;
const hyphenAtBeginning = /^-/;
const hyphenAtEnd = /-$/;

const kebabCase = (input: string) =>
  input
    .replace(disallowedCharacters, "-")
    .replace(multipleHyphens, "-")
    .replace(hyphenAtBeginning, "")
    .replace(hyphenAtEnd, "")
    .toLowerCase();
