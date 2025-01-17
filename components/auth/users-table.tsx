"use client";

import { Check, MoreHorizontal, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { User } from "@/types/shared";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { updateUserRole } from "@/actions/auth/users";
import { UserRole } from "@prisma/client";

type Props = {
	users: User[];
};
export default function UsersTable({ users : initialUsers}: Props) {
	const [users, setUsers] = useState<User[]>(initialUsers);
	const [open, setOpen] = useState(false);

    const handleRoleUpdate = async (userId: string, newRole: UserRole) => {
        try {
            await updateUserRole(userId, newRole);
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === userId
                        ? { ...user, role: newRole }
                        : user
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar role:", error);
        }
    };
	return (
		<Card>
			<CardHeader>
				<CardTitle>{"Usuários"}</CardTitle>
				<CardDescription>{"Gerencie seus usuários"}</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{"Name"}</TableHead>
							<TableHead>{"Email"}</TableHead>
							<TableHead>{"Verificado"}</TableHead>
							<TableHead>{"Role"}</TableHead>
							<TableHead>
								<span className="sr-only">{"Ações"}</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.length > 0 &&
							users.map(({ id, name, email, role }) => (
								<TableRow key={id}>
									<TableCell>{name}</TableCell>
									<TableCell>{email}</TableCell>
									<TableCell>{role}</TableCell>

									<TableCell>
										<Dialog open={open} onOpenChange={setOpen}>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button aria-haspopup="true" size="icon" variant="ghost">
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">{"Toggle menu"}</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="center">
													<DropdownMenuLabel>{"Ações"}</DropdownMenuLabel>
													<DialogTrigger asChild>
													<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
													{"Selecione o Role:"}
													<Select
														value={role}
														onValueChange={(newRole) => {
														handleRoleUpdate(id, newRole as UserRole);
														}}
													>
														<SelectTrigger>
														<SelectValue placeholder="Selecione o role" />
														</SelectTrigger>
														<SelectContent>
														<SelectItem value={UserRole.DEFAULT}>Default</SelectItem>
														<SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
														</SelectContent>
													</Select>
													</DropdownMenuItem>
													</DialogTrigger>
													<DropdownMenuItem>{"Delete"}</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
											<DialogContent className="sm:max-w-[425px]">
												<DialogHeader>
													<DialogTitle>{"Solicitação Mudança de senha"}</DialogTitle>
													<DialogDescription>
														{"Um E-mail será enviado para que o usuário mude sua senha."}
													</DialogDescription>
												</DialogHeader>
											</DialogContent>
										</Dialog>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
