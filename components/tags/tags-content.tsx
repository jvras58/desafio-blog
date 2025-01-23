
"use client"

import { useMemo } from 'react';
import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { processTagsCount } from "@/helpers/ProcessTagCount";
import { fetchPostsPublic } from "@/services/post/getPublic";



export default function TagContent() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts-public'],
    queryFn: fetchPostsPublic
  });

  const chartData = posts ? processTagsCount(posts) : [];

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      qntd: {
        label: "Quantidade"
      }
    };
  
    chartData.forEach((item, index) => {
      config[item.tag.toLowerCase()] = {
        label: item.tag,
      };
    });
  
    return config;
  }, [chartData]);
  

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <Card className="flex flex-col w-[600px]">
            <CardHeader className="items-center pb-4">
              <CardTitle>Gráfico de pizza - Tags</CardTitle>
              <CardDescription>Top 5 Mais Usadas</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[400px] w-full [&_.recharts-text]:fill-background"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="qntd" hideLabel />}
                />
                <Pie 
                  data={chartData} 
                  dataKey="qntd"
                  nameKey="tag"
                >
                  <LabelList
                    dataKey="tag"
                    position="inside"
                    className="fill-background"
                    stroke="none"
                    fontSize={12}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm pt-4">
              <div className="flex items-center gap-2 font-medium leading-none">
              Tendência de alta de 5,2% este mês <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
              Mostrando o total de Tags dos últimos 6 meses
              </div>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
