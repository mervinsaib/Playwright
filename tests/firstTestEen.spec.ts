import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByTitle('Forms').click()
})

test('the first test', async ({page}) => {
    await page.getByTitle('Form Layouts').click()
})

test('navigate to datepicker page', async ({page}) => {
    await page.getByTitle('Datepicker').click()
})