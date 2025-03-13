import React, { Fragment } from "react";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  CircleX,
  NotebookText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const adminSidebarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <CircleX />,
  },
];

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const MenuItem = ({ setOpen }) => {
    return (
      <nav className="mt-8 flex-col flex gap-3">
        {adminSidebarMenu.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
          >
            <span className="text-gray-500">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </nav>
    );
  };
  return (
    <Fragment>
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-72 flex-col border-r bg-white p-6 shadow-lg transition-transform lg:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-8 w-8 text-gray-900" />
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <button
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => setOpen(false)}
          >
            <CircleX className="h-5 w-5" />
          </button>
        </div>
        <MenuItem setOpen={setOpen}/>
      </div>
      <aside className={`hidden w-72 flex-col border-r bg-white p-6 lg:flex`}>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined className="h-8 w-8 text-gray-900" />
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <MenuItem />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
