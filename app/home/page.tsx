import ImageUpload from "@/components/home/ImageUpload";
import ImageUploadClient from "@/components/home/ImageUploadClient";
import { getFetchUserAttr, isAuthenticated } from "utils/utils";

export default async function Home() {
    // const userSession = await getFetchUserAttr();
    // const userAuthentication = await isAuthenticated();
    // console.log("Logged in user data: ", userSession, userAuthentication)
    return (
        // <ImageUpload />
        <ImageUploadClient />
    );
}