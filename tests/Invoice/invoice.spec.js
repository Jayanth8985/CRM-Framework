import {test,expect} from '@playwright/test'
import logindata from '../../testdata/JSON_Data/loginData.json'


test('create Trouble_Tickets',async({page})=>{
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

    await page.locator('//img[@src="themes/softed/images/menuDnArrow.gif"]').hover()
    await page.locator('a[name="Invoice"]').click()
    await page.getByRole('link',{name:'Create Invoice...'}).click()
    await page.locator('input[name="subject"]').fill('Product_invoice')
    await page.locator('(//img[@title="Select"])[3]').click()

    let [newtab]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator('(//img[@title="Select"])[3]').click()
    ])
    await newtab.locator('a[id="1"]').click()

    await page.locator('textarea[name="bill_street"]').fill("Jayanth's pg")
    await page.locator('textarea[name="ship_street"]').fill("Jayanth's pg")
    

    let [item_tab]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator('img[id="searchIcon1"]').click()
    ])
    await item_tab.locator('a[id="popup_product_19"]').click()
    await page.locator('input[name="qty1"]').fill('1')
    
    

    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

    let invoice_name=await page.locator('span[class="lvtHeaderText"]').textContent()

    //! validateing
    // if(invoice_name?.includes('Product_invoice')){
    //     console.log('Invoice is created');
    // }else{
    //     console.log('Invoice is not created');
        
    // }

    // ! Validateing by using Assertions.
    let header=await page.locator('span[class="lvtHeaderText"]')
    await expect(header).toBeVisible()
    await expect(header).toContainText('Product')

})