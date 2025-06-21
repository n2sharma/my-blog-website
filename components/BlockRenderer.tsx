import { MOCK_PRODUCTS } from "@/data/products";
import Image from "next/image";
import { BlockTag } from "@/lib/blocks";

export default function BlockRenderer({ block }: { block: BlockTag }) {
  const items = MOCK_PRODUCTS.filter((p) => block.products?.includes(p.sku));

  return (
    <section className="my-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow">
      {block.image && (
        <Image
          src={block.image}
          alt={block.name}
          width={800}
          height={200}
          className="w-full rounded mb-4 object-cover"
        />
      )}
      <h2 className="text-2xl font-bold mb-4">{block.name}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div
            key={it.sku}
            className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <Image
              src={it.image}
              alt={it.name}
              width={300}
              height={200}
              className="rounded w-full h-40 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{it.name}</h3>
            <p className="font-bold text-primary">{it.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
