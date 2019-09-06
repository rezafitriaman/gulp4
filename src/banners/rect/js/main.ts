import {CustomFramework} from "../../framework/framework";

// this the parent of a banner, instant of CustomFramework
// todo an generic function for all the rect banner goes hier:
//      browser check
//      show banner or hide
//      start ads
//
export class Rect extends CustomFramework{
    bannerName: string;
    constructor(theBannerName: string) {
        super(theBannerName);
        this.bannerName = theBannerName;
    }
    color(standardColor: string = 'transparent') {
        console.log(`${this.bannerName} has ${standardColor} color.`);
        this.greet()
    }
}

/*class B300x250 extends Rect {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}*/

/*class B250x250 extends Rect {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let tom: Animal = new B250x250("Tommy the Palomino");

tom.move(34);*/

