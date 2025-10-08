import { getAllCategoryProducts } from "@/actions/product-actions";
import Container from "@/components/Container";
import SearchProductResults from "@/components/SearchProductsResults";
interface Props {
  params: Promise<{ slug: string }>;
}

const CategoriesPage = async ({ params }: Props) => {
  const { slug } = await params;

  const { products } = await getAllCategoryProducts(slug);

  return (
    <div className="flex flex-col items-center justify-top bg-white ">
      <Container className="p-8 mt-3">
        <h1 className="text-xl md:text-3xl font-bold mb-3">
          Search results for{" "}
          <span className="text-darkBlue">
            {slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
            Collection
          </span>
        </h1>
        <SearchProductResults product={products || []} />
      </Container>
    </div>
  );
};

export default CategoriesPage;
