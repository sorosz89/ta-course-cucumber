require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');

let driver;

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

    const cookieButton = driver.findElement(By.css('.cookie-disclaimer button'));
    try {
        const isVisible = await cookieButton.isDisplayed();
        if (isVisible) {
            await cookieButton.click();
        }
    } catch (e) {
        // NOOP
    }
});

When(/^the (Location|Skills) filter box is clicked$/, (box) => {
    switch (box) {
        case "Location":
            return driver.findElement(By.css('.recruiting-search__location')).click();
        default:
            return driver.findElement(By.css('.job-search__departments')).click();
    }
});

When(/^the (country|city|role) "([^"]*)" is selected$/, async (type, value) => {
    switch (type) {
        case "country":
            const countryLocator = By.xpath('//strong[contains(@class, "results__group")][.="' + value + '"]');
            if (!await driver.isElementVisible(countryLocator)) {
                throw new Error("Country not found: " + value);
            }
            const $country = driver.findElement(countryLocator);
            const $container = $country.findElement(By.xpath('..'));
            const classes = await $container.getAttribute('class');
            if (!classes.indexOf('dropdown-cities')) {
                await $country.click();
            }
            break;
        case "city":
            console.log("Ez a city")
            const cityLocator = By.xpath('//li[.="' + value + '"]');
            if (!await driver.isElementVisible(cityLocator)) {
                throw new Error("City not found: " + value);
            }
            return driver.findElement(cityLocator).click();
        case "role":
            console.log("Ez a role", value);
            //const roleLocator = By.xpath('//label/input[@data-value="' + value + '"]');
            const roleLocator = By.xpath('//label[./input[@data-value="' + value + '"]]');
            await driver.wait(until.elementIsVisible(roleLocator));
            /*if (!await driver.isElementVisible(roleLocator)) {
                throw new Error("Skill not found: " + value);
            }*/
            return driver.findElement(roleLocator).click();
    }
});

When('the Find button is clicked', async () => {
    await driver.findElement(By.css('.recruiting-search__submit'))
    await driver.wait(until.elementLocated(By.css('.search-result__heading')))
});




/*require('chromedriver');
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
//   //li[@aria-label="Hungary"]
When(/^the (country|city|role) "([^"]*)" is selected$/, async (type, value) => {
    switch (type) {
        case "country":
            const countryLocator = By.xpath('//strong[contains(@class, "results__group")][.="' + value + '"]');
            if (!await driver.isElementVisible(countryLocator)) {
                throw new Error("There is no such country: " + value);
            }
            const $country = driver.findElement(countryLocator);
            const $container = $country.findElement(By.xpath('..'));
            const classes = await $container.getAttribute('class');
            if (!classes.indexOf('dropdown-cities')) {
                await $country.click();
            }
            break;
        case "city":
            const cityLocator = By.xpath('//li[.="' + value + '"]');
            if (!await driver.isElementVisible(cityLocator)) {
                throw new Error("There is no such city: " + value);
            }
            return driver.findElement(cityLocator).click();
        case "role":
            const roleLocator = By.xpath('//label[./input[@data-value="' + value + '"]]');
            if (!await driver.isElementVisible(roleLocator)) {
                throw new Error("There is no such role/skills: " + value);
            }
            return driver.findElement(roleLocator).click();
    }
});





When(/^the (country|city|role) "([^"]*)" is selected$/), async (type, value) => {
    switch (type) {
        case "country":
            const countryLocator = By.xpath('li[@aria-label="' + value + '"]');
            if (!await driver.isElementVisible(countryLocator)) {
                throw new Error("Country not found:" + value);
            }
            const $country = driver.findElement(countryLocator);
            const $container = $country.findElement(By.xpath('..'));
            const classes = await $container.getAttribute('class');
            if (!classes.indexOf('dropdown-cities')) {
                await $country.click()
            }
            break;
        case "city":
            const cityLocator = By.xpath('//ul//li[text()[contains(.,"' + value + '")]]');
            if (!await driver.findElement(cityLocator)) {
                throw new Error('City not found:' + cityLocator);
            }
            return driver.findElement(cityLocator).click();
            break;
        case "role":
            const skillLocator = by.xpath('//span[text()[contains(.,"' + value + '")]]');
            if (!await driver.findElement(skillLocator)) {
                throw new Error('Skill not found' + skillLocator)
            }
            return driver.findElement(skillLocator).click();
            break;
    }
}
*/