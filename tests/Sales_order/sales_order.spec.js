import {test,expect} from '@playwright/test'
import logindata from '../../testdata/JSON_Data/loginData.json'
import { log } from 'node:console'

test('create Trouble_Tickets',async({page})=>{
    // test.setTimeout(50000)
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

    await page.locator('img[src="themes/softed/images/menuDnArrow.gif"]').hover()
    await page.locator('a[name="Sales Order"]').click()
    await page.getByRole('img',{name:'Create Sales Order...'}).click()
    await page.locator('input[name="subject"]').fill('Sales_Orders')

    //! organisation window
    let [newtab]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator('(//img[@src="themes/softed/images/select.gif"])[4]').click()
    ])
    await newtab.locator('a[id="1"]').click()

    await page.locator('textarea[name="bill_street"]').fill('Qspiders Hyderabad')
    await page.locator('textarea[name="ship_street"]').fill('Qspiders Hyderabad')
    
    //! item window
    let [item_tab]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator('img[id="searchIcon1"]').click()
    ])
    await item_tab.locator('a[id="popup_product_19"]').click()
    
    await page.locator('input[name="qty1"]').fill('2')
    await page.locator('input[id="listPrice1"]').fill('1000')
    await page.getByRole('link',{name:'Discount'}).first().click()
    await page.locator('(//input[@name="discount1"])[2]').click()
    await page.locator('input[id="discount_percentage1"]').fill('20')
    await page.locator('input[name="shipping_handling_charge"]').fill('40')
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

    let subject_name=await page.locator('span[class="lvtHeaderText"]').textContent()

    // ! validateing
    // if(subject_name?.includes('Sales_Orders')){
    //     console.log('sales_orde was created');
    // }else{
    //     console.log('sales_orde was not created');
        
    // }
    // ! Validateing by using Assertions.
    await expect(page.locator('span[class="lvtHeaderText"]')).toContainText('Sales')
})

