import {test,expect} from '@playwright/test'
import logindata from '../../testdata/JSON_Data/loginData.json'


test('create organisation',async({page})=>{
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

     // ! Createing Organisation
    await page.getByRole('link',{name:'Organizations'}).click()
    await page.getByRole('img',{name:'Create Organization...'}).click()
    await page.locator('input[name="accountname"]').fill('Jayanth Technologies pvt Limited')
    await page.locator('input[name="website"]').fill('www.JTPL.com')
    await page.locator('input[name="tickersymbol"]').fill('JTPL')
    await page.locator('input[name="employees"]').fill('2500')
    await page.locator('input[name="email2"]').fill('contact@gmail.com')
    await page.locator('select[name="industry"]').selectOption({value:'Technology'})
    await page.locator('select[name="accounttype"]').selectOption({value:'Customer'})
    await page.locator('input[name="emailoptout"]').click()
    await page.locator('input[name="phone"]').fill('040-23456789')
    await page.locator('input[name="fax"]').fill('040-23456789')
    await page.locator('input[name="otherphone"]').fill('040-23456789')
    await page.locator('input[name="email1"]').fill('contact@gmail.com')
    await page.locator('input[name="ownership"]').fill('Private')
    await page.locator('select[name="rating"]').selectOption({value:'Active'})
    await page.locator('input[name="siccode"]').fill('7372')
    await page.locator('input[name="annual_revenue"]').fill('50000000')
    await page.locator('input[name="notify_owner"]').click()
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    let organisation_name= await page.locator('span[class="dvHeaderText"]').textContent('Jayanth Technologies')
    console.log(organisation_name);
    
    // ! Validateing 
    if(organisation_name?.includes('Jayanth Technologies')){
        console.log('Organisation is created');
    }else{
        console.log(('organisation is not created'));
    }
})