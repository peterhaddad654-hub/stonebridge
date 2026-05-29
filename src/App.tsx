import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import CategoryPage from "@/pages/Category";
import ProductPage from "@/pages/Product";
import Cart from "@/pages/Cart";
import Contact from "@/pages/Contact";
import Delivery from "@/pages/Delivery";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";
import SocialFAB from "@/components/SocialFAB";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route>
          <>
            <Navbar />
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/shop" component={Shop} />
              <Route path="/cart" component={Cart} />
              <Route path="/category/:category" component={CategoryPage} />
              <Route path="/product/:slug" component={ProductPage} />
              <Route path="/contact" component={Contact} />
              <Route path="/delivery" component={Delivery} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
            <SocialFAB />
          </>
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}> 
            <Router />
          </WouterRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
