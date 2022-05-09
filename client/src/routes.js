import AdminPage from "./pages/Admin"
import AuthPage from "./pages/Auth"
import CartPage from "./pages/Cart"
import ProductPage from "./pages/ProductPage"
import ShopPage from "./pages/Shop"
import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Delivery from "./pages/Delivery"
import HowTo from "./pages/HowTo"
import ProfilePage from "./pages/ProfilePage"


import { ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, HOME_ROUTE, HOWTO_ROUTE, ABOUT_ROUTE, DELIVERY_ROUTE, PROFILE_ROUTE } from "./utils/consts"

export const authRoutes = [
{
    path: ADMIN_ROUTE,
    Component: AdminPage
},
{
    path: CART_ROUTE,
    Component: CartPage
},
{
    path: PROFILE_ROUTE,
    Component: ProfilePage
}

]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: ShopPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    },
    {
        path: HOME_ROUTE,
        Component: HomePage
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: DELIVERY_ROUTE,
        Component: Delivery
    },
    {
        path: HOWTO_ROUTE,
        Component: HowTo
    }
]

