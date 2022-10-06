const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = 'http://127.0.0.1:5500';

async function getValue(buttonId) {
	await page.click(`[data-testid="${buttonId}"]`, { force: true });
}

Given('the user open the app', async () => {
	await page.goto(url);
});

Then('the reset button shows the value {string}', async (string) => {
	const resetButton = await page.locator('data-testid=resetButton');
	expect(await resetButton.getAttribute("class")).toContain(string);
});

Then('the timer count shows the value {string}', async (string) => {
	const timeCounter = await page.locator('data-testid=timeCounter');
	expect(timeCounter).toHaveValue(string);
});