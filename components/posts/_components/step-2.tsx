"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const Step2 = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{"Conteúdo"}</FormLabel>
          <FormControl>
            <Input placeholder="Conteúdo do Post" {...field} />
          </FormControl>
          <FormDescription>{"Conteúdo detalhado do post."}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Step2;
