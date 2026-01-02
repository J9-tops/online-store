
import { getAllCategories } from "../actions/category-actions.ts";

async function main() {
  console.log("Testing getAllCategories...");
  const result = await getAllCategories();
  console.log("Result:", JSON.stringify(result, null, 2));
}

main().catch(console.error);
