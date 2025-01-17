import { Suspense } from "react";
import LoginForm from "@/components/auth/login-form";
import { ContentLayout } from "@/components/painel/content-layout";

const Login = async () => {
    return (
        <ContentLayout title="Login" showUserNav={false}>
            <div className="flex flex-col w-full min-h-full items-center justify-center">
                <div className="mt-20">
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginForm />
                    </Suspense>
                </div>
            </div>
        </ContentLayout>
    );
};

export default Login;