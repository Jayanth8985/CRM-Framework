import {test,expect} from '@playwright/test'
import excel, { Workbook } from 'exceljs'
import path  from 'node:path'
import logindata from '../../testdata/login.json'

test('contactsExcel',async ({page}) => {
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

    // ! Read excel file
    let book=new Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../testdata/organisation/organisations.xlsx'))
    let sheet=book.getWorksheet('contacts')

    let contact_details=[]

    for(let i=2;i<=sheet.rowCount;i++){
        let title=sheet.getRow(i).getCell(1).value
        let firstname=sheet.getRow(i).getCell(2).value
        let lastname=sheet.getRow(i).getCell(3).value
        let mobile=sheet.getRow(i).getCell(4).value

        contact_details.push({
            title,firstname,lastname,mobile
    })
    }
    console.log(contact_details);

    for(let each_contact of contact_details){
        await page.getByRole('link',{name:'CONTACTS'}).first().click()
        await page.getByRole('link',{name:'Create Contact...'}).click()
        await page.locator('select[name="salutationtype"]').selectOption(each_contact.title)
        await page.locator('input[name="firstname"]').fill(each_contact.firstname)
        await page.locator('input[name="lastname"]').fill(each_contact.lastname)
        await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    }
    
})