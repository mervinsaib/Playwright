import {test as base} from '@playwright/test'

export type TestOptions = {
    globalsQaURL: string
    formLayoutsPage: string
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}],

    formLayoutsPage: [async({page}, use) => {
        await page.goto('http://localhost:4200/')
        //await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    }, {auto: true}]
})