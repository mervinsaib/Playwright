import {expect, test} from '@playwright/test';


test('Input fields', async({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByTitle('Forms').click()
    await page.getByTitle('Form Layouts').click()
    const usingTheGridEmailInput = page.locator('#inputEmail1')
    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com')
    })