import { getProduct } from "@/actions/product-actions";
import FormWrapper from "@/components/vendor/product-page/PreviewFormWrapper";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const { product } = await getProduct(slug);
  if (product) return <FormWrapper product={product} />;

  return null;
}
