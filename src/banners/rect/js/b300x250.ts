import {Rect} from "./main";
import {CustomFramework} from "../../framework/framework";

// this is a banner
// todo function animation
//      function on specific banner
export class B300x250 extends Rect{
    constructor(bannerName: string) {
        super(bannerName);
    }
    color(standardColor = 'green') {
        console.log("chill...");
        super.color(standardColor);
    }
}
