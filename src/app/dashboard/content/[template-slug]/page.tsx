// app/template/[template-slug]/page.tsx
import ContentPage from "../_components/ContentPage";

type PageProps = {
  params: Promise<{
    "template-slug": string;
  }>;
  // Remove searchParams since we'll handle it in the client component
};

export default async function Page({ params }: PageProps) {
  const { "template-slug": id } = await params;
  return <ContentPage templateSlug={id} />;
}