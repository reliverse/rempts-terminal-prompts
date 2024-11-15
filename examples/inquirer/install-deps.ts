import type { InquirerReadline } from "@/inquirer/src/type/inquirer";

import { withHooks } from "@/inquirer/src/hooks/hook-engine";
import { errorHandler } from "@/reliverse/main-utils";
import readline from "node:readline";

import { prompts } from "~/components/all-in-one";
import { colorize } from "~/utils/colorize";

async function main() {
  const rl = readline.createInterface(
    {
      // @ts-expect-error TODO: fix ts
      input: process.stdin,
      output: process.stdout,
    },
    {
      output: process.stdout,
      input: process.stdin,
      clearLine: () => {},
    },
  );

  await withHooks(rl as unknown as InquirerReadline, async (cycle) => {
    cycle(async () => {
      await prompts({
        id: "start",
        type: "start",
        title: "create-app",
        titleColor: "bgCyanBright",
        titleTypography: "bold",
        state: "initial",
      });

      await prompts({
        type: "text",
        id: "userInput",
        title: "Please enter your username",
        titleColor: "blue",
        titleTypography: "bold",
        content: "Your username will be used to identify you in the system.\n",
        contentTypography: "bold",
        state: "initial",
        validate: (input) => input.length > 0 || "Username cannot be empty.",
      });

      const dir = await prompts({
        id: "dir",
        type: "text",
        title: "Where should we create your project?",
        defaultValue: "./sparkling-solid",
      });

      await prompts({
        type: "end",
        id: "end",
        title: `Problems? ${colorize("https://github.com/blefnk/reliverse/prompts", "cyanBright")}`,
      });
    });
  });

  rl.close();
  process.exit(0);
}

await main().catch((error) => errorHandler(error));
