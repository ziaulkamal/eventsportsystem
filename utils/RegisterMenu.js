// utils/RegisterMenu.js

export const menuItems = [
  {
    type: "singleNav",
    icon: "ti ti-brand-google-home",
    label: "Dashboards",
    href: "/",
  },
  {
    type: "collapseNav",
    icon: "ti ti-medal",
    label: "Atleet",
    id: "sidebarAtleet",
    subItems: [
      {
        label: "Daftar Atleet",
        href: "/atleet/atleet",
      },
      {
        label: "Daftar Pelatih",
        href: "/atleet/coach",
      },
      {
        label: "Daftar Official",
        href: "/atleet/official",
      },
      {
        label: "Cari",
        href: "/atleet/search",
      },
    ],
  },
  {
    type: "collapseNav",
    icon: "ti ti-target",
    label: "Pertandingan",
    id: "sidebarMatchManage",
    subItems: [
      {
        label: "Daftar Pertandingan",
        href: "/match/list",
      },
      {
        label: "Cari",
        href: "/match/search",
      },
    ],
  },
  {
    type: "collapseNav",
    icon: "ti ti-alarm",
    label: "Jadwal",
    id: "sidebarSchedule",
    subItems: [
      {
        label: "Daftar Jadwal",
        href: "/schedule/list",
      },
      {
        label: "Perubahan Jadwal",
        href: "/schedule/replace",
      },
      {
        label: "Cari",
        href: "/schedule/search",
      },
    ],
  },
  {
    type: "collapseNav",
    icon: "ti ti-ticket",
    label: "Tiket",
    id: "sidebarTicket",
    subItems: [
      {
        label: "Buat Tiket",
        href: "/ticket/create",
      },
      {
        label: "Data Pelanggan",
        href: "/ticket/customer",
      },
      {
        label: "Absensi Kehadiran",
        href: "/ticket/absent",
      },
    ],
  },
  {
    type: "collapseNav",
    icon: "ti ti-file",
    label: "Dokumen",
    id: "sidebarDocument",
    subItems: [
      {
        label: "Data Dokumen Atleet",
        href: "/document/atleet",
      },
      {
        label: "Data Dokumen Umum",
        href: "/document/official",
      },
      {
        label: "Cari",
        href: "/document/search",
      },
    ],
  },
  {
    type: "collapseNav",
    icon: "ti ti-database",
    label: "Unit Data",
    id: "sidebarUnitData",
    subItems: [
      {
        label: "Kontingen",
        href: "/unit/contingen",
      },
      {
        label: "Keamanan",
        href: "/unit/security",
      },
      {
        label: "Medis",
        href: "/unit/medic",
      },
      {
        label: "Transportasi",
        href: "/unit/transportation",
      },
      {
        label: "Akomodasi",
        href: "/unit/acomodation",
      },
      {
        label: "Media Center",
        href: "/unit/mediacenter",
      },
      {
        label: "Wasit",
        href: "/unit/mediator",
      },
    ],
  },
  {
    type: "collapseNav",
    icon: "ti ti-users",
    label: "Pengguna",
    id: "sidebarAdmin",
    subItems: [
      {
        label: "Data Admin",
        href: "/user/data",
      },
      {
        label: "Data Level",
        href: "/user/level",
      },
      {
        label: "Menunggu Persetujuan",
        href: "/user/waiting",
      },
    ],
  },
];