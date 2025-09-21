import {
  ArrowRight,
  Clock,
  DollarSign,
  Package,
  Plus,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const stats = {
    totalProducts: 45,
    totalOrders: 128,
    totalSales: 15420,
    totalCategories: 8,
    pendingOrders: 12,
    todaysSales: 850,
  };

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", amount: 89.99, status: "pending" },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      amount: 124.5,
      status: "completed",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      amount: 67.25,
      status: "processing",
    },
  ];

  const quickActions = [
    {
      title: "Add Product",
      icon: Package,
      href: "/vendor/product",
      description: "Create new products",
      color: "bg-blue-500",
    },
    {
      title: "View Orders",
      icon: ShoppingBag,
      href: "/vendor/order",
      description: "Manage your orders",
      color: "bg-green-500",
    },
    {
      title: "Sales Report",
      icon: TrendingUp,
      href: "/vendor/sale",
      description: "View sales analytics",
      color: "bg-purple-500",
    },
    {
      title: "Categories",
      icon: Users,
      href: "/vendor/category",
      description: "Organize products",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="h-screen bg-gray-50 p-6 !overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vendor Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here&apos;s what&apos;s happening with your store
            today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalProducts}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.totalSales.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalCategories}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <Link
                      href={action.href}
                      key={index}
                      className="group cursor-pointer border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`${action.color} p-2 rounded-lg`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Today&apos;s Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-full">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Today&apos;s Sales
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      ${stats.todaysSales}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Orders
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {stats.pendingOrders}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Orders
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right flex flex-col items-center gap-1">
                    <p className="font-medium text-gray-900">${order.amount}</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Ready to grow your business?
              </h3>
              <p className="text-blue-100">
                Add more products and start selling to reach more customers.
              </p>
            </div>
            <Link
              href="/vendor/product"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
