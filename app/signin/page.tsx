import { SignInComponent } from "@/components/login/SignInComponent"
import { redirect } from "next/navigation";
import { getFetchUserAttr } from "utils/utils";

export default async function SignInPage() {
    const user = await getFetchUserAttr()

    if (user) {
        redirect('/')
    }
    return (
        <div>
            <SignInComponent />
        </div>
    )
}