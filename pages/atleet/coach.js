import AdminLayout from "@/components/AdminLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Title from "@/components/Title";

// List Page Atleet 
const CoachPage = () => {
    const dataPage = {
        "title": "Daftar Pelatih",
        "subtitle" : "Atleet"
    };
    return(
        <AdminLayout>
        
            <Title title={`${dataPage.title} - ${dataPage.subtitle}`} />
            <Breadcrumb pageName={dataPage.title} pageNameFeature={dataPage.subtitle} />
            
        </AdminLayout>
    )
}

export default CoachPage;