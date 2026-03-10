import {expect, test} from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('/')
})

//Testsuite 'Form layouts page'
test.describe('Form layouts page', () => {
    test.describe.configure({retries: 0})
    test.beforeEach( async({page}) => {
        await page.getByTitle('Forms').click()
        await page.getByTitle('Form Layouts').click()
    })

    test('Input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('#inputEmail1')
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com')
        
        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test.only('Radio buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        // twee opties: getByLabel en getByRole
        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        //await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})

        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        
        //visual assertion test
        await expect(usingTheGridForm).toHaveScreenshot()
        
        
        
        // expect(radioStatus).toBeTruthy()
        // await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()


        // twee opties: getByLabel en getByRole
        // await usingTheGridForm.getByLabel('Option 2').check({force: true})
        // //await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})

        // expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
        // expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
    })
    
})

//Testsuite 'Toastr page'
test.describe('Toastr page', () => {
    test.beforeEach(async({page}) => {
        await page.getByTitle('Modal & Overlays').click()
        await page.getByTitle('Toastr').click()

    })


test('Checkboxes', async({page}) => {
        await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true})
        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
        await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})
        await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).uncheck({force: true})

        //Select en Unselect all checkboxes
        const allBoxes = page.getByRole('checkbox')
        for(const box of await allBoxes.all()) {
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy()
            
            await box.uncheck({force: true})
            expect(await box.isChecked()).toBeFalsy()
        }
    })
})


test('Lists and Dropdows', async({page}) => {
    const dropDonwMenu = page.locator('ngx-header nb-select')
    await dropDonwMenu.click()

    page.getByRole('list') //when the list ha a UL tag
    page.getByRole('listitem') // when the list has LI tag

    //const optionList = page.getByRole('list').locator('nb-option')
    //paren-child syntax is duidelijker
    const optionList = page.locator('nb-option-list nb-option')

    //De lijst items array
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

    //klik op een item uit de lijst
    await optionList.filter({hasText: "Cosmic"}).click()

    //assertion locator op rgb kleur
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

})

test('Tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('Dialog box', async ({page}) =>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //Tabel regel Een
    const tableRowEen = page.getByRole('table').locator('tbody tr').first()
    //Tabel regel Een Prullenbak
    const tableRowEenTrashcan = tableRowEen.locator('.nb-trash')

    //Klik tabel regel Een
    await tableRowEen.click()
    
    //Assertion tabel regel een bevat text
    expect(tableRowEen).toContainText("mdo@gmail.com")

    //In tabel klik op regel Een Prullenbak
    await tableRowEenTrashcan.click()
    

    //Maak een listener en accepteer 
    page.on('dialog', dialog => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?")
    dialog.accept()
    })

    //Klik tabel regel Een
    await tableRowEen.click()
    
    //Assertion tabel regel een bevat text
    await expect(tableRowEen).not.toHaveText("mdo@gmail.com")
})

test('Web Tables', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //1. Get the row by any text in this row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    //2. Get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('Test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('Test@test.com')

    //3. Test filter of the table
    const ages = ["20", "30", "40", "200"]

    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')
        
        for(let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if(age == "200"){
                expect(await page.getByRole('table').textContent()).toContain("No data found")
            } else {
                expect(cellValue).toEqual(age)

            }
        }
    }
})

test('Datepicker Part 1', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    
    const calendarInputField = page.locator('ngx-datepicker').getByPlaceholder("Form Picker")
    await calendarInputField.click()
    const formPickerChevronRight = page.locator('[data-name="chevron-right"]')

    //Pick date Tomorrow - Javascript
    let date = new Date()
    date.setDate(date.getDate() + 7)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
        await formPickerChevronRight.click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)
})
    
test('Sliders', async({page}) =>{
    //Update attribute
    const temperatureGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await temperatureGauge.evaluate( node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await temperatureGauge.click()

    //Actual Mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    
    //Scroll locator into view
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)

    //Klik linkermuisknop
    await page.mouse.down()
    await page.mouse.move(x +100, y)
    await page.mouse.move(x+100, y+100)
    //Release linkermuisknop
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})




