/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
//let baseUrl = 'http://localhost:3000/api/v1'; 
//let baseUrl = 'http://192.168.16.178:3000/api/v1';
let baseUrl = 'http://172.26.86.113:3000/api/v1';

let routerMode = 'hash';
// let baseImgPath;

// if (process.env.NODE_ENV == 'development') {
// 	baseUrl = '';
//     // baseImgPath = '/img/';
// }else{
// 	baseUrl = '//elm.cangdu.org';
//     // baseImgPath = '//elm.cangdu.org/img/';
// }

export {
	baseUrl,
	routerMode,
	// baseImgPath
}