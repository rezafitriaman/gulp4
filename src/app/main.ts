//import { sayHello } from "./greet";
import { insertCustomerName } from "./customer";
import { showBannerAndNav } from "./showBanners";
//import { framework } from "../banners/framework/framework";

if (typeof window === 'undefined') {
    console.log('hi from Nodejs------------------------------------------------------------------')
}else {

    insertCustomerName(".customer", "Politie");
    showBannerAndNav('.container');

    //framework();

}