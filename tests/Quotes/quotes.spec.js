import {test,expect} from '@playwright/test'
import logindat from '../../testdata/JSON_Data/loginData.json'


test('create Email',async({page})=>{
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindat.username)
    await page.locator('input[name="user_password"]').fill(logindat.password)
    await page.getByRole('button',{name:'Login'}).click()

    
    await page.locator('img[src="themes/softed/images/menuDnArrow.gif"]').hover()
    await page.locator('a[name="Quotes"]').click()
    await page.getByRole('img',{name:'Create Quote...'}).click()
    await page.locator('input[name="subject"]').fill('Quote_subject')
    await page.locator('input[name="validtill"]').fill('2027-01-01')

    // ! selecting oppotunity name.
    let [newtab]=await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('img',{name:'Select'}).first().click()
    ])
    await newtab.locator('a[id="1"]').click()

    // ! selecting contact name.
    let [window_tab]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator('(//img[@title="Select"])[2]').click()
    ])
    await window_tab.locator('a[id="3"]').click()
    await page.locator('(//input[@name="cpy"])[1]').click()
    await page.locator('textarea[name="bill_street"]').fill('Jspiders Hyderabad')
    await page.locator('textarea[name="ship_street"]').fill('Jspiders Hyderabad')
    
// ! Product window.
    let [product_window]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator('img[id="searchIcon1"]').click()
    ])
    await product_window.locator('a[id="popup_product_18"]').click()
    await page.locator('textarea[name="comment1"]').fill('Electronic Device')
    await page.locator('input[id="qty1"]').fill('1')
    await page.locator('input[id="listPrice1"]').fill('500')
    await page.getByRole('link',{name:'Discount'}).first().click()
    await page.locator('(//input[@name="discount1"])[2]').click()
    await page.locator('input[name="discount_percentage1"]').fill('20')
    await page.locator('input[id="shipping_handling_charge"]').fill('40')

    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

    let quote_name= await page.locator('span[class="lvtHeaderText"]').textContent()
    console.log(quote_name);
    

    // ! validateing
    // if(quote_name?.includes('Quote_subject')){
    //     console.log('Quote is created');
    // }else{
    //     console.log('Quot is not created');
    // }
    // ! Validateing by using Assertions.
    await expect(page.locator('span[class="lvtHeaderText"]')).toBeVisible()


})