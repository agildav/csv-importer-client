import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./pages/AuthPage";
import ImportPage from "./pages/ImportPage";
import ContactsPage from "./pages/ContactPage";
import BadContactsPage from "./pages/BadContactPage";
import UploadedFilesPage from "./pages/UploadedFilePage";

const Routes = () => {
  const authPages = [
    {
      protected: false,
      path: "/auth",
      component: AuthPage
    }
  ];

  const dashboardPages = [
    {
      protected: true,
      path: "/dashboard",
      component: DashboardPage
    },
    {
      protected: true,
      path: "/import",
      component: ImportPage
    },
    {
      protected: true,
      path: "/contacts",
      component: ContactsPage
    },
    {
      protected: true,
      path: "/bad-contacts",
      component: BadContactsPage
    },
    {
      protected: true,
      path: "/uploaded-files",
      component: UploadedFilesPage
    }
  ];

  return [...authPages, ...dashboardPages];
};

export default Routes;
