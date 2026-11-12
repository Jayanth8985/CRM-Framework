import {test,expect} from '@playwright/test'
import excel from 'exceljs'
import path from 'path'

test('demoApp',async ({page}) => {
    test.setTimeout(60000)
    let book=new excel.Workbook()
    
    await book.xlsx.readFile(path.join(__dirname,'../../testdata/demoApps.xlsx'))
    let sheet=await book.getWorksheet('Sheet1')

    let link=await sheet.getRow(2).getCell(4).toString()
    let name=await sheet.getRow(2).getCell(1).toString()
    let email=await sheet.getRow(2).getCell(2).toString()
    let password=await sheet.getRow(2).getCell(3).toString()
    console.log(link);
    console.log(name);
    console.log(email);
    console.log(password);
    

    await page.goto(link,{waitUntil:'domcontentloaded'})
    await page.getByPlaceholder('Name').fill(name)
    await page.getByPlaceholder('Enter Your Email').fill(email)
    await page.getByPlaceholder('Password').fill(password)
    await page.getByRole('button',{name:'Register'}).click()

    // await page.pause()
})