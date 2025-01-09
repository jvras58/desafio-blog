"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const Step1 = () => {
  const { control } = useFormContext();

  return (
    <Card className="border-none">
      <CardHeader className="pl-0">
        <CardTitle>{"Informações Básicas"}</CardTitle>
        <CardDescription>{"Preencha o título e descrição do seu post."}</CardDescription>
      </CardHeader>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{"Título"}</FormLabel>
            <FormControl>
              <Input placeholder="Título do Post" {...field} />
            </FormControl>
            <FormDescription>{"Título que aparecerá no seu post."}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{"Descrição"}</FormLabel>
            <FormControl>
              <Input placeholder="Descrição do Post" {...field} />
            </FormControl>
            <FormDescription>{"Descrição do conteúdo do post."}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};

export default Step1;
