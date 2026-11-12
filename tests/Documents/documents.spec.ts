import {test,expect} from '@playwright/test'
import logindata from '../../testdata/JSON_Data/loginData.json'


test('create Documents',async({page})=>{
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

    await page.getByRole('link',{name:'DOCUMENTS'}).click()
    await page.getByRole('img',{name:'Create Document...'}).click()
    await page.locator('input[name="notes_title"]').fill('Jayanth Technologies-Website Testing')
    
    
    // await page.locator('html[dir="ltr"]').fill('This Document is about Website Testing')
    // let editor=page.frameLocator('#cke_contents_notecontent iframe').locator('body').click()
    // // let editor=frame.locator('body')
    // // await editor.click()
    // await editor.pressSequentially('Detailed proposal for the corporate website redesign project.')
})