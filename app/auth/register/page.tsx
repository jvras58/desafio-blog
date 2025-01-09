import RegisterForm from "@/components/auth/register-form";
import { ContentLayout } from "@/components/painel/content-layout";

const Login = async () => {
	return (
		<ContentLayout title="Cadastro" showUserNav={false}>
		<div className="flex flex-col w-full min-h-full items-center justify-center">
			<div className="mt-20">
				<RegisterForm />
			</div>
		</div>
		</ContentLayout>
	);
};

export default Login;
