export type CategoryType = {
  id: string;
  title: string;
  slug: string;
  description: string;
};

export type CategoryState = {
  isLoading: boolean;
  categories: CategoryType[];
};
