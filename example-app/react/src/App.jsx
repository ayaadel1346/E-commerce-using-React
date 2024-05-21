import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import store from "./store/store";
import NotFound from "./components/layouts/notFound";
import Loader from "./components/layouts/Loader";




const LoginForm = React.lazy(() => import("./components/auth/LoginForm"));
const RegisterForm = React.lazy(() => import("./components/auth/RegisterForm"));
const ProductList = React.lazy(() => import("./components/products/ProductList"));
const ProductForm = React.lazy(() => import("./components/products/ProductForm"));
const ProductDetails = React.lazy(() => import("./components/products/ProductDetails"));
const SharedLayout = React.lazy(() => import("./components/sharedLayouts/sharedLayout"));
const ProtectedRoute = React.lazy(() => import('./components/routes/ProtectedRoute'));



const App = () => {
  const routes = createRoutesFromElements(
    <>
    
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="login" element={<Suspense fallback={<Loader />}><LoginForm /></Suspense>} />
      <Route path="register" element={<Suspense fallback={<Loader />} ><RegisterForm /></Suspense>} />


       <Route path="/products" element={<Navigate to="product-list" />} />

        <Route element={<Suspense fallback={<Loader />}><SharedLayout /></Suspense>}>

          <Route path="products" element={<ProtectedRoute />}>

          <Route path="product-list" element={<Suspense fallback={<Loader />}><ProductList /></Suspense>} />
          <Route path="product-form" element={<Suspense fallback={<Loader />}><ProductForm /></Suspense>} />
          <Route path="product-form/:id" element={<Suspense fallback={<Loader />}><ProductForm /></Suspense>} />
          <Route path="product-details/:id" element={<Suspense fallback={<Loader />}><ProductDetails /></Suspense>} />
        
        </Route>

      </Route>

      <Route path="*" element={<NotFound />} />

    </>
  );

  const router = createBrowserRouter(routes);


  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
