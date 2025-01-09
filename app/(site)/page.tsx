import { Metadata } from "next";
import { ContentLayout } from "@/components/painel/content-layout";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog-labs - Homepage",
  description: "Homepage do portal de afiliados da Queridinha das bets",
};

export default function Home() {
  return (
    <ContentLayout title="Home">
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <section className="z-auto text-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                <span className="bg-gradient-to-r from-primary dark:to-white to-gray-600 text-transparent bg-clip-text">
                  {"Boas vindas ao blog da Queridinha das redes!"}
                </span>
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                {
                  "Entre na sua Conta e comece a ver seus posts com a vblogs, a melhor das melhores!"
                }
              </p>
              <div className="flex justify-center">
                <Image
                  src={"/images/icon/placeholder.png"}
                  alt="Blog-labs"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </ContentLayout>
  );
}
