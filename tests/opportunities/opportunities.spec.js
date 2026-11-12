import {test,expect} from '@playwright/test'
// import logindata from '../../Login/login.json'


test('create Opportunities',async({page})=>{
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

    await page.getByRole('link',{name:'OPPORTUNITIES'}).first().click()
    await page.getByRole('link',{name:'Create Opportunity...'}).click()

    await page.locator('input[name="potentialname"]').fill('Website Testing')

    // ! Window handling
    let [window_tab]=await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('img',{name:'Select'}).first().click()
    ])
    await window_tab.locator('a[id="1"]').click()

    await page.locator('input[name="closingdate"]').fill('2026-10-14')
    await page.locator('select[name="sales_stage"]').selectOption('Qualification')
    await page.locator('(//input[@title="Save [Alt+S]"])[2]').click()

    let opportunity=await page.locator('span[class="dvHeaderText"]').textContent('Website Testing')
    console.log(opportunity);

    // !validateing
    // if(opportunity?.includes('Website Testing')){
    //     console.log('opportunity is created');
    // }else{
    //     console.log('opportunity is not created');
    // }

    let header=await page.locator('span[class="dvHeaderText"]')
    await expect(header).toBeVisible()
    await expect(header).toContainText('Website')
    

})