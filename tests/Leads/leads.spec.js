import {test,expect} from '@playwright/test'
import logindata from '../../Login//login.json'
import leaddata from '../../Lead//lead.json'

test.describe('Tests',()=>{
    test.beforeEach(async({page})=>{
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()
    })

    // ! Createing Lead 
    test('createing_lead',async({page})=>{

    // ! Navigating to the Lead page.
    await page.getByRole('link',{name:'Leads'}).click()
    await page.getByRole('img',{name:'Create Lead...'}).click()

    // ! Filling details.
    await page.locator('select[name="salutationtype"]').selectOption({value:'Mr.'})
    await page.locator('input[name="firstname"]').fill(leaddata.firstname)
    await page.locator('input[name="lastname"]').fill(leaddata.lastname)
    await page.locator('input[name="company"]').fill('Cognizant')
    await page.locator('input[id="designation"]').fill('Cognizant Pro')
    await page.locator('select[name="leadsource"]').selectOption({value:'Employee'})
    await page.locator('select[name="industry"]').selectOption({value:'Electronics'})
    await page.locator('input[name="annualrevenue"]').fill('60000000')
    await page.locator('input[name="noofemployees"]').fill('5000')
    await page.locator('input[name="secondaryemail"]').fill('jay@gmail.com')
    await page.locator('input[id="phone"]').fill('8985805795')
    // await page.locator('input[id="mobile"]').fill('8985805795')
    await page.locator('input[id="fax"]').fill('+91 40 2345 6789')
    await page.locator('input[name="email"]').fill('jayanth@gmail.com')
    await page.locator('input[name="website"]').fill('www.cognizant.com')
    await page.locator('select[name="leadstatus"]').selectOption({value:'Qualified'})
    await page.locator('select[name="rating"]').selectOption({value:'Active'})
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

    let lastname=await page.locator('span[class="dvHeaderText"]').textContent('Sanapathi')
    console.log(lastname);
    

    // ! Validating the lead 
    // if(lastname?.includes('Sanapathi Jayanth')){
    //     console.log('Lead is created');
    // }else{
    //     console.log('Lead is not created');
        
    // }

    // ! Validateing by using Assertions.
    let header=await page.locator('span[class="dvHeaderText"]')
    await expect(header).toBeVisible()
    await expect(header).toContainText('sanapathi')
    console.log('Assertion passed');
    

    })

    // ! Createing Organisation
    // test.skip('create organisation',async ({page}) => {
    //     await page.getByRole('link',{name:'Organizations'}).click()
    //     await page.getByRole('img',{name:'Create Organization...'}).click()
    //     await page.locator('input[name="accountname"]').fill('Jayanth Technologies pvt Limited')
    //     await page.locator('input[name="website"]').fill('www.JTPL.com')
    //     await page.locator('input[name="tickersymbol"]').fill('JTPL')
    //     await page.locator('input[name="employees"]').fill('2500')
    //     await page.locator('input[name="email2"]').fill('contact@gmail.com')
    //     await page.locator('select[name="industry"]').selectOption({value:'Technology'})
    //     await page.locator('select[name="accounttype"]').selectOption({value:'Customer'})
    //     await page.locator('input[name="emailoptout"]').click()
    //     await page.locator('input[name="phone"]').fill('040-23456789')
    //     await page.locator('input[name="fax"]').fill('040-23456789')
    //     await page.locator('input[name="otherphone"]').fill('040-23456789')
    //     await page.locator('input[name="email1"]').fill('contact@gmail.com')
    //     await page.locator('input[name="ownership"]').fill('Private')
    //     await page.locator('select[name="rating"]').selectOption({value:'Active'})
    //     await page.locator('input[name="siccode"]').fill('7372')
    //     await page.locator('input[name="annual_revenue"]').fill('50000000')
    //     await page.locator('input[name="notify_owner"]').click()
    //     await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

    //     let organisation_name= await page.locator('span[class="dvHeaderText"]').textContent('Jayanth Technologies')
    //     console.log(organisation_name);
        

    //     // ! Validateing 
    //     if(organisation_name?.includes('Jayanth Technologies')){
    //         console.log('Organisation is created');
    //     }else{
    //         console.log(('organisation is not created'));
    //     }

    // })

    // // ! Createing Contact
    // test.skip('createing Contact',async({page})=>{
    //    await page.getByRole('link',{name:'CONTACTS'}).click()
    //     await page.getByRole('link',{name:'Create Contact...'}).click()
    //     await page.locator('select[name="salutationtype"]').selectOption('Mr.')
    //     await page.locator('input[name="firstname"]').fill('Jayanth')
    //     await page.locator('input[name="lastname"]').fill('Sanapathi1')
        

    //     // ! Handling window
    //     let [newtab]=await Promise.all([
    //         page.waitForEvent('popup'),
    //         page.locator('(//img[@src="themes/softed/images/select.gif"])[1]').click()
    //     ])
    //     await newtab.locator('a[id="1"]').click()

    //     await page.locator('img[id="jscal_trigger_support_start_date"]').click()
    //     await page.locator("//td[text()='October, 2026']/ancestor::div[@class='calendar']//td[text()='28']").click()
    //     await page.locator('img[id="jscal_trigger_support_end_date"]').click()
    //     // await page.locator("(//td[text()='October, 2027']/ancestor::div[@class='calendar']//td[text()='29'])[2]").click()
    //     await page.getByRole('cell',{name:'«'}).dblclick()
    //     await page.mouse.down()
        
    // })

})