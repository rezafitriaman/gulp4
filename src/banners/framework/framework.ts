// todo function play pause repeat for the banner
//      plolite init /onload
//      show ads when local or production
//      dumy data
//      function dynamic font size
//      dynamic ads (Adform.DynAdsHelper.getVar())
//      browser check /msieversion crome apple safari
//      function enabler adform or doubleclic

export class CustomFramework {
    bannerName: unknown;
    politeLoading: unknown;
    develop: boolean;
    dummyData: any;
    constructor(theBannerName: unknown, theDummyData: unknown) {
        // @ts-ignore dhtml comes from adform library
        this.politeLoading = dhtml.getVar('bn', 0);
        this.develop = (window.location.href.indexOf('9999') != -1);
        this.bannerName = theBannerName;
        this.dummyData = theDummyData;
    }
    politeInit() {
        if (this.politeLoading) {
            // when banner is served from tag
            // @ts-ignore
            dhtml.sharedEvents.once('pageLoadComplete', this.showAd);

            // noinspection JSDeprecatedSymbols
            // @ts-ignore
            dhtml.external.initPoliteMode();
        } else {
            let _this = this;
            // when testing locally
            setTimeout(function(){ _this.showAd(_this) }, 2000);
        }
    }
    showAd (_this:any) {

        let banners: NodeList = document.querySelectorAll('.present');
        let spinners: NodeList = document.querySelectorAll('.spinner');

        banners.forEach(banner => (<HTMLElement>banner).style.display = 'block');
        spinners.forEach(spinner => (<HTMLElement>spinner).style.display = 'block');

        //todo make this function right / on develop start or production start
        if(_this.develop) {
            //let data = _this.dummyData;

            // @ts-ignore comes from adform library
            //Adform.DynAdsHelper.setDemoData(data);

            //this.startAds(data);
            console.log('framework',_this);
            console.log('banner start develop');
            return
        }else {
            console.log('banner start live');
            return
            //this.startAds();
        }
    }
    greet() {
        console.log(`Hey ${this.bannerName}, this is from CustomFramework`);
    }
}
