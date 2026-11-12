import {test,expect} from '@playwright/test'
import { log } from 'node:console'
import { TIMEOUT } from 'node:dns'


test('create contacts',async({page})=>{
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill('admin')
    await page.locator('input[name="user_password"]').fill('admin')
    await page.getByRole('button',{name:'Login'}).click()



    await page.getByRole('link',{name:'CONTACTS'}).click()
    await page.getByRole('link',{name:'Create Contact...'}).click()
    await page.locator('select[name="salutationtype"]').selectOption('Mr.')
    await page.locator('input[name="firstname"]').fill('Jayanth')
    await page.locator('input[name="lastname"]').fill('Sanapathi1')
    
    // ! Handling window
    let [newtab]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator('(//img[@src="themes/softed/images/select.gif"])[1]').click()
    ])
    await newtab.locator('a[id="1"]').click()

    //! selecting date
    // await page.locator('img[id="jscal_trigger_support_start_date"]').click()
    // await page.locator("//td[text()='October, 2026']/ancestor::div[@class='calendar']//td[text()='28']").click()
    // await page.locator('img[id="jscal_trigger_support_end_date"]').click()
    // await page.locator("(//td[text()='October, 2027']/ancestor::div[@class='calendar']//td[text()='29'])[2]").click()
    // await page.getByRole('cell',{name:'«'}).dblclick()
    // await page.mouse.down()

    // ! filling date 
    // await page.locator('input[id="jscal_field_support_end_date"]').fill('2026-10-29')
    // await page.locator('input[id="jscal_field_birthday"]').fill('2003-01-08')

    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    // await page.waitForTimeout(8000)

    // let contact_name= await page.locator('span[class="dvHeaderText"]').textContent()
    // console.log(contact_name);
    

    // ! validateing
    // if(contact_name?.includes('Sanapathi1 Jayanth')){
    //     console.log('Contact is created');
    // }else{
    //     console.log('contact is not created');
    // }
    // ! Validateing by using Assertions.
    await expect(page.locator('span[class="dvHeaderText"]')).toBeVisible()
    console.log('assertion passed');
    



})