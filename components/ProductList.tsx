import Category from "./Category";
import ProductGrid from "./ProductGrid";

type Props = {
  title: boolean;
};

export default function ProductList({ title }: Props) {
  return (
    <>
      <Category />
      {title && (
        <div className="pb-5">
          <h2 className="text-2xl font-semibold text-gray-600">
            Day of the <span className=" text-lightBlue">Deal</span>
          </h2>
          <p className="text-sm text-gray-500 font-thin">
            Don&rsquo;t wait. The time will never be just right.
          </p>
        </div>
      )}
      <ProductGrid />
    </>
  );
}
