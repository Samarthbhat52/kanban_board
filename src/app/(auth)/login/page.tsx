import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Image
            src="/logo-dark.svg"
            width="150"
            height="80"
            alt="Logo"
            className="w-200 mx-auto dark:hidden"
          />
          <Image
            src="/logo-light.svg"
            width="150"
            height="80"
            alt="Logo"
            className="w-200 mx-auto hidden dark:block"
          />
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-center text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://vsxovmocmtqxdqbjgwou.supabase.co/storage/v1/object/public/Assets/login-dark.png?t=2024-05-03T03%3A39%3A49.201Z"
          alt="Image"
          width="1920"
          height="1080"
          className="h-[calc(100dvh)] w-full bg-background object-contain dark:hidden"
        />
        <Image
          src="https://vsxovmocmtqxdqbjgwou.supabase.co/storage/v1/object/public/Assets/login-light.png?t=2024-05-03T03%3A36%3A54.061Z"
          alt="Image"
          width="1920"
          height="1080"
          className="text-red hidden h-[calc(100dvh)] w-full bg-background object-contain dark:block"
        />
      </div>
    </div>
  );
};

export default LoginPage;
