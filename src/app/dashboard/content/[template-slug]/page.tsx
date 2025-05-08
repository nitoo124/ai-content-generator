// app/template/[template-slug]/page.tsx
import ContentPage from "../_components/ContentPage"

type PageProps = {
  params: Promise<{
    "template-slug": string
  }>
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: PageProps) {

  const id = (await params)["template-slug"]
  return (
    <ContentPage templateSlug={id} searchParams={searchParams} />
  )
}
