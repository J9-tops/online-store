import { getCategory } from "@/actions/category-actions";
import PreviewFormWrapper from "@/components/vendor/category-page/PreviewFormWrapper";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const { category } = await getCategory(slug);
  if (category) return <PreviewFormWrapper category={category} />;

  return null;
}
