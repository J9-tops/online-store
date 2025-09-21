import {
  deleteUser,
  getUsers,
  searchUsers,
  updateUserBanStatus,
  updateUserRole,
} from "@/actions/user-actions";
import { UserRole } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await getUsers();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.users || [];
    },
  });
}

export function useSearchUsers(
  searchTerm: string,
  roleFilter?: UserRole | "All",
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["search-users", searchTerm, roleFilter],
    queryFn: async () => {
      const result = await searchUsers(searchTerm, roleFilter);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.users || [];
    },
    enabled:
      options?.enabled ??
      (searchTerm.trim().length > 0 || (roleFilter && roleFilter !== "All")),
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
}

export function useUpdateUserBanStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      banned,
      banReason,
      banExpires,
    }: {
      userId: string;
      banned: boolean;
      banReason?: string;
      banExpires?: Date;
    }) => {
      const result = await updateUserBanStatus(
        userId,
        banned,
        banReason,
        banExpires
      );
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["search-users"] });
    },
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string;
      role: UserRole;
    }) => {
      const result = await updateUserRole(userId, role);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["search-users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const result = await deleteUser(userId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["search-users"] });
    },
  });
}
