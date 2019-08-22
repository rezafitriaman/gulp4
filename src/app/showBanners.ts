export function showBannerAndNav(divName:string) {

    const elements = document && document.querySelectorAll(divName);
    elements.forEach((elm) => {
        if(elm.querySelector('.present') != null) {

            let target = '.s' + elm.id.split('-')[1];
            let rect = elm.className.split(' ').indexOf('rect');
            let sky = elm.className.split(' ').indexOf('sky');
            let lead = elm.className.split(' ').indexOf('leadb');

            //show devider
            if(elm.parentNode.querySelectorAll('.thick').length > 0) (<HTMLElement>elm.parentNode.querySelectorAll('.thick')[0].parentNode.parentNode.parentNode).classList.remove('empty');
            //container section
            elm.classList.remove('empty');
            //nav section
            //li
            if(rect > 0) document.querySelector('.rect').classList.remove('empty');

            if(sky > 0) document.querySelector('.sky').classList.remove('empty');

            if(lead > 0) document.querySelector('.leadb').classList.remove('empty');
            //a
            document.querySelector(target).classList.remove('empty');
        }
    });
}