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
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    for (let counter=0; counter < 1; counter++){
        let id = lines[counter]
        await page.goto('https://stars.bilkent.edu.tr/evalreport/index.php?mode=ins&insId='+id);
        
        let evalNum = 0;
        
        let asd = await page.$$eval( 'a', a => a[evalNum].href).catch((...args) => console.log(...args))
        console.log(asd)
        // for (evalNum = 0; evalNum < 5; evalNum++){
        //     let asd = await page.$$eval( 'a', a => a[evalNum].href)
        //     console.log(asd)
        // }
        
    }

    // var notExist = await page.evaluate(() => document.getElementsByClassName('fieldsetsII').length)
    // await delay(Math.floor(Math.random() * 50) + 250);
    // await delay(60*1000); //wait for one minute!
    
    await browser.close()
  })()