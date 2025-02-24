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
      <nav className="mt-8 flex-col flex gap-2">
        {adminSidebarMenu.map((item, index) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    );
  };
  return (
    <Fragment>
      <div
        className={`
        w-64  flex-col border-r p-6
        ${open ? "flex" : "hidden"}
      `}
      >
        <div className="flex justify-between items-center w-full">
          <BadgeCheck size={24} />
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            className="text-sm bg-black rounded-xl text-white hover:text-black hover:bg-white"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CircleX />
          </button>
        </div>
        <MenuItem setOpen={setOpen}/>
      </div>
      <aside className={`hidden w-64 flex-col border-r p-6 lg:flex ${open ? "lg:hidden":"lg:flex"}`}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItem />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
