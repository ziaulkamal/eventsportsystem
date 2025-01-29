import Script from "next/script";
import AppMenuNav from "./AppMenuNav";
import Credit from "./Credit";
import HeadNav from "./HeadNav";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";


const AdminLayout = ({ children }) => {
  // const router = useRouter();

  // useEffect(() => {
  //   const token = Cookies.get("authToken"); // Ambil token dari cookies
  //   if (!token) {
  //     router.push("/login"); // Redirect ke halaman login jika tidak ada token
  //   }
  // }, [router]);
  return (
    <>
      <div id="layout-wrapper">
        <AppMenuNav />
        <div className="vertical-overlay"></div>
        <HeadNav />
        <div className="main-content">
          <div className="page-content">
            {children}
          </div>
        </div>
      </div>
          {/* <Credit /> */}
      <Script src={`${process.env.NEXT_PUBLIC_BASE_URL}js/layout.js`} strategy="beforeInteractive" ></Script>
      <Script src={`${process.env.NEXT_PUBLIC_BASE_URL}libs/bootstrap/js/bootstrap.bundle.min.js`} strategy="beforeInteractive"></Script>
      <Script src={`${process.env.NEXT_PUBLIC_BASE_URL}js/plugins.js`} strategy="afterInteractive"></Script>
      <Script src={`${process.env.NEXT_PUBLIC_BASE_URL}libs/simplebar/simplebar.min.js`}></Script>
      <Script src={`${process.env.NEXT_PUBLIC_BASE_URL}js/app.js`} strategy="afterInteractive"></Script>
    </>
  );
};

export default AdminLayout;
