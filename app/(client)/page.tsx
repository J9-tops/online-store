import { getAllSales } from "@/actions/sale-action";
import Container from "@/components/Container";
import DiscountBanner from "@/components/DiscountBanner";
import ProductList from "@/components/ProductList";

export default async function Home() {
  const { sales } = await getAllSales();
  return (
    <Container className="pb-10 overflow-auto">
      <DiscountBanner sales={sales ?? []} />
      <ProductList title={true} />
    </Container>
  );
}
