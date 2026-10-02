export interface Project{

    title : string;
    description: string;
    technologies: string[];
    image: string;
    repositoryLink ?: string;
    demoLink ?: string; 
};

export interface Blog{

    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    slug: string;
    hasArticle?: boolean;
};

export interface BlogArticle extends Blog {
    contentMarkdown: string;
    contentHtml: string;
}