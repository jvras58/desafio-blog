"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const Step3 = () => {
  const { control, setValue } = useFormContext();

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Exemplo de tags: "tag1, tag2, tag3"
    const value = e.target.value;
    const tagsArray = value.split(",").map((tag) => tag.trim()).filter(Boolean);
    setValue("tags", tagsArray);
  };

  return (
    <>
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{"Categoria"}</FormLabel>
            <FormControl>
              <Input placeholder="Categoria do Post" {...field} />
            </FormControl>
            <FormDescription>{"Categoria que seu post se encaixa."}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{"Tags"}</FormLabel>
            <FormControl>
              <Input 
                placeholder="Adicione tags separadas por vírgulas" 
                {...field} 
                onChange={handleTagChange} // Atualiza as tags no form
              />
            </FormControl>
            <FormDescription>{"Adicione tags relacionadas ao seu post, separadas por vírgula."}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Step3;
