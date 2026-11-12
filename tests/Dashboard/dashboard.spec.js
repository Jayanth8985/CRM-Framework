import {test,expect} from '@playwright/test'


test('create Dashboard',async({page})=>{
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill('admin')
    await page.locator('input[name="user_password"]').fill('admin')
    await page.getByRole('button',{name:'Login'}).click()
})