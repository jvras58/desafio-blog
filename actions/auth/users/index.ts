"use server";

import { prisma } from "@/lib/db";
import { UserRole } from "@prisma/client";


export const getUsers = async () => {
	const users = await prisma.user.findMany();
	return users;
};

export const updateUserRole = async (userId: string, newRole: UserRole) => {
	try {
	  await prisma.user.update({
		where: { id: userId },
		data: { role: newRole }
	  });
	  return { success: "Role atualizado com sucesso" };
	} catch (error) {
	  return { error: "Erro ao atualizar role" }; 
	}
  };
