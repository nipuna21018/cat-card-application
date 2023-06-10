import { CatCardGenerator } from "./modules/cat";
import readline from 'readline';
import { getUserInputs } from "./modules/cat/utils/utils";

const readlineInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const options = await getUserInputs(readlineInstance);

  const generator = new CatCardGenerator();
  generator.generateCatCard(options);

  readlineInstance.close();
}

main();