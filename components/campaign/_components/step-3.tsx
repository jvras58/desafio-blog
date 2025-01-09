"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
const Step3 = () => {
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name="link"
			render={({ field }) => (
				<FormItem>
					<FormLabel>{"Página"}</FormLabel>
					<FormControl>
						<Input placeholder="Digite o sufixo da URL" {...field} />
					</FormControl>
					<FormDescription>{"Gere o Link da Campanha."}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default Step3;
