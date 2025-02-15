"use client";

import { GenericForm } from "@/components/FormWrapper";
import { categoryConfig } from "@/types/config";

const Page = () => {
  return <GenericForm {...categoryConfig} />;
};

export default Page;
