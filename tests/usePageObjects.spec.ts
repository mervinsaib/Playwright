import {expect, test} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'
import {faker} from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    //await page.goto('/')

})

test('Navigate to form page @smoke', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('parametized methods @smoke @regression', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatepickerPage = new DatepickerPage(page)

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welkom01', 'Option 2')

    //screenshot
    //await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    
    //save screenshot as binary for sending to other systems
    // const buffer = await page.screenshot()
    // console.log(buffer.toString('base64'))


    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)

    //screenshot van een locator
    // await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})
    // await page.waitForTimeout(10000)
    // await navigateTo.datepickerPage()
    // await onDatepickerPage.selectCommonDatePickerDateFromToday(2)
    // await onDatepickerPage.selectDatepickerWithRangeFromToday(7, 8)  
})

test.only('Testing with Argos CI', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
})
