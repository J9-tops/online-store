import { getAllCategories } from "@/actions/category-actions";
import FormWrapper from "@/components/vendor/product-page/FormWrapper";

const Page = async () => {
  const { categories } = await getAllCategories();

  return <FormWrapper categories={categories ?? []} />;
};

export default Page;
