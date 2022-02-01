import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const Index = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (session) window.location.replace("/private");
  }, [loading, session]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Link href="/auth/login">login</Link>
      <Link href="/auth/login">Register</Link>
    </div>
  );
};
export default Index;
