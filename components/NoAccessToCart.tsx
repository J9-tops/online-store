import AuthButtons from "@/components/AuthButtons";
import logo from "@/images/logo.png";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const NoAccessToCart = () => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Image
              src={logo}
              alt="Company logo"
              width={80}
              height={80}
              className="mb-4"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center">
            Log in to view your cart items and checkout. Don&rsquo;t miss out on
            your favorite products!
          </p>

          <AuthButtons type="login" />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don&rsquo;t have an account?
          </div>
          <AuthButtons type="signup" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccessToCart;
