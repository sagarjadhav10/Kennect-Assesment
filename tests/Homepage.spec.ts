import { test,expect, chromium} from '@playwright/test'
import { Console } from 'console';

let browser;
let context;
let page;

test.beforeAll(async () => {

    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://gor-pathology.web.app/');
    await page.locator('input[name="email"]').fill('test@kennect.io');
    await page.locator('input[name="password"]').fill('Qwerty@1234');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    
})

test("Verify Todos Present", async () => {

    await page.waitForSelector("//li[@class = 'MuiListItem-container']", {timeout : 6000});

    const todos = await page.$$("//li[@class = 'MuiListItem-container']");
    
    expect(todos.length).toBeGreaterThan(1);
    
})

test("Verify Cost Calculator Discounts", async () => {

    await page.locator("//div[@aria-haspopup= 'listbox']").click();

    const discounts = await page.$$("//li[@role= 'option']");

    expect(discounts.length).toBeGreaterThan(1);

})

test("Verify End to End Test to Add Patient and Tests",async () => {
    
    await page.getByRole('button', { name: 'dashboard Patients' }).click();
    await page.getByRole('button', { name: 'Add Patient add' }).click();
    await page.locator('input[name="name"]').fill('Bruce');
    await page.locator('input[name="email"]').fill('bruce@wayne.com');
    await page.getByRole('spinbutton').fill('99922255588');
    await page.getByRole('button', { name: 'General Details add' }).click();
    await page.getByRole('spinbutton').fill('9992225558');
    await page.getByRole('button', { name: 'General Details add' }).click();
    
    await page.locator('input[name="height"]').fill('160');
    await page.locator('input[name="weight"]').fill('60');
    await page.getByLabel('', { exact: true }).click();
    await page.getByRole('option', { name: 'Male', exact: true }).click();
    await page.locator('input[name="age"]').fill('30');
    await page.locator('input[name="systolic"]').fill('175');
    await page.locator('input[name="diastolic"]').fill('50');
    await page.getByRole('button', { name: 'Add Tests add' }).click();

    await page.getByRole('textbox', { name: 'Add tests for patient' }).click();
    await page.getByRole('option', { name: 'VITAMIN B12, SERUM 900₹' }).getByRole('checkbox').click();
    await page.locator("//label[text() = 'Discount']/following-sibling::div/div").click();
    await page.getByRole('option', { name: '10%' }).click();

    await page.locator('#patient-tests-labs').click();
    await page.getByRole('option', { name: 'HEALTHCARE PATHOLOGY (Sion' }).getByRole('checkbox').click();

    await page.locator("//input[@name='doctor_name']").click();
    await page.getByRole('option', { name: 'kiran' }).click();

    await page.locator("//div[contains(@aria-labelledby, 'doctor')]").click();
    await page.getByRole('option', { name: '10%' }).click();

    await page.locator("//span[text()='add_box']").click();
    await page.locator("//span[text()='add_box']").click();
    await page.getByLabel('Eqipment Name').click();
    await page.getByRole('option', { name: 'test' }).click();
    await page.getByRole('button').filter({ hasText: 'check' }).click();
    await page.getByRole('button', { name: 'Add Patient add' }).click();

    await expect(page.locator("//div[contains(text(),'Patient added')]")).toBeVisible({timeout: 10000});

    await page.goto('https://gor-pathology.web.app/patients');
    await page.locator("[placeholder='Search']").fill('Bruce');
    await expect(page.getByRole('cell', { name: 'Bruce' })).toBeVisible();


});



