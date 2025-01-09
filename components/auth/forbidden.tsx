import Link from 'next/link'
import { Shield, Home, AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ContentLayout } from '../painel/content-layout'
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Acesso Restringido",
	description: "Usuario não tem permissão para acessar esta página",
};

export default function Forbidden() {
return (
        <ContentLayout title='Acesso Restringido'>
        <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-[380px] max-w-[90vw]">
            <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                <Shield className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-center text-2xl font-bold">Acesso Negado</CardTitle>
            <CardDescription className="text-center">
                Você não tem permissão para acessar esta página.
            </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 mx-auto text-warning" />
            <p className="text-muted-foreground">
                Se você acredita que isso é um erro, entre em contato com o Equipe da blog-labs.
            </p>
            </CardContent>
            <CardFooter className="flex justify-center">
            <Button asChild>
                <Link href="/dashboard" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Voltar para a Página Dashboard
                </Link>
            </Button>
            </CardFooter>
        </Card>
        </div>
        </ContentLayout>
)
}

