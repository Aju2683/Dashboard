import { useState } from "react";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";
import {
  Activity,
  Bell,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Grid2X2,
  Home,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Package,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  User,
  Users,
  X,
} from "lucide-react";

import OverviewPage from "./OverviewPage.jsx";
import TaskPage from "./TaskPage.jsx";
import EcommercePage from "./EcommercePage.jsx";
import ProductsPage from "./ProductsPage.jsx";
import CustomersPage from "./CustomersPage.jsx";
import CalendarPage from "./CalendarPage.jsx";
import MailPage from "./MailPage.jsx";
import ChatPage from "./ChatPage.jsx";
import ProjectsPage from "./ProjectsPage.jsx";
import FileManagerPage from "./FileManagerPage.jsx";
import NotesPage from "./NotesPage.jsx";
import ContactsPage from "./ContactsPage.jsx";
import PlaceholderPage from "./PlaceholderPage.jsx";


import {
  SignupPage,
  LoginPage,
  RecoverPasswordPage,
  ResetPasswordPage,
} from "./AuthPages.jsx";

<img
  src={avatar}
  alt="profile"
  className="h-10 w-10 rounded-full object-cover"
/>

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },

  {
    id: "ecommerce",
    name: "E-Commerce",
    icon: ShoppingBag,
    children: [
      { id: "products", name: "Products" },
      { id: "orders", name: "Orders" },
      { id: "customers", name: "Customers" },
    ],
  },

  { id: "calendar", name: "Calendar", icon: CalendarDays },
  { id: "mail", name: "Mail", icon: Mail, badge: true },
  { id: "chat", name: "Chat", icon: MessageSquare },
  { id: "task", name: "Task", icon: Grid2X2 },
  { id: "projects", name: "Projects", icon: Package },
  { id: "file", name: "File Manager", icon: Home },
  { id: "notes", name: "Notes", icon: SlidersHorizontal },
  { id: "contacts", name: "Contacts", icon: Users },
];

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const isAuthPage = ["signup", "login", "recover", "reset"].includes(
    activePage
  );

  function renderPage() {
    switch (activePage) {
      case "dashboard":
        return <OverviewPage />;

      case "signup":
        return <SignupPage setActivePage={setActivePage} />;

      case "login":
        return <LoginPage setActivePage={setActivePage} />;

      case "recover":
        return <RecoverPasswordPage setActivePage={setActivePage} />;

      case "reset":
        return <ResetPasswordPage setActivePage={setActivePage} />;

      case "task":
        return <TaskPage />;

      case "products":
        return <ProductsPage />;

      case "orders":
        return <EcommercePage />;

      case "customers":
        return <CustomersPage />;

      case "calendar":
        return <CalendarPage />;

      case "mail":
        return <MailPage />;

      case "chat":
        return <ChatPage />;

      case "projects":
        return <ProjectsPage />;

      case "file":
        return <FileManagerPage />;

      case "notes":
        return <NotesPage />;

      case "contacts":
        return <ContactsPage />;

      case "dashboard":
         return <OverviewPage />;

      case "profile":
         return <OverviewPage />;;
    }
  }

  if (isAuthPage) {
    return <>{renderPage()}</>;
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f6f8fb] text-[#20242c]">
      <div className="flex h-screen">
        {activePage === "profile" ? (
          <MyProfileSidebar setActivePage={setActivePage} />
) : (
  <Sidebar activePage={activePage} setActivePage={setActivePage} />
)}

        <main className="h-screen flex-1 overflow-y-auto">
          <Topbar setActivePage={setActivePage} />
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ activePage, setActivePage }) {
  const [openMenu, setOpenMenu] = useState("ecommerce");

  return (
    <aside className="h-screen w-[230px] shrink-0 overflow-y-auto border-r border-gray-200 bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-5">
        <img
          src={logo}
          alt="Flower Logo"
          className="h-9 w-9 rounded-full object-cover"
        />

        <h2 className="text-[18px] font-bold uppercase tracking-wide text-gray-800">
          Flower
        </h2>
      </div>

      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#f7f8fa] px-4 py-3">
          <Search size={17} className="text-gray-400" />
          <span className="text-[14px] text-gray-400">Search anything</span>
        </div>
      </div>

      <div className="px-4 py-5">
        <p className="mb-3 px-2 text-[13px] font-bold uppercase text-gray-400">
          Main Menu
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children?.length > 0;

            const ecommerceChildren = ["products", "orders", "customers"];
            const isChildActive =
              item.id === "ecommerce" && ecommerceChildren.includes(activePage);

            const isActive = activePage === item.id || isChildActive;

            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (hasChildren) {
                      setOpenMenu(openMenu === item.id ? "" : item.id);
                    } else {
                      setActivePage(item.id);
                    }
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold ${
                    isActive
                      ? "bg-[#a7e879] text-[#135f1f]"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.name}
                  </span>

                  {hasChildren && (
                    <ChevronDown
                      size={16}
                      className={`transition ${
                        openMenu === item.id ? "rotate-180" : ""
                      }`}
                    />
                  )}

                  {item.badge && (
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  )}
                </button>

                {hasChildren && openMenu === item.id && (
                  <div className="mt-2 space-y-1 pl-7">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => setActivePage(child.id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] font-semibold ${
                          activePage === child.id
                            ? "bg-[#e5f7d7] text-gray-800"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function Topbar({ setActivePage }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [activeQuickMenu, setActiveQuickMenu] = useState("settings");

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-7">
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowQuickMenu(!showQuickMenu)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50"
        >
          <Menu size={22} />
        </button>

        {showQuickMenu && (
          <QuickMenu
            activeQuickMenu={activeQuickMenu}
            setActiveQuickMenu={setActiveQuickMenu}
          />
        )}
      </div>

      <div className="flex items-center gap-5">
        <Search size={21} className="text-gray-600" />

        <button
          type="button"
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowProfileMenu(false);
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50"
        >
          <Bell size={21} className="text-gray-600" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-400" />
        </button>

        <button
          type="button"
          onClick={() => {
            setShowProfileMenu(!showProfileMenu);
            setShowNotifications(false);
          }}
          className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-gray-50"
        >
          <img
            src={avatar}
            alt="profile"
            className="h-10 w-10 rounded-full object-cover"
          />

          <p className="text-[15px] font-bold text-gray-700">ArtTemplate</p>

          <ChevronDown
            size={15}
            className={`transition ${showProfileMenu ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {showNotifications && <NotificationsDropdown />}

      {showProfileMenu && (
        <ProfileDropdown setActivePage={setActivePage} />
      )}
    </header>
  );
}
function QuickMenu({ activeQuickMenu, setActiveQuickMenu }) {
  const items = [
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
    {
      id: "activity",
      label: "Activity",
      icon: Activity,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
  ];

  return (
    <div className="absolute left-0 top-[48px] z-50 flex items-center gap-3 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
      {items.map((item) => {
        const Icon = item.icon;
        const active = activeQuickMenu === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveQuickMenu(item.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[14px] font-semibold transition ${
              active
                ? "bg-gray-50 text-[#199a42]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function NotificationsDropdown() {
  const notifications = [
    { id: 1, name: "Regina Cooper", time: "1 min ago", online: true },
    { id: 2, name: "Judith Black", time: "5 min ago", online: true, close: true },
    { id: 3, name: "Ronald Robertson", time: "3 hour ago", online: true },
    { id: 4, name: "Dustin Williamson", time: "15 hour ago", online: false },
    { id: 5, name: "Calvin Flores", time: "Yesterday", online: true },
    { id: 6, name: "Robert Edwards", time: "Yesterday", online: true },
  ];

  return (
    <div className="absolute right-[175px] top-[58px] z-50 w-[310px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-[16px] font-bold text-gray-800">
          Notifications
        </h2>

        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-[10px] font-bold text-white">
          8
        </span>
      </div>

      <div className="py-2">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-5 py-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={avatar}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover"
                />

                {item.online && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#199a42]" />
                )}
              </div>

              <div>
                <p className="text-[13px] font-bold text-gray-700">
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-400">{item.time}</p>
              </div>
            </div>

            {item.close && (
              <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:text-gray-700">
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileDropdown({ setActivePage }) {
  return (
    <div className="absolute right-7 top-[58px] z-50 w-[260px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
      <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-4">
        <img
          src={avatar}
          alt="ArtTemplate"
          className="h-11 w-11 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold text-gray-800">ArtTemplate</p>
          <p className="text-[12px] text-gray-400">Manager</p>
        </div>

        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-[10px] font-bold text-white">
          8
        </span>
      </div>

      <div className="py-2">
        <ProfileMenuItem
          icon={User}
          label="My Profile"
          onClick={() => setActivePage("profile")}
         />
        <ProfileMenuItem icon={Mail} label="My Messages" />
        <ProfileMenuItem icon={Briefcase} label="My Tasks" />
      </div>

      <div className="border-t border-gray-100 py-2">
        <ProfileMenuItem active icon={Settings} label="Settings" />
        <ProfileMenuItem icon={Lock} label="Lock Screen" />
      </div>

      <div className="border-t border-gray-100 py-2">
        <ProfileMenuItem
          icon={User}
          label="Login"
          onClick={() => setActivePage("login")}
        />

        <ProfileMenuItem
          icon={User}
          label="Sign Up"
          onClick={() => setActivePage("signup")}
        />

        <ProfileMenuItem
          icon={LogOut}
          label="Logout"
          onClick={() => setActivePage("login")}
        />
      </div>
    </div>
  );
}

function ProfileMenuItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 px-5 py-3 text-left text-[13px] font-medium ${
        active
          ? "bg-gray-50 text-gray-800"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
function MyProfileSidebar({ setActivePage }) {
  const favorites = [
    {
      name: "Ronald Robertson",
      role: "Product Designer",
    },
    {
      name: "Regina Cooper",
      role: "Project Manager",
    },
    {
      name: "Judith Black",
      role: "Business Analyst",
    },
    {
      name: "Calvin Flores",
      role: "Senior Vice President",
    },
  ];

  return (
    <aside className="h-screen w-[230px] shrink-0 overflow-y-auto border-r border-gray-200 bg-white px-6 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
     <div className="mb-7 flex items-center justify-between">
     <button
      type="button"
      onClick={() => setActivePage("dashboard")}
      className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      >
    ←
  </button>

  <h2 className="text-[15px] font-bold text-gray-800">My Profile</h2>

  <div className="h-9 w-9" />
</div>

      <div className="mb-7 text-center">
        <img
          src={avatar}
          alt="profile"
          className="mx-auto h-[95px] w-[95px] rounded-[28px] object-cover"
        />

        <h2 className="mt-4 text-[16px] font-bold text-gray-800">
          Felecia Brown
        </h2>

        <p className="mt-1 text-[13px] text-gray-400">Project Manager</p>

        <button className="mt-5 rounded-lg bg-[#199a42] px-6 py-2.5 text-[13px] font-bold text-white">
          Edit profile
        </button>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="mb-5 text-[12px] font-bold uppercase text-gray-500">
          Info
        </h3>

        <ProfileInfo label="Email" value="example@mail.com" />
        <ProfileInfo label="Phone" value="+123-4567-8800" />
        <ProfileInfo label="Birthday" value="17 March, 1995" />
        <ProfileInfo label="Location" value="New York, NY" />
      </div>

      <div className="mt-7 border-t border-gray-100 pt-6">
        <h3 className="mb-5 text-[12px] font-bold uppercase text-gray-500">
          Favorites
        </h3>

        <div className="space-y-5">
          {favorites.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <img
                src={avatar}
                alt={item.name}
                className="h-9 w-9 rounded-full object-cover"
              />

              <div>
                <p className="text-[13px] font-bold text-gray-700">
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-400">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function ProfileInfo({ label, value }) {
  return (
    <div className="mb-5">
      <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">
        {label}
      </p>

      <p className="text-[13px] font-medium text-gray-700">{value}</p>
    </div>
  );
}
export default Dashboard;