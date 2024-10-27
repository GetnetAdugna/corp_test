import { Hero } from '@/components/landing/Hero';
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { getAuthUser } from 'utils/utils';

export default async function LandingPage() {

  const session = await getAuthUser()
  console.log("initial: ", session)
  if (session) {
    redirect('/home')
  }
  return (
    <div className="pb-36">
      <Hero />
    </div>
  );
}
