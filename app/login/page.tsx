"use client";
import Image from "next/image";
import LoginForm from "./_components/login-form";

const LoginPage = () => {
  return (
    <main className="py-12 p-child">
      <div className="flex items-center justify-center">
        <Image src="/logo-icon.png" alt="meeterpop" width={60} height={60} />
      </div>
      <div className="flex items-center justify-center flex-col mt-12">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
