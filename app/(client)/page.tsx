import Container from "@/components/Container";
import DiscountBanner from "@/components/DiscountBanner";
import ProductList from "@/components/ProductList";

export default async function Home() {
  return (
    <Container className="pb-10 overflow-auto">
      <DiscountBanner />
      <ProductList title={true} />
    </Container>
  );
}
