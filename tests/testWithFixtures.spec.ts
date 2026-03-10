import {test} from '../test-options'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'
import {faker} from '@faker-js/faker'

test('parametized methods', async({page}) => {
    //const pm = new PageManager(page)
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatepickerPage = new DatepickerPage(page)

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

    //await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welkom01', 'Option 2')
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
})

