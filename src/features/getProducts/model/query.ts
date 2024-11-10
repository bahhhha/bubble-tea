import { createQuery } from "@farfetched/core";

function transformData(data: string[]) {
  const [...rows] = data;

  return rows.map((row: string) => ({
    id: row[0],
    name: row[1],
    flavor: row[2],
    description: row[3],
    retailPrice: parseInt(row[4], 10),
    price150k: parseInt(row[5], 10),
    price200k: parseInt(row[6], 10),
    category: row[7],
    quantity: parseInt(row[8], 10),
    weight: row[9],
    packsPerBox: parseInt(row[10], 10),
    origin: row[11],
    image: row[12],
    tags: [row[2], "Бабл-ти"],
  }));
}

const fetchGetProducts = createQuery({
  name: "getProducts",
  async handler() {
    const response = await fetch("/api/sheets");
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    const products = await response.json();

    return transformData(products);
  },
});

export { fetchGetProducts };
