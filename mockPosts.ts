export interface Post {
  id: string;
  author: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags?: string[];
  date: string;
}

export const mockPosts: Post[] = [
  {
    id: "1",
    author: "John Doe",
    title: "Introdução ao React",
    description: "Uma introdução ao React para iniciantes",
    content: "React é uma biblioteca JavaScript popular para construção de interfaces de usuário. Ele permite que os desenvolvedores criem componentes de UI reutilizáveis ​​que podem ser compostos para construir aplicativos complexos. Neste post, abordaremos os fundamentos do React, incluindo componentes, props e estado.",
    category: "Frontend",
    date: "2023-05-15"
  },
  {
    id: "2",
    author: "Jane Smith",
    title: "O poder do Tailwind CSS",
    description: "Como Tailwind CSS pode acelerar seu processo de desenvolvimento",
    content: "Tailwind CSS é uma estrutura CSS utilitária que fornece classes utilitárias de baixo nível para construir designs personalizados. Ele permite o desenvolvimento rápido da UI sem sair do HTML. Esta postagem explora como o Tailwind pode acelerar significativamente seu processo de desenvolvimento e tornar suas folhas de estilo mais fáceis de manter.",
    category: "CSS",
    tags: ["CSS", "Tailwind", "Web Design"],
    date: "2023-05-20"
  },
  {
    id: "3",
    author: "Bob Johnson",
    title: "Dominando o TypeScript",
    description: "Principais recursos do TypeScript e como usá-los de maneira eficaz",
    content: "TypeScript é um superconjunto digitado de JavaScript que é compilado em JavaScript simples. Ele adiciona tipagem estática, classes e módulos opcionais ao JavaScript, facilitando o desenvolvimento e a manutenção de aplicativos em grande escala. Esta postagem cobre os principais recursos do TypeScript e fornece exemplos práticos de como usá-los de maneira eficaz em seus projetos.",
    category: "Linguagens de programação",
    tags: ["TypeScript", "JavaScript", "Programming"],
    date: "2023-05-25"
  }
];

