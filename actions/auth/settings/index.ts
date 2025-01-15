"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserSettingsSchema } from "@/schemas/auth";
import { findUserById } from "@/services";
import bcryptjs from "bcryptjs";
import type { z } from "zod";

import { update } from "@/auth";


export const changeSettings = async (settings: z.infer<typeof UserSettingsSchema>) => {
	const validData = UserSettingsSchema.safeParse(settings);
	if (!validData.success) {
		return {
			error: "Dados inválidos",
		};
	}

	const session = await auth();
	if (!session?.user || !session?.user.id) {
		return {
			error: "Conecte-se para atualizar seus dados",
		};
	}

	const userData = await findUserById(session?.user.id);
	if (!userData) {
		return {
			error: "Usuário não encontrado",
		};
	}

	const { password, newPassword } = validData.data;
	if (password && newPassword && userData?.password) {
		const validPassword = bcryptjs.compare(password, userData.password);
		if (!validPassword) {
			return {
				error: "Senha atual incorreta",
			};
		}

		settings.newPassword = undefined;
		settings.password = await bcryptjs.hash(newPassword, 10);
	}
	settings.email = undefined;
	// settings.isTwoFactorEnabled = undefined;
	try {
		const updatedUser = await prisma.user.update({
			data: {
				...settings,
			},
			where: {
				id: userData.id,
			},
		});

		await update({
			user: {
				...session.user,
				name: updatedUser.name,

			},
		});
		return {
			success: "Perfil atualizado",
		};
	} catch (error) {
		return {
			error: "Algo deu errado",
		};
	}
};
