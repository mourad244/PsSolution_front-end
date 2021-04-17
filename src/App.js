import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "react-jss";
import Theme from "./resources/theme";
import { createUseStyles, useTheme } from "react-jss";
import { Column, Row } from "simple-flexbox";
import HeaderComponent from "./layout/sidebar/HeaderComponent";
import { SidebarComponent, SidebarContext } from "./layout/sidebar";
import NavBar from "./common/navBar";
import Services from "./components/services";
import ServiceForm from "./components/serviceForm";
import ServicesCategorie from "./components/servicesCategorie";
import ServiceCategorieForm from "./components/serviceCategorieForm";
import Products from "./components/products";
import ProductForm from "./components/productForm";
import ProductsType from "./components/productsType";
import ProductTypeForm from "./components/productTypeForm";
import ProductsCategorie from "./components/productsCategorie";
import ProductCategorieForm from "./components/productCategorieForm";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import ProtectedRoute from "./common/protectedRoute";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const useStyles = createUseStyles({
  container: {
    height: "100%",
    minHeight: 850,
  },
  mainBlock: {
    marginLeft: 0,
    padding: 30,
    "@media (max-width: 1080px)": {
      marginLeft: 0,
    },
  },
  contentBlock: {
    marginTop: 54,
  },
});
const App = () => {
  const [yser, setyser] = useState();
  useEffect(() => {
    const user = auth.getCurrentUser();
    setyser(user);
  }, []);

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <SidebarContext>
          <Row className={classes.container}>
            <ToastContainer />
            {/* <NavBar user={yser} /> */}
            <SidebarComponent />
            <Column flexGrow={1} className={classes.mainBlock}>
              <HeaderComponent />
              <div className={classes.contentBlock}>
                <Switch>
                  {/* <Route path="/register" component={RegisterForm} /> */}
                  <Route path="/login" component={LoginForm} />
                  <Route path="/logout" component={Logout} />
                  <ProtectedRoute
                    path="/servicescategorie/:id"
                    component={ServiceCategorieForm}
                  />
                  <Route
                    path="/servicescategorie"
                    render={(props) => (
                      <ServicesCategorie {...props} user={yser} />
                    )}
                  />
                  <ProtectedRoute
                    path="/services/:id"
                    component={ServiceForm}
                  />
                  <Route
                    path="/services"
                    render={(props) => <Services {...props} user={yser} />}
                  />
                  <ProtectedRoute
                    path="/productsCategorie/:id"
                    component={ProductCategorieForm}
                  />
                  <Route
                    path="/productscategorie"
                    render={(props) => (
                      <ProductsCategorie {...props} user={yser} />
                    )}
                  />
                  <ProtectedRoute
                    path="/productstype/:id"
                    component={ProductTypeForm}
                  />
                  <Route
                    path="/productstype"
                    render={(props) => <ProductsType {...props} user={yser} />}
                  />

                  <ProtectedRoute
                    path="/products/:id"
                    component={ProductForm}
                  />
                  <Route
                    path="/products"
                    render={(props) => <Products {...props} user={yser} />}
                  />

                  <Route path="/not-found" component={NotFound} />
                  <Redirect from="/" exact to="/products" />
                  <Redirect to="/not-found" />
                </Switch>
              </div>
            </Column>
          </Row>
        </SidebarContext>
      </Router>
    </ThemeProvider>
  );
};

export default App;
