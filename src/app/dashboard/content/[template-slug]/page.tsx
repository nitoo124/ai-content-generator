// app/template/[template-slug]/page.tsx
import ContentPage from "../_components/ContentPage";

type PageProps = {
  params: Promise<{
    "template-slug": string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { "template-slug": id } = await params;
  const query = searchParams ? await searchParams : {};

  return <ContentPage templateSlug={id} searchParams={query} />;
}
