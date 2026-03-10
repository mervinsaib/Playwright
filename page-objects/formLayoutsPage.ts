import { Locator, Page } from "@playwright/test";

export class FormLayoutsPage{

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * This method will fill out the fields for login
     * @param email - valid email
     * @param password - password
     * @param optionText - which radio button
     */
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * This method will fill out the Inline form with user details
     * @param name - first and last name
     * @param email - valid email
     * @param rememberMe - true or false
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()

    }
}