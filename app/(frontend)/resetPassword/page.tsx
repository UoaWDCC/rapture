import Button from "../components/ui/Button";
import ResetForm from "./ResetForm";

type props={
    searchParams: Promise<{
        token?: string;
    }
}

export default async function ResetPasswordPage({ searchParams }: props) {
    const { token } = await searchParams;

    return <ResetForm token={token} />;
}