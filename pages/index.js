import AdminLayout from "@/components/AdminLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Title from '@/components/Title';


export default function Home() {
const dataPage = {
    title: 'Manajemen Atleet',
    subtitle: 'Tambah Atleet',
  };

  return (
    <AdminLayout>
        <Title title={`${dataPage.title} - ${dataPage.subtitle}`} />
        <Breadcrumb pageName={dataPage.title} pageNameFeature={dataPage.subtitle} />
    </AdminLayout>
  );
};