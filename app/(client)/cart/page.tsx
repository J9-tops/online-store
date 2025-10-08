import CartContent from "@/components/CartContent";
import Loader from "@/components/Loader";
import NoAccessToCart from "@/components/NoAccessToCart";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function Page() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) return <NoAccessToCart />;

  return (
    <div className="bg-white pb-10">
      <Suspense fallback={<Loader />}>
        <CartContent />
      </Suspense>
    </div>
  );
}
