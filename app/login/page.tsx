import { Login } from "@/components/login/Login";
import { headerFont } from "@/data/config/fonts";

export default function LoginPage() {

  return (
    <div className="w-full flex flex-col items-center fancy-overlay space-y-8 pb-36">
      <div className="flex justify-center items-center">
        <h1
          className={`${headerFont.className} text-6xl sm:text-8xl font-bold tracking-tight text-white text-center inline-flex`}
        >
          Welcome Back
        </h1>
      </div>
      <div className="w-full pt-10 px-3 pb-24 sm:max-w-xl">
        <Login />
      </div>
    </div>
  );
}
