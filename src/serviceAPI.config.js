const BASEURL = "https://www.fastmock.site/mock/b71b53cce1010737c7b94e58bb8986c8/mallsystem/mall"
const LOCALURL = "http://localhost:3000/"

const URL = {
    getShoppingMallInfo: BASEURL,                                                  //商品信息接口
    registerUser: LOCALURL + 'user/register',                                      //用户注册接口
    loginUser: LOCALURL + 'user/login',                                            //用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',                     //商品数据接口
    getCategoryList: LOCALURL + 'goods/getCategoryList',                           //商品大类接口
    getCategorySubList: LOCALURL + 'goods/getCategorySubList',                     //商品小类接口
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID',   //商品详细信息接口
}

module.exports = URL