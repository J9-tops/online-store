"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { signOut } from "@/lib/auth-client";
import {
  useSearchUsers,
  useUpdateUserBanStatus,
  useUsers,
} from "@/services/users";
import { maskString } from "@/utils";
import { UserRole } from "@prisma/client";
import {
  Ban,
  Calendar,
  Filter,
  Loader2,
  Mail,
  MoreVertical,
  Search,
  Shield,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type UserType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
};

const AdminUserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "All">("All");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const shouldSearch =
    debouncedSearchTerm.trim().length > 0 || roleFilter !== "All";

  const {
    data: allUsers = [],
    isLoading: allUsersLoading,
    error: allUsersError,
  } = useUsers();

  const {
    data: searchResults = [],
    isLoading: searchLoading,
    error: searchError,
  } = useSearchUsers(debouncedSearchTerm, roleFilter, {
    enabled: shouldSearch,
  });

  const updateBanStatusMutation = useUpdateUserBanStatus();

  const users = shouldSearch ? searchResults : allUsers;
  const isLoading = shouldSearch ? searchLoading : allUsersLoading;
  const error = shouldSearch ? searchError : allUsersError;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "Admin":
        return <Shield className="w-4 h-4 text-purple-600" />;
      case "Vendor":
        return <User className="w-4 h-4 text-blue-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadgeVariant = (
    role: UserRole
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (role) {
      case "Admin":
        return "destructive";
      case "Vendor":
        return "default";
      default:
        return "secondary";
    }
  };

  const handleBanUser = async (user: UserType) => {
    try {
      await updateBanStatusMutation.mutateAsync({
        userId: user.id,
        banned: true,
        banReason: "Administrative action",
        banExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      toast.success(`${user.name} has been banned successfully.`);
    } catch (error) {
      toast.error("Failed to ban user. Please try again.");
    }
  };

  const handleUnbanUser = async (user: UserType) => {
    try {
      await updateBanStatusMutation.mutateAsync({
        userId: user.id,
        banned: false,
      });
      toast.success(`${user.name} has been unbanned successfully.`);
    } catch (error) {
      toast.error("Failed to unban user. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/40 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading users
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </p>
        </div>
      </div>
    );
  }
  const router = useRouter();

  const logout = () => {
    signOut();
    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-gray-50/40">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <a href="/">
                <h1 className="text-3xl font-bold tracking-tight">
                  AccessMart Admin
                </h1>
              </a>
              <p className="text-muted-foreground">
                Manage and monitor user accounts across your platform
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              Total Users: {isLoading ? "..." : users.length}
            </Badge>
            <Button
              onClick={logout}
              variant="destructive"
              className="py-1 px-2"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="sm:w-48">
                <Select
                  value={roleFilter}
                  onValueChange={(value: UserRole | "All") =>
                    setRoleFilter(value)
                  }
                >
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Vendor">Vendor</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                Loading users...
              </span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email Status</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: UserType) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.image || ""} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {maskString(user.email)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <Badge
                          variant={user.emailVerified ? "default" : "secondary"}
                        >
                          {user.emailVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.banned ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Ban className="w-4 h-4 text-red-500" />
                            <Badge variant="destructive">Banned</Badge>
                          </div>
                          {user.banReason && (
                            <div className="text-sm text-muted-foreground">
                              {user.banReason}
                            </div>
                          )}
                          {user.banExpires && (
                            <div className="text-sm text-muted-foreground">
                              Until: {formatDate(user.banExpires)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-green-700 border-green-200 bg-green-50"
                        >
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {formatDate(user.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={updateBanStatusMutation.isPending}
                          >
                            {updateBanStatusMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <MoreVertical className="w-4 h-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.banned ? (
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => handleUnbanUser(user)}
                            >
                              Unban User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleBanUser(user)}
                            >
                              Ban User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!isLoading && users.length === 0 && (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No users found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminUserDashboard;
