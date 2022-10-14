const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = 'http://127.0.0.1:5500';

async function getValue(divId) {
	await page.click(`[data-testid="${divId}"]`, { force: true });
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
	await expect(timeCounter).toHaveText("Timer "+string);
});

Then('the flag count shows the value {string}', async (string) => {
	const flagCounter = await page.locator('data-testid=flagCounter');
	await expect(flagCounter).toHaveText("Flags "+string);
});

Then('all the cells show the value {string}', async (string) => {
	let cells = await page.locator('#board div');
	let count = await cells.count();
	for(let i = 0; i < count; i++){
		let cell = await cells.nth(i);
		let cellClass = await cell.getAttribute('class');
		expect(cellClass).toBe(string);
	}
});

Given('the user load the next layout: {string}', async (mockData) => {
	await page.goto(`127.0.0.1:5500/?mockData=${mockData}`);
});

When('the user unleash the cell: {string}', async (cell) => {
    await getValue(cell);
});

Then('the game status is {string}',async function (string) {
	let attributeType = await page.locator('data-testid=faceImage').getAttribute('src'); 
	expect(attributeType).toBe("./numbers/sad-face.png");
  });

  Then('the cell: {string} shows a {string}', async function (cell, status) {
	let cellCheck = await page.locator('data-testid=' + cell);
	let classCheck = await cellCheck.getAttribute("class");
	expect(classCheck).toBe(status);
  });






