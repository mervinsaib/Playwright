import {expect, test} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'

test.beforeEach(async({page}) => {
    await page.goto('/')
    // await page.getByTitle('Forms').click()
    // await page.getByTitle('Form Layouts').click()
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()

})



test('Locator syntax rules', async({page}) => {
    //by Tag name
    page.locator('input')

    //by ID
    page.locator('#inputEmail1')

    //by Class value
    page.locator('.shape-rectangle')

    //by Class value (full)
    page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition"')

    //by attribute
    page.locator('[placeholder="Email"]')

    //combine different selectors (by Tag and attribute and Class value and 2nd attribute and ID)
    page.locator('input[placeholder="Email"].shape-rectangle[nbinput]#inputEmail1')

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')            

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')


})

test('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('SignIn').click()
    await page.getByTitle('IoT Dashboard').click()
    
})

//Locating child elements
test('Locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    
    // by Index. Try to avoid this method
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

//Locating Parent elements
test('Locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

    //Xpath like
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

//Reuse the locators
test('Reusing the locators', async ({page}) => {
    
    const basicform = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailInputField = basicform.getByRole('textbox', {name: "Email"})

    await emailInputField.fill('test@test.com')
    await basicform.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicform.locator('nb-checkbox').click()
    await basicform.getByRole('button').click()

    //Assertion emailInputField
    await expect(emailInputField).toHaveValue('test@test.com')
})

//Extracting values
test('Extracting values', async ({page}) => {
    //assertion single text value
    const buttonSubmitBasicForm = page.locator('button[type="submit"].status-danger')
    const buttonSubmitBasicFormText = await buttonSubmitBasicForm.textContent()
    expect(buttonSubmitBasicFormText).toEqual('Submit')

    //assertion all text value
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //assertion input value
    const inputEmailBasicForm = page.locator('input#exampleInputEmail1')
        //fill text
    await inputEmailBasicForm.fill('test@test.com')
        //assertion input value
    const inputEmailBasicFormFilledValue = await inputEmailBasicForm.inputValue()
    expect(inputEmailBasicFormFilledValue).toEqual("test@test.com")

    //assertion attribute value
        //create constant attribute value
    const inputEmailBasicFormAttrubuteValue = await inputEmailBasicForm.getAttribute('placeholder')
        //validate constant
    expect(inputEmailBasicFormAttrubuteValue).toEqual("Email")
})


//Assertions
test('Assertions', async({page}) => {
    const buttonSubmitBasicForm = page.locator('button[type="submit"].status-danger')
    
    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await buttonSubmitBasicForm.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion will stop after a fail
    await expect(buttonSubmitBasicForm).toHaveText('Submitzzz')
    await buttonSubmitBasicForm.click()

    //Soft assertion will continue after a fail
    await expect.soft(buttonSubmitBasicForm).toHaveText("Submitttt")
    await buttonSubmitBasicForm.click()
})



