import { createReadStream } from "fs";
import { resolve } from "path";
import { pipeline } from "node:stream";
import transformStream from "./transform-stream.mjs";
import Split from "stream-split";
import gameStateFormatStream from "./game-state-formatter-stream.mjs";

const splitter = new Split(new Buffer.from("\n"));

const main = () => {
  const dirname = resolve();

  const readStream = createReadStream(`${dirname}/quake.log`, {
    encoding: "utf-8",
  });

  pipeline(readStream, splitter, transformStream, gameStateFormatStream, process.stdout, (error) => {
    if (error) {
      return console.error('Something wrong!', error);
    }

    console.error('Parse is over!')
  });
};

main();
