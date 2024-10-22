import Card from "@/components/Card";
import { createClient } from "@/client/client";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function Home() {

   const supabase = createClient();

    const { data: topProducts, error:topProductsError } = await supabase
      .from("easysell-products")
      .select()
      .eq("boost", true);

    const { data: products } = await supabase
      .from("easysell-products")
      .select();

    if(!products) {
      return notFound()
    }

  return (
    <main className="min-h-screen mx-auto mx-w-[100rem]">
      <div className="px-12 pt-12 pb-20">
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-40">
          <div className="pt-12">
            <h2 className="text-4xl mb-16">OUR TOP PRODUCTS</h2>
            <p className="text-xl">You can pay to boost your product here.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-12">
            {topProducts && topProducts.map((product) => (
              <Card
                key={`${product.name} - ${product.id}`}
                {...product}
                imageUrl={`${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${product.imageUrl}`}
              />
            ))}
          </div>
        </div>

        <h2 className="text-4xl mt-20 mb-16">ALL PRODUCTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={`${product.name} - ${product.id}`}
              {...product}
              imageUrl={`${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${product.imageUrl}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
