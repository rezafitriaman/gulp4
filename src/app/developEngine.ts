let fs = require('fs');
/*
------------------------------
APPEND TEMPLATE FILE
append html template to html index
------------------------------
*/

fs.readdir('./dist/templates/html/', 'utf8', (err:any, files:any) => {
    if(err) throw err;
    //loop through the templates files-names
    for (let i = 0; i < files.length; i++) {
        //read the content of the tempates file-names
        let templateString = fs.readFileSync('./dist/templates/html/' + files[i]).toString();
        let regex = new RegExp("<!-- banner-" + files[i].split('.html')[0] + " -->", "g");
        //if i is zero then read index file from src-map otherwise read it from dist-map
        if(i > 0) {
            let indexSrc = fs.readFileSync('./dist/app/index.html','utf8').toString();
            let newIndexSrc = indexSrc.replace(regex, templateString);
            //write index-file to dist map
            fs.writeFileSync('./dist/app/index.html', newIndexSrc, 'utf8');
            console.log(`${files[i]} has been saved`)
        }else {
            let indexSrc = fs.readFileSync('./src/app/index.html','utf8').toString();
            let newIndexSrc = indexSrc.replace(regex, templateString);
            //write index-file to dist map
            fs.writeFileSync('./dist/app/index.html', newIndexSrc, 'utf8');
            console.log(`${files[i]} has been saved`)
        }
    }
});