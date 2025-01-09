"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/shared";

type Props = {
	users: User[];
};

const UsersStats = ({ users }: Props) => {
	const totalUsers = users.length;

	return (
		<div className="flex flex-row items-center justify-around w-full">
			<Card>
				<CardHeader>
					<CardTitle>{"Usuários Totais"}</CardTitle>
					<CardDescription />
				</CardHeader>
				<CardContent className="flex items-center justify-center text-4xl">{totalUsers}</CardContent>
			</Card>
		</div>
	);
};

export default UsersStats;
