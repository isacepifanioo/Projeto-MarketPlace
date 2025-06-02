import { StrictMode } from "react";
import { ContextProvider } from "./context/useContextAuth.tsx";
import { createRoot } from "react-dom/client";
import { GlobalStyled } from "./GlobalStyele.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PageAuth } from "./components/pages/auth/PageAuth.tsx";
import App from "./App.tsx";
import { Home } from "./components/pages/home/Home.tsx";
import { Profile } from "./components/pages/profile/Profile.tsx";
import { ProfileHome } from "./components/pages/home/Profile.Home.tsx";
import { CreateProducts } from "./components/pages/authProducts/CreateProducts.tsx";
import { UpdateProduct } from "./components/pages/updateProduct/UpdateProduct.tsx";
import { PageProduct } from "./components/pages/Products/PageProduct.tsx";
import { CartProvider } from "./context/useContextCart.tsx";
import { ContextPurchaseProvider } from "./context/useContextPurchase.tsx";
import { MyPurchase } from "./components/pages/myPurchase/MyPurchase.tsx";
import { PagePurchase } from "./components/pages/purchase/PagePurchase.tsx";
import { FormPurchase } from "./components/pages/FormPurchase/FormPurchase.tsx";
import { EditFormPurchase } from "./components/pages/FormPurchase/EditFormPurchase/EditFormPurchase.tsx";
export enum ETypeInterface {
    BUY = "BUY",
    UPDATE = "UPDATE"
}

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
      },
      {
        path: '/myPurchase',
        element: <MyPurchase/>
      },
      {
        path: '/myPurchase/:id',
        element: <FormPurchase/>
      },
      {
        path: '/myPurchase/:id/editForm',
        element: <EditFormPurchase/>
      },
      {
        path: "/:id",
        element: <PageProduct TypeInterface={ETypeInterface.BUY}/>
      },
      {
        path: "/:id/purchase",
        element: <PagePurchase/>
      },
    ]
  },
  {
    path: '/deshboard',
    element: <ProfileHome/>,
    children: [
      {
        path: '/deshboard',
        element: <Profile/>
      },
      {
        path: '/deshboard/authProducts',
        element: <CreateProducts/>
      }
    ]
  },
  {
    path: '/deshboard/update/:id',
    element: <UpdateProduct/>
  },
  {
    path: '/deshboard/product/:id',
    element: <PageProduct TypeInterface={ETypeInterface.UPDATE}/>
  },

]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <ContextPurchaseProvider>
        <ContextProvider>
          <GlobalStyled />
          <RouterProvider router={router} />
        </ContextProvider>
      </ContextPurchaseProvider>
    </CartProvider>
  </StrictMode>
);
