import ImageUpload from "@/components/home/ImageUpload";
import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { getAuthUser } from "utils/utils";

export default async function Home() {
    // const session = await getServerSession(authOptions)
    // const session = await getAuthUser()
    // console.log("Session: ", session)
    // if (!session) {
    //     redirect('/login')
    // }

    return (
        <ImageUpload />
    );
}