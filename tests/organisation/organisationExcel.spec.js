import {test,expect} from '@playwright/test'
import excel from 'exceljs'
import path from 'path'
import logindata from '../../testdata/JSON_Data/loginData.json'

test('organisationExcel',async({page})=>{
     // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

    // ! Reading excel file.
    let book=new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../testdata/Excel_Data/organisations.xlsx'))
    let sheet=book.getWorksheet('organisation')

    // ! empty array to store values.
    let org_details=[]

    for(let i=2;i<=sheet.rowCount;i++){
        let orgname=sheet.getRow(i).getCell(2).toString()
        let website=sheet.getRow(i).getCell(3).toString()
        let phone=sheet.getRow(i).getCell(4).toString()
        let email=sheet.getRow(i).getCell(5).toString()

        org_details.push({
        orgname,
        website,
        phone,
        email
    })
    }
    
    console.log(org_details);
    for(let details of org_details){
        await page.getByRole('link',{name:'Organizations'}).first().click()
        await page.getByRole('img',{name:'Create Organization...'}).click()
        await page.locator('input[name="accountname"]').fill(details.orgname)
        await page.locator('input[name="website"]').fill(details.website)
        await page.locator('input[name="phone"]').fill(details.phone)
        await page.locator('input[name="email1"]').fill(details.email)
        await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    } 
})