"use client";

import CampaignForm from "./post-form";
import { PostProvider } from "./multi-step-post-config";

const MultiStepCampaign = () => {
	return (
		<PostProvider>
			<CampaignForm />
		</PostProvider>
	);
};

export default MultiStepCampaign;
