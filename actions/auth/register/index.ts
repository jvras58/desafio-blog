"use server";

import { prisma } from "@/lib/db";
import { RegisterSchema } from "@/schemas/auth";
import { UserRole } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcryptjs from "bcryptjs";
import type { z } from "zod";

/**
 * This method creates the user for Credentials provider
 * @param {z.infer<typeof RegisterSchema>} user - The new user data.
 * @returns {Promise<{error?: string, success?: string}>} The result of the password change request.
 */
export const register = async (user: z.infer<typeof RegisterSchema>) => {
	const valid = await RegisterSchema.safeParse(user);

	if (!valid.success) {
		return {
			error: "Dados inválidos",
		};
	}

	try {
		const { name, email, password } = user;
		const hashedPassword = await bcryptjs.hash(password, 10);
		const createdUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: UserRole.DEFAULT,
				emailVerified: new Date()
			},
		});

		return {
			success: "Conta criada com sucesso",
		};
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return {
					error: "Já existe uma conta relacionada a este e-mail.",
				};
			}
		}
		// return { error };

		throw error;
	}
};
