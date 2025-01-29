export default function Title({title}) {
      // Ambil nilai default dari environment variable jika title tidak diberikan
  const defaultTitle = process.env.NEXT_PUBLIC_SITE_NAME;
  const pageTitle = title || defaultTitle;

  return <title>{pageTitle}</title>;
}