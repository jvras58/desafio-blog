"use client";
import MultiStepForm from "@/components/ui/extension/multi-step-form/multi-step-form";
import MultiStepNavButtons from "@/components/ui/extension/multi-step-form/multi-step-nav-buttons";
import MultiStepNavbar from "@/components/ui/extension/multi-step-form/multi-step-navbar";
import { containerCampaignForm as container } from "@/constants/framer-motion";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import { motion } from "framer-motion";
import { PostFormContext } from "./multi-step-post-config";

const PostForm = () => {
	const { CurrentForm } = useMultiStepForm(PostFormContext);

	return (
		<MultiStepForm title="Postagem" description="Digite as informações da postagem">
			<MultiStepNavbar context={PostFormContext} />
			<div className="flex flex-col flex-1 border p-2 min-w-fit">
				<motion.div variants={container} className="flex flex-col gap-2" initial="hidden" animate="visible" exit="exit">
					<CurrentForm />
				</motion.div>
				<MultiStepNavButtons
					context={PostFormContext}
					previousLabel="Anterior"
					nextLabel="Próximo"
					endStepLabel="Finalizar"
				/>
			</div>
		</MultiStepForm>
	);
};

export default PostForm;
