"use client";

import PostForm from "./post-form";
import { PostProvider } from "./multi-step-post-config";

const MultiStepPost = () => {
	return (
		<PostProvider>
			<PostForm />
		</PostProvider>
	);
};

export default MultiStepPost;
