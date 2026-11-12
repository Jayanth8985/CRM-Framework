import {test,expect} from '@playwright/test'
import excel, { Workbook } from 'exceljs'
import path from 'node:path'
import logindata from '../../testdata/login.json'

test('opportunitiesExcel',async ({page}) => {

     // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

    // ! Read excel.
    const book=new excel.Workbook
    await book.xlsx.readFile(path.join(__dirname,'../../testdata/organisation/organisations.xlsx'))
    const sheet=book.getWorksheet('opportunities')

    // ! Converting Date format
    function formdate(value){
        if(value instanceof Date){
            const[yyyy,mm,dd]=value.toISOString().slice(0,10).split('-')
            // return `${dd}-${mm}-${yyyy}`
            return `${yyyy}-${mm}-${dd}`
        }else{
            return String(value).trim()
        }
    }

    // ! Store values.
    let oppo_details=[]

    for(let i=2;i<=sheet.rowCount;i++){
        let oppo_name=sheet.getRow(i).getCell(2).text.trim()
        let org_name=sheet.getRow(i).getCell(3).text.trim()
        let date=formdate(sheet.getRow(i).getCell(4).value)
        let assigned_to=sheet.getRow(i).getCell(5).value

        oppo_details.push({
            oppo_name,org_name,date
        })
    }
    console.log(oppo_details);

    for(let oppo of oppo_details){
        await page.getByRole('link',{name:'OPPORTUNITIES'}).click()
        await page.getByRole('link',{name:'Create Opportunity...'}).click()

        await page.locator('input[name="potentialname"]').fill(oppo.oppo_name)

        // ! Handling Window.
        let [newtab]=await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('img',{name:'Select'}).first().click()
        ])
        await newtab.getByRole('link',{name:oppo.org_name}).click()

        // ! HAndling Date
        await page.locator('input[name="closingdate"]').fill(oppo.date)
        await page.locator('(//input[@title="Save [Alt+S]"])[2]').click()
    }
    
})