import Vue from 'vue';

import VueRouter from "vue-router";

Vue.use(VueRouter); // 使用 vue-router
import elmManageStorage from "@/utils/localStorage";

import App from '../App.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import PurchaseOrderItem from '../pages/PurchaseOrderItem.vue';
import SaleOrderItem from '../pages/SaleOrderItem.vue';
import Home from "../pages/home/Home.vue";
import Admin from "../pages/home/admin/Admin.vue";
import Merchant from "../pages/home/merchant/Merchant.vue";
import Customer from "../pages/home/customer/Customer.vue";
import Merchandise from "../pages/home/merchandise/Merchandise.vue";
import PurchaseOrder from "../pages/home/purchaseOrder/PurchaseOrder.vue";
import SaleOrder from "../pages/home/saleOrder/SaleOrder.vue";
/**
 * 路由关系：
 * /login                     /home                     /home/service  
 * +------------------+       +-----------------+       +-----------------+
 * | App              |       | App             |       | App             |
 * | +--------------+ |       | +-------------+ |       | +-------------+ |
 * | | Login        | |       | | Home        | |       | | Home        | |
 * | |              | |       | |             | |       | | +---------+ | |
 * | |              | |  +--) | |<router-view>| |  +--) | | | Service | | |
 * | |              | |       | |  无对应内容  | |       | | |列表+表单 | | |
 * | |              | |       | |             | |       | | +---------+ | |
 * | +--------------+ |       | +-------------+ |       | +-------------+ |
 * +------------------+       +-----------------+       +-----------------+
 * 
 *       /home/product                /home/product/list              /home/product/edit          
 *       +---------------------+      +------------------------+      +------------------------+
 *       | App                 |      | App                    |      | App                    |
 *       | +-----------------+ |      | +--------------------+ |      | +--------------------+ |
 *       | | Home            | |      | | Home               | |      | | Home               | |
 *       | | +-------------+ | |      | | +----------------+ | |      | | +----------------+ | |
 *  +--) | | | Product     | | | +--) | | | Product        | | | +--) | | | Product        | | |
 *       | | |<router-view>| | |      | | | +------------+ | | |      | | | +------------+ | | |          
 *       | | |  无对应内容  | | |      | | | | ProductList| | | |      | | | | ProductEdit| | | |          
 *       | | |             | | |      | | | | 单列表页    | | | |      | | | | 单表单页    | | | |          
 *       | | |             | | |      | | | +------------+ | | |      | | | +------------+ | | |          
 *       | | +-------------+ | |      | | +----------------+ | |      | | +----------------+ | |
 *       | +-----------------+ |      | +--------------------+ |      | +--------------------+ |
 *       +---------------------+      +------------------------+      +------------------------+
 */

// 配置路由信息
const routes = [
    {
        path: "/", // 父路由路径
        component: App, // 父路由组件，传入 vue component
        name: "App", // 路由名称
        // 设置子路由
        children: [
            {
                path: "register", // 子路由路径
                component: Register, // 子路由组件，会替换父组件中<router-view>中的内容
                name: "Register" // 路由名称
            },
            {
                path: "login", // 子路由路径
                component: Login, // 子路由组件，会替换父组件中<router-view>中的内容
                name: "Login" // 路由名称
            },
            {
                path: "purchaseOrderItem", // 子路由路径
                component: PurchaseOrderItem, // 子路由组件，会替换父组件中<router-view>中的内容
                name: "PurchaseOrderItem" // 路由名称
            },
            {
                path: "saleOrderItem", // 子路由路径
                component: SaleOrderItem, // 子路由组件，会替换父组件中<router-view>中的内容
                name: "SaleOrderItem" // 路由名称
            },
            {
                // 应用首页
                path: "home", component: Home, name: "Home",
                children: [
                    { path: "admin", component: Admin, name: "Admin" },
                    { path: "merchant", component: Merchant, name: "Merchant" },
                    { path: "customer", component: Customer, name: "Customer" },
                    { path: "merchandise", component: Merchandise, name: "Merchandise" },
                    { path: "purchaseOrder", component: PurchaseOrder, name: "PurchaseOrder" },
                    { path: "saleOrder", component: SaleOrder, name: "SaleOrder" }
                ]
            }
        ]
    }
];

const router = new VueRouter({
    routes, // （缩写）相当于 routes: routes
    strict: process.env.NODE_ENV !== 'production',
});

router.beforeEach((to, from, next) => {
    if (to.name === "Login" || to.name === "Register") {
        return next();
    }

    // 非 login 页面，检查是否登录
    if (!elmManageStorage.fetch("token")) {

        return next({ name: "Login" });
    }

    next();

});

export default router;