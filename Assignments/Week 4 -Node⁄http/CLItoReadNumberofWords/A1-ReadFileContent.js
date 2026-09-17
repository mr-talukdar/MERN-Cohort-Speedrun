const fs = require("fs/promises");
const path = require("path");
const { Command } = require("commander");
const program = new Command();

program.option("-p, --path <value>", "An String Input of the Path");

program.parse(process.argv);

const options = program.opts();

const ReadFileContent = async () => {
  try {
    if (!options.path) {
      throw new Error(
        "You didnt provide an File Path, or it was broken, make sure to wrap it in '' ",
      );
    }
    const text = await fs.readFile(path.normalize(options.path), "utf-8");
    const data = text.trim().split(/\s+/);
    const dataCount = text.trim() == "" ? 0 : data.length;

    console.log(dataCount);
  } catch (error) {
    if (error.code === "ENOENT") console.log("The Path doesnt exist");
    console.log(error);
  }
};
ReadFileContent();
