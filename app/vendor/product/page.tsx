"use client";

import { GenericForm } from "@/components/FormWrapper";
import { productConfig } from "@/types/config";

const Page = () => {
  return <GenericForm {...productConfig} />;
};

export default Page;
