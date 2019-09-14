//import { sayHello } from "./greet";
import { insertCustomerName } from "./customer";
import { showBannerAndNav } from "./showBanners";
import { B300x250 } from "../banners/rect/js/b300x250";
import { B250x250 } from "../banners/rect/js/b250x250";

if (typeof window === 'undefined') {
    console.log('hi from Nodejs------------------------------------------------------------------');

}else {

    let demoData = [
        {
            'copy_slide_one': 'Maak jij de {{stap}} | naar de {{politie}}?',
            'copy_silde_two': 'Bekijk onze | {{opleidingen}}',
            'cta_text' : 'word agent',
            'copy_footer': 'ALLES WAT JE IN JE HEBT | MAAK ER POLITIEWERK VAN',
            'clickTAG' : 'https://kombijde.politie.nl/',
            'asset_agenten': '13_celine.png',
            'asset_achtergrond' : "Default.png",
            'achtergrond_positie_300x250' : 'bottom left',
            'achtergrond_positie_300x600' : 'bottom left',
            'achtergrond_positie_970x250' : 'top right'
        },
        {
            'copy_slide_one': 'Maak jij de {{stap 2}} | naar de {{politie 2}}?',
            'copy_silde_two': 'Check de {{mbo}} | {{politieopleiding}}',
            'cta_text' : 'word agent',
            'copy_footer': 'ALLES WAT JE IN JE HEBT | MAAK ER POLITIEWERK VAN',
            'clickTAG' : 'https://kombijde.politie.nl/',
            'asset_agenten': '13_celine.png',
            'asset_achtergrond' : "Default.png",
            'achtergrond_positie_300x250' : 'bottom left',
            'achtergrond_positie_300x600' : 'bottom left',
            'achtergrond_positie_970x250' : 'top right'
        }
    ];

    insertCustomerName(".customer", "Politie");
    showBannerAndNav('.container');

    //todo make this class right
    let b300x250 = new B300x250("300x250", demoData);
    let b250x250 = new B250x250("250x250", demoData);

    b300x250.color('hotpink');


    b250x250.bannerStart();
    b250x250.color();
}

