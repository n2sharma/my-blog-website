import { MOCK_PRODUCTS } from "@/data/products";
import Image from "next/image";
import { BlockTag } from "@/lib/blocks";

export default function BlockRenderer({ block }: { block: BlockTag }) {
  const items = MOCK_PRODUCTS.filter((p) => block.products?.includes(p.sku));

  return (
    <section className="my-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-900 p-6 shadow-sm">
      {/* Block Banner Image */}
      {block.image && (
        <div className="mb-6 overflow-hidden rounded-xl">
          <Image
            src={block.image}
            alt={block.name}
            width={1200}
            height={300}
            className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105 rounded-xl"
          />
        </div>
      )}

      {/* Block Title */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
        {block.name}
      </h2>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((product) => (
          <div
            key={product.sku}
            className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition duration-300"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={250}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                {product.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
