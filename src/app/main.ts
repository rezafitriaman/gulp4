//import { sayHello } from "./greet";
import { insertCustomerName } from "./customer";
import { showBannerAndNav } from "./showBanners";
import { B300x250 } from "../banners/rect/js/b300x250";
import { B250x250 } from "../banners/rect/js/b250x250";

if (typeof window === 'undefined') {
    console.log('hi from Nodejs------------------------------------------------------------------')
}else {

    insertCustomerName(".customer", "Politie");
    showBannerAndNav('.container');

    //todo make this class right
    let b300x250 = new B300x250("300x250");
    let b250x250 = new B250x250("250x250");
    b300x250.color('hotpink');
    b250x250.color();
}

