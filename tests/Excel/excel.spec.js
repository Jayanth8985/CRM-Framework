import {test,expect} from '@playwright/test'
import excel, { Workbook } from 'exceljs'
import path from 'node:path'

test.skip('Get single data from Excel',async({page})=>{

    // ! createing New workbook.
    let book=new excel.Workbook()

    // ! Reading the file through path.
    await book.xlsx.readFile(path.join(__dirname,'../../testdata/vtigerData.xlsx'))

    // ! createing New worksheet.
    let sheet=await book.getWorksheet('Sheet1')

    // ! storing values in variables.
    let url=await sheet.getRow(2).getCell(1).toString()
    let user_name=await sheet.getRow(2).getCell(2).toString()
    let password=await sheet.getRow(2).getCell(3).toString()
    console.log(url);
    

    // ! Actual Automation Code.
    // await page.goto(url,{waitUntil:'domcontentloaded'})
    // await page.getByLabel('Username').fill('Jayanth')
    // await page.getByLabel('Password').fill('11234')

    // await page.pause()
})



// ! To access Multiple values.
test('Multiple values',async ({page}) => {
    

    let book=new Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../testdata/multipleValues.xlsx'))
    let sheet=book.getWorksheet('Sheet1')
    let dataarr=[]

    for(let i=2; i<=sheet.rowCount; i++){
        let url=sheet.getRow(i).getCell(1).toString()
        let username=sheet.getRow(i).getCell(2).toString()
        let password=sheet.getRow(i).getCell(3).toString()

        dataarr.push({
            url,
            username,
            password
        })
    }
    console.log(dataarr);
    
})