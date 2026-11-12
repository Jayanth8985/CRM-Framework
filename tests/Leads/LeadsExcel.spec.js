import {test,expect} from '@playwright/test'
import excel, { Workbook } from 'exceljs'
import path from 'path'

test('leadsExcel',async ({page}) => {
    // ! Login
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill('admin')
    await page.locator('input[name="user_password"]').fill('admin')
    await page.getByRole('button',{name:'Login'}).click()

    // ! Read Excel file.
    let book=new Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../testdata/framework.xlsx'))
    let sheet=book.getWorksheet('Leads')

    // ! Empty Array.
    let lead_details=[]

    // ! Storing Details.
    for(let i=2;i<=sheet.rowCount;i++){
        // let url=sheet.getRow(i).getCell(1).toString()
        let firstname=sheet.getRow(i).getCell(2).toString()
        let lastname=sheet.getRow(i).getCell(3).toString()
        let company=sheet.getRow(i).getCell(4).toString()
        let email=sheet.getRow(i).getCell(5).toString()

        // ! Push the details 
        lead_details.push({
            firstname,
            lastname,
            company,
            email
    })
    }
    console.log(lead_details);

    for(let lead of lead_details){
        await page.getByRole('link',{name:'LEADS'}).first().click()
        await page.getByRole('img',{name:'Create Lead...'}).click()

        await page.locator('input[name="firstname"]').fill(lead.firstname)
        await page.locator('input[name="lastname"]').fill(lead.lastname)
        await page.locator('input[name="company"]').fill(lead.company)
        await page.locator('input[id="email"]').fill(lead.email)

        await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    }
    
})