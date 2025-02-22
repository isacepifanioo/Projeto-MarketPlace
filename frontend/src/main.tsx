import { StrictMode } from "react";
import { ContextProvider } from "./context/useContextAuth.tsx";
import { createRoot } from "react-dom/client";
import { GlobalStyled } from "./GlobalStyele.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PageAuth } from "./components/pages/auth/PageAuth.tsx";
import App from "./App.tsx";
import { Home } from "./components/pages/home/Home.tsx";

const router = createBrowserRouter([
  {
    path: "auth",
    element: <PageAuth />,
  },
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <GlobalStyled />
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
