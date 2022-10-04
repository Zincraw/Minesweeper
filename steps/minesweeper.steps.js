const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = 'https://zincraw.github.io/Calculator/Index.html';

async function getValue(buttonId) {
	await page.click(`[data-testid="${buttonId}"]`, { force: true });
}

Given('a user opens the app', async () => {
	await page.goto(url);
});

Then('the reset button shows the value: {string}', async (string) => {
	const resetButton = await page.locator('data-testid=resetButton');
	await expect(resetButton).toHaveAttribute(string);
});

