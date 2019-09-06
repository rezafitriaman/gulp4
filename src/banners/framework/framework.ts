// todo function play pause repeat for the banner
//      plolite init /onload
//      show ads when local or production
//      dumy data
//      function dynamic font size
//      dynamic ads (Adform.DynAdsHelper.getVar())
//      browser check /msieversion crome apple safari
//      function enabler adform or doubleclic

export class CustomFramework {
    bannerName: string;
    constructor(theBannerName: any) {
        this.bannerName = theBannerName;
    }
    greet() {
        console.log(`Hey ${this.bannerName}, this is from CustomFramework`);
    }
}
