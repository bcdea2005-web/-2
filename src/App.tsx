import { Layout } from "./components/Layout";
import { CartPage, CheckoutPage, SuccessPage } from "./pages/CartCheckout";
import { Home } from "./pages/Home";
import { CarePage, ContactPage, LookbookPage, StoryPage, WishlistPage } from "./pages/InfoPages";
import { ProductPage } from "./pages/ProductPage";
import { Shop } from "./pages/Shop";
import { StoreProvider, useStore } from "./store";

function Pages() {
  const { route } = useStore();
  switch (route.page) {
    case "home":
      return <Home />;
    case "shop":
      return <Shop cat={route.cat} q={route.q} />;
    case "product":
      return <ProductPage key={route.slug} slug={route.slug} />;
    case "cart":
      return <CartPage />;
    case "checkout":
      return <CheckoutPage />;
    case "success":
      return <SuccessPage id={route.id} />;
    case "story":
      return <StoryPage />;
    case "lookbook":
      return <LookbookPage />;
    case "contact":
      return <ContactPage />;
    case "care":
      return <CarePage />;
    case "wishlist":
      return <WishlistPage />;
    default:
      return <Home />;
  }
}

export default function App() {
  return (
    <StoreProvider>
      <Layout>
        <Pages />
      </Layout>
    </StoreProvider>
  );
}
