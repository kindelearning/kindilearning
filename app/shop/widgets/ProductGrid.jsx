import { ProductCard } from "..";
import { getProducts } from "@/lib/hygraph";
import NotFound from "@/app/not-found";
import Link from "next/link";

export default async function ProductGrid() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex gap-2 scrollbar-hidden overflow-x-scroll">
        {products.map((product) => (
          <div key={product.id} className="border">
            <Link href={`/shop/${product.id}`}  >
              <ProductCard
                image={product.thumbnail.url}
                title={product.title}
                price={product.salePrice}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
