const ProductCardSkeleton = () => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden animate-pulse text-sm">
      {/* Image skeleton */}
      <div className="border-b border-b-gray-300 overflow-hidden relative">
        <div className="w-full h-[191px] bg-gray-200"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-5 flex flex-col gap-2">
        {/* Category and rating row */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* Title skeleton */}
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>

        {/* Price skeleton */}
        <div className="flex items-center justify-between gap-5">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-12 bg-gray-200 rounded-md mt-2"></div>
      </div>
    </div>
  );
};

const PriceViewSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
    </div>
  );
};

const AddToCartButtonSkeleton = () => {
  return (
    <div className="h-12">
      <div className="w-full h-10 bg-gray-200 rounded-md mt-2 animate-pulse"></div>
    </div>
  );
};

const ProductCardSkeletonWithShimmer = () => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden text-sm relative">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

      {/* Image skeleton */}
      <div className="border-b border-b-gray-300 overflow-hidden relative">
        <div className="w-full h-[191px] bg-gray-200"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-5 flex flex-col gap-2">
        {/* Category and rating row */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* Title skeleton */}
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>

        {/* Price skeleton */}
        <div className="flex items-center justify-between gap-5">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-12 bg-gray-200 rounded-md mt-2"></div>
      </div>
    </div>
  );
};

const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export {
  AddToCartButtonSkeleton,
  PriceViewSkeleton,
  ProductCardSkeleton,
  ProductCardSkeletonWithShimmer,
  ProductGridSkeleton,
};
