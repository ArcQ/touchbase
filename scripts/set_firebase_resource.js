const puppeteer = require("puppeteer");

async function main() {
  const projectId = process.argv[2];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto(
    `https://console.firebase.google.com/u/0/project/listing-sea/settings/general`,
    page.waitForSelector("#UserName")
  ); // wait until page load
  await page.type("#UserName", "elaw26");
  await page.type("#Password", "edal0418");
  // click and wait for navigation
  await Promise.all([
    await page.click("#LoginButton"),
    page.waitForSelector(
      "#ctl00_ContentPlaceHolder1_StartDatePicker_Top td.availableDay.availableDate"
    )
  ]);
  await page.click(
    "#ctl00_ContentPlaceHolder1_StartDatePicker_Top td.availableDay.availableDate"
  );

  await page.waitForTimeout(1000);

  let available = false;

  await page.evaluate(() => {
    const timePrefs = [
      ["11:00 AM", "11:45 AM"],
      ["12:00 PM", "12:45 PM"],
      ["1:00 PM", "1:45 PM"],
      ["9:00 AM", "9:45 AM"]
    ];
    timePrefs.forEach(timePref => {
      if (
        //check if time is even avaiable in priorirty
        [
          ...document.querySelectorAll(
            "#ctl00_ContentPlaceHolder1_AvailabileTimeSlotsList td"
          )
        ]
          .map(v => v.innerText)
          .filter(v => v == `${timePref[0]} - ${timePref[1]}`).length > 0
      ) {
        available = true;
        document.querySelector(
          "#ctl00_ContentPlaceHolder1_StartTimePicker_dateInput"
        ).value = timePref[0];
        document.querySelector(
          "#ctl00_ContentPlaceHolder1_EndTimePicker_dateInput"
        ).value = timePref[1];
        document.querySelector(
          "#ctl00_ContentPlaceHolder1_liabilityWaiverAgreeCheckbox"
        ).checked = true;
      }
    });
  });

  if (available) {
    // await Promise.all([
    //   await page.click("#ctl00_ContentPlaceHolder1_FooterSaveButton").click(),
    //   page.waitForNavigation({ waitUntil: "networkidle0" })
    // ]);
  } else {
    console.log("nothing available");
  }
}
