"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const util_1 = __importDefault(require("util"));
// Preparation
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const exec = util_1.default.promisify(require("child_process").exec);
// Main
rl.question("Is it a feature (f) or bugfix (b)?\n", callback1);
function callback1(pefixInput) {
    rl.question("Enter issue name and number in the format 'Name #123'\n", (nameAndNumber) => {
        const prefix = pefixInput === "f" ? "feature" : "fix";
        const parts = nameAndNumber.split("#");
        const name = parts[0].trim();
        const number = parts[1].trim();
        const kebabName = kebabCase(name);
        createBranch(`${prefix}/${number}-${kebabName}`);
        rl.close();
    });
}
// Util
function createBranch(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const { stdout, stderr } = yield exec(`git checkout -b ${name}`);
        console.log(stdout);
        console.log(stderr);
        rl.close();
    });
}
const kebabCase = (input) => input
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
