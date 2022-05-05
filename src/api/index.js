import fetchWrapper from "./fetchWrapper";
import elmManageStorage from "../utils/localStorage";

/**
 * 商家
 */
//商家登录
export const merchantLogin = (body) => {
    const url = "/login";
    return fetchWrapper(url, { method: "POST", body });
};
//商家注册
export const merchantRegister = (body) => {
    const url = "/register/merchant";
    return fetchWrapper(url, { method: "POST", body });
};

//获取管理员信息
// export const getAdminProfile = () => {
//     const url = "/admins/profile";

//     const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
//     return fetchWrapper(url, { headers });
// };

// 获取商家信息
export const getMerchantProfile = () => {
    const url = "/merchants/profile";
    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { headers });
};

// //获取管理员列表
export const getAdminList = (querys) => {
    const url = "/admins";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};
//删除管理员
export const deleteAdminById = (id) => {
    const url = "/admins/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};

/**
 * 商家
 */

//获取商家列表
export const getMerchantList = (querys) => {
    const url = "/merchants";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};
//删除商家
export const deleteMerchantById = (id) => {
    const url = "/merchants/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};
//新增商家
export const createMerchant = (body) => {
    const url = "/register/merchant";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "POST", body, headers });
};
//更新商家信息
export const updataMerchantById = (id, body) => {
    const url = "/merchants/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "PUT", body, headers });
};

/**
 * 顾客
 */

// 获取顾客列表
export const getCustomerList = (querys) => {
    const url = "/customers";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};

//删除顾客
export const deleteCustomerById = (id) => {
    const url = "/customers/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};
//新增顾客
export const createCustomer = (body) => {
    const url = "/register/customer";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "POST", body, headers });
};
//更新顾客信息
export const updataCustomerById = (id, body) => {
    const url = "/customers/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "PUT", body, headers });
};


/**
 * 商品
 */

//获取商品列表
export const getMerchandisesList = (querys) => {
    const url = "/merchandises";
    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};

//新增商品
export const createMerchandises = (body) => {
    const url = "/merchandises";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "POST", body, headers });
};
//更新商品信息
export const updataMerchandisesById = (id, body) => {
    const url = "/merchandises/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "PUT", body, headers });
};

//删除商品
export const deleteMerchandisesById = (id) => {
    const url = "/merchandises/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};

/**
 * 进货单
 */

//获取进货单列表
export const getPurchaseOrderList = (querys) => {
    const url = "/purchaseOrders";
    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};

//新增进货单
export const createPurchaseOrder = (body) => {
    const url = "/purchaseOrders";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "POST", body, headers });
};

//更新进货单信息
export const updataPurchaseOrderById = (id, body) => {
    const url = "/purchaseOrders/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "PUT", body, headers });
};

//删除进货单
export const deletePurchaseOrderById = (id) => {
    const url = "/purchaseOrders/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};


/**
 * 进货单Item
 */
//### 获取进货单详情

export const getPurchaseOrderMerchandisesItemList = (id, querys) => {
    //const url = "/purchaseOrdersItem/purchaseOrder/62689cda880b9559e4ad0ddc/";
    const url = "/purchaseOrdersItem/purchaseOrder/" + id;


    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};

// 根据商品ID获取商品详细信息
export const getMerchandisesInfo = (id, querys) => {
    const url = "/merchandises/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
}

//新增进货单详情里面的商品
export const createPurchaseOrdersItem = (body) => {
    const url = "/purchaseOrdersItem/";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "POST", body, headers });
};

//更新进货单信息
export const updataPurchaseOrdersItemById = (id, body) => {
    const url = "/purchaseOrdersItem/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "PUT", body, headers });
};

//删除进货单详情
export const deletePurchaseOrdersItemById = (id) => {
    const url = "/purchaseOrdersItem/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};

/**
 * 销售单
 */

//获取销售单列表
export const getSaleOrderList = (querys) => {
    const url = "/saleOrders";
    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};

//新增销售单
export const createSaleOrder = (body) => {
    const url = "/saleOrders";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "POST", body, headers });
};

//更新销售单信息
export const updataSaleOrderById = (id, body) => {
    const url = "/saleOrders/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "PUT", body, headers });
};

//删除销售单
export const deleteSaleOrderById = (id) => {
    const url = "/saleOrders/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};


/**
 * 销售单Item
 */
//### 获取销售单详情

export const getSaleOrderMerchandisesItemList = (id, querys) => {
    //const url = "/purchaseOrdersItem/purchaseOrder/62689cda880b9559e4ad0ddc/";
    const url = "/saleOrdersItem/saleOrder/" + id;


    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { querys, headers });
};

export const createSaleOrdersItem = (body) => {
    const url = "/purchaseOrdersItem/";

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "POST", body, headers });
};

//更新销售单信息
export const updataSaleOrdersItemById = (id, body) => {
    const url = "/saleOrdersItem/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "PUT", body, headers });
};

//删除销售单详情
export const deleteSaleOrdersItemById = (id) => {
    const url = "/saleOrdersItem/" + id;

    const headers = { Authorization: "Bearer " + elmManageStorage.fetch("token") };
    return fetchWrapper(url, { method: "DELETE", headers });
};

