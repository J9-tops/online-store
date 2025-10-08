import { searchProduct } from "@/actions/product-actions";
import Container from "@/components/Container";
import SearchProductResults from "@/components/SearchProductsResults";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;
  const { products } = await searchProduct(query);

  if (!products) {
    return (
      <div className="flex flex-col items-center justify-normal min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl text-center">
          <h1 className="text-3xl font-bold mb-3">
            No products found for:{" "}
            <span className="text-darkBlue">{query}</span>
          </h1>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-white">
      <Container className=" mt-3">
        <h1 className="text-xl font-bold mb-6 text-center">
          Search results for <span className="text-darkBlue">{query}</span>
        </h1>
        <SearchProductResults product={products} />
      </Container>
    </div>
  );
};

export default SearchPage;
