// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}
// Read the file and print its contents.
var fs = require('fs')
, filename = process.argv[2];


data = fs.readFileSync( filename, 'utf8');
console.log('OK: ' + filename);
const lines = data.split(/\r?\n/).filter(line => line.length > 0);

const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 300 // ms 
    });
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let counter=0; counter < 3; counter++){
        let id = lines[counter]
        await page.goto('https://stars.bilkent.edu.tr/evalreport/index.php?mode=ins&insId='+id);
        const hrefs = await page.$$eval('tr > td > a', links => links.map(a => a.href));
        var semCode;
        loop2: 
        for(let i in hrefs){

            var regex = /semCode=[0-9][0-9]*/;
            let found = hrefs[i].match(regex)
            if (found){
                semCode = found[0].split("=")[1]
                console.log(semCode);
                    if (semCode > 20151){
                    let temp_page = await browser.newPage()
                    await temp_page.goto(hrefs[i])
                    await temp_page.close()
                } 
                else {
                    break loop2;
                }
            } 
            else {
                break loop2;
            }
            
        }
    }

    // var notExist = await page.evaluate(() => document.getElementsByClassName('fieldsetsII').length)
    // await delay(Math.floor(Math.random() * 50) + 250);
    // await delay(60*1000); //wait for one minute!
    
    await browser.close()
  })();