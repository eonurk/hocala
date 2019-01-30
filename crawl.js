var fs = require('fs')
var logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})
const puppeteer = require('puppeteer');

function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  var id = 1;
  var counter = 0;
  for (var k = 1 ; k<12 && counter < 200; k++){
      for (var id = k*1000; id < (k+1)*1000 && counter < 200; id++) {  
        await page.goto('https://stars.bilkent.edu.tr/evalreport/index.php?mode=ins&insId='+id)
        var notExist = await page.evaluate(() => document.getElementsByClassName('fieldsetsII').length)
        await delay(Math.floor(Math.random() * 50) + 250);
        if (notExist == 1){
            counter = counter + 1;
        } else {
            counter = 0;
            console.log("instructer id:" + id)
            logger.write(id.toString()+"\n")
        }
      }
    await delay(60*1000); //wait for one minute!
  }
  logger.end()
  await browser.close()
})()