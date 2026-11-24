import {test,expect} from '@playwright/test'
import logindata from '../../testdata/JSON_Data/loginData.json'
import { Window, window_handling } from '../../Utils_function/window_handling'
import { drop_down } from '../../Utils_function/drop_down'

test('Utils window_handling',async ({page}) => {
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

    await page.getByRole('link',{name:'OPPORTUNITIES'}).first().click()
    await page.getByRole('link',{name:'Create Opportunity...'}).click()

    await page.locator('input[name="potentialname"]').fill('Website Testing')

    // ! Utils :- It is used to store repeated methods in separate folder then the folders are reused in another folder by importing.
    // ! Drop_down
    await drop_down(page.locator('select[name="opportunity_type"]'),'Existing Business')

    // ! Window Handling or popups
    let newtab=await window_handling(page,page.getByRole('img',{name:'Select'}).first().click())
    await newtab.locator('a[id="1"]').click()
})  