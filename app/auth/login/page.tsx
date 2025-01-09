import LoginForm from "@/components/auth/login-form";
import { ContentLayout } from "@/components/painel/content-layout";

const Login = async () => {
    return (
        <ContentLayout title="Login" showUserNav={false}>
        <div className="flex flex-col w-full min-h-full items-center justify-center">
            <div className="mt-20">
                <LoginForm />
            </div>
        </div>
        </ContentLayout>
    );
};

export default Login;