import { Hero } from '@/components/landing/Hero';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

export default async function LandingPage() {
  const session = await getServerSession(authOptions)
  if (session?.user) {
    redirect('/home')
  }
  return (
    <div className="pb-36">
      <Hero />
    </div>
  );
}
