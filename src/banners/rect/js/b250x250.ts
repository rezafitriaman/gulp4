import {Rect} from "./main";
import {CustomFramework} from "../../framework/framework";

// this is a banner
// todo function animation
//      function on specific banner
export class B250x250 extends Rect{
    constructor(theBannerName: unknown, theDummyData: unknown) {
        super(theBannerName, theDummyData);
    }
    color(standardColor = 'red') {
        console.log("hot...");
        super.color(standardColor);
    }
}
