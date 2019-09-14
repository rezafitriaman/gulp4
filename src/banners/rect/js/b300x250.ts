import {Rect} from "./main";
import {CustomFramework} from "../../framework/framework";

// this is a banner
// todo function animation
//      function on specific banner
export class B300x250 extends Rect{
    constructor(theBannerName: unknown, theDummyData: unknown) {
        super(theBannerName, theDummyData);
    }
    color(standardColor = 'green') {
        console.log("chill...");
        console.log('300x250', this);
        super.color(standardColor);
    }
}
