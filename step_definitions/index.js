require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');

let driver;
//driver.sleep(9000)
setDefaultTimeout(30e3);

BeforeAll(async () => {
    driver = new Builder().forBrowser('chrome').build();
    driver.isElementVisible = async locator => {
        try {
            await driver.findElement(locator);
        } catch (e) {
            return false;
        }
        try {
            return await driver.findElement(locator).isDisplayed();
        } catch (e) {
            return false;
        }
    };
    await driver.manage().window().maximize();
});

AfterAll(() => driver.quit());

Given('the EPAM career page is opened', async () => {
    await driver.get("https://www.epam.com/careers");

    const cookieButton = driver.findElement(By.css('.cookie-disclaimer_button'));

    try {
        const isVisible = await cookieButton.isDisplayed();
        if (isVisible) {
            await cookieButton.click();
        }
    }
    catch (e) {

    }

})

When(/^the (Location|Skills) filter box is clicked$/, (box) => {
    switch (box) {
        case "Location":
            return driver.findElement(By.css('.recruiting-search__location')).click();
        case "Skills":
            return driver.findElement(By.css('.job-search__departments')).click();

    }
})







/*
When(/^the (country|city|Skills) "([^"]*)" is selected$/), async (type, value) => {
    switch (type){
        case "country":

        case "city":

        case "Skills":
    }
}
*/