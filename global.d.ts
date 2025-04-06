type NextPageProps = {
  params: Promise<{ [key: string]: string | undefined }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
