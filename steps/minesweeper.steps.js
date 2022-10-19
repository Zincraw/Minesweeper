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
	await expect(flagCounter).toHaveText(string);
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

When('the user click the reset button', async function () {
	const resetButton = await page.locator(`data-testid=resetButton`);
	await resetButton.click({ button : 'left'});
});

Then('the game status is lose',async function () {
	let attributeType = await page.locator('data-testid=faceImage').getAttribute('src'); 
	expect(attributeType).toBe("./numbers/sad-face.png");
});

Then('the game status is win',async function () {
	let attributeType = await page.locator('data-testid=faceImage').getAttribute('src'); 
	expect(attributeType).toBe("./numbers/happy-face.png");
  });

Then('the cell: {string} shows a {string}', async function (cell, status) {
	let cellCheck = await page.locator('data-testid=' + cell);
	let classCheck = await cellCheck.getAttribute("class");
	expect(classCheck).toBe(status);
  });

Given('the game status is over', async () => {
	await page.goto(`127.0.0.1:5500/?mockData=xo-oo`);
	await getValue("1-1");
});

Then('all the cells are disabled', async function () {
	await getValue("1-2");
	let sampleCell = page.locator(`[data-testid="1-2"]`);
	let classCheck = await sampleCell.getAttribute("class");
	expect(classCheck).toBe("hidden");
});

Given('the game status is victory', async () => {
	await page.goto(`127.0.0.1:5500/?mockData=xo-ox`);
	await getValue("1-2");
	await getValue("2-1");
});

Then(`all the non mines cells aren't {string}`, async function(string){0
	let allCells = await page.locator("#board").locator("div");
	await expect(allCells.nth(0)).toHaveAttribute("class","hidden");
	await expect(allCells.nth(1)).toHaveAttribute("class","mineNear2");
	await expect(allCells.nth(2)).toHaveAttribute("class","mineNear2");
	await expect(allCells.nth(3)).toHaveAttribute("class","hidden");
})

Then('the cell placed at: {string} should show the next value: {string}',async function (cellPlace, number) {
	let attributeType = await page.locator(`data-testid=${cellPlace}`).getAttribute('class'); 
	expect(attributeType).toBe("mineNear"+number);
});

Then('the layout should look like {string}', async function (displayResult) {

	let displaySplitted = displayResult.split("-");

	for (let i = 0; i < displaySplitted.length; i++){ 
		let characters = displaySplitted[i].split("");
 
		for (let j = 0; j < displaySplitted[i].length; j++){
			let cell = await page.locator(`data-testid="${i}-${j}"`)
			let cellClassCheck = await cell.getAttribute("class");
			if(characters[j] == "o"){
				expect(cellClassCheck).toBe("empty");
			} else if(characters[j] == "."){
				expect(cellClassCheck).toBe("hidden");
			} else if(characters[j] == "1"){
				expect(cellClassCheck).toBe("mineNear1");
			} else if (characters[j] == "!"){
				expect(cellClassCheck).toBe("flag");
			}
		}
	}
});

When('the user tags the cell: {string}', async (cell) => {
    const cellLocator = await page.locator(`data-testid=${cell}`);
	await cellLocator.click({ button : 'right'});
});

Then('the flag counter should have the following values {string}', async function (display) {
	let flagCounter = await page.locator(`data-testid=flagCounter`);
	expect(await flagCounter.innerText()).toContain(display);
});

When('the user left click the cell {string}', async (cell) =>{
	const cellLocator = await page.locator(`data-testid=${cell}`);
	await cellLocator.click({ button : 'left'});
}) 

When('the user right click the cell {string}', async (cell) =>{
	const cellLocator = await page.locator(`data-testid=${cell}`);
	await cellLocator.click({ button : 'right'});
}) 

Then('the cell {string} should be unleashed', async function (cell) { 
	const cellLocator = await page.locator(`data-testid=${cell}`);
	let classCheck = await cellLocator.getAttribute("class");
	expect(classCheck).not.toContain("hidden");
});

Then('a flag should be tagged in cell {string}', async function (cell) { 
	const cellLocator = await page.locator(`data-testid=${cell}`);
	let classCheck = await cellLocator.getAttribute("class");
	expect(classCheck).toContain("flag");
});


