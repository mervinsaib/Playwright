import {expect, test} from '@playwright/test'
//TEST GIT

test.beforeEach(async({page}, testInfo) => {
    //await page.goto('http://uitestingplayground.com/ajax')
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)

})

test('Auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()
    
    const text = await successButton.textContent()
    await successButton.waitFor({state: "attached"})
    
    //const text2 = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

    // timeout aanpassen voor deze specifieke await
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 30000})

})

test.skip('Alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')
    
    //___ wait for element
    await page.waitForSelector('.bg-success')
    
    //--- wait for particular respons
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    
    //--- wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    //--- wait for hardcoded miliseconds
    await page.waitForTimeout(500)

    


    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test.skip('Timeouts', async({page}) => {
    test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()

})