import Link from 'next/link'
import { Search, Home, FileQuestion } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Metadata } from "next";
import { ContentLayout } from '@/components/painel/content-layout';

export const metadata: Metadata = {
	title: "Not Found",
	description: "Página não encontrada",
};

export default function NotFound() {
return (
<ContentLayout title="Not Found">
<div className="flex items-center justify-center min-h-screen bg-background">
    <Card className="w-[380px] max-w-[90vw]">
    <CardHeader>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
        <Search className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-center text-2xl font-bold">Página Não Encontrada</CardTitle>
        <CardDescription className="text-center">
        Oops! A página que você está procurando não existe.
        </CardDescription>
    </CardHeader>
    <CardContent className="text-center space-y-4">
        <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">
        A página que você tentou acessar pode ter sido movida, excluída ou nunca existiu.
        </p>
    </CardContent>
    <CardFooter className="flex justify-center space-x-4">
        <Button asChild variant="default">
        <Link href="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Página Inicial
        </Link>
        </Button>
    </CardFooter>
    </Card>
</div>
</ContentLayout>
)
}

