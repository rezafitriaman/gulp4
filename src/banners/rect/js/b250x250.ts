import {Rect} from "./main";
import {CustomFramework} from "../../framework/framework";

// this is a banner
// todo function animation
//      function on specific banner
export class B250x250 extends Rect{
    constructor(bannerName: string) {
        super(bannerName);
    }
    color(standardColor = 'red') {
        console.log("hot...");
        super.color(standardColor);
    }
}
