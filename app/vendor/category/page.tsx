"use client";

import { GenericForm } from "@/components/FormWrapper";
import { saleConfig } from "@/types/config";

const Page = () => {
  return <GenericForm {...saleConfig} />;
};

export default Page;
