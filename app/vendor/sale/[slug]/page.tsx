import { getSale } from "@/actions/sale-action";
import SalePreviewFormWrapper from "@/components/vendor/sale-page/PreviewFormWrapper";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const { sale } = await getSale(slug);
  if (sale) return <SalePreviewFormWrapper sale={sale} />;

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-600">Sale not found</p>
    </div>
  );
}
