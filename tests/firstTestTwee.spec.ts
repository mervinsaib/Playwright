import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('/')

})

test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
    await page.getByTitle('Forms').click()
})

test('the first test', async ({page}) => {
    await page.getByTitle('Form Layouts').click()
})

test('navigate to datepicker page', async ({page}) => {
    await page.getByTitle('Datepicker').click()
})

})

test.describe('suite2', () => {
    test.beforeEach(async({page}) => {
    await page.getByTitle('Extra Components').click()
})

test('navigate to Calendar', async ({page}) => {
    await page.getByTitle('Calendar').click()
})

})