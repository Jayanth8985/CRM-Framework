import {test,expect} from '@playwright/test'

// ! login files
import { login } from '../../POM/login'
import loginData from '../../testdata/JSON_Data/loginData.json'

// ! contacts files
// import { contactsPage } from '../../POM/contact'
import { contactsPage } from '../../POM/contact'
import contactData from '../../testdata/JSON_Data/contactData.json'

// ! import Excel
import { Workbook } from 'exceljs'
import path from 'node:path'


// ! By using JSON 
// test('contactsPOM',async({page})=>{
//     // ! login
//     let loginObj=new login(page)
//     await loginObj.launch(loginData.url)
//     await loginObj.actions(loginData.username,loginData.password)

//     // ! contacts_details
//     let contactObj=new contactsPage(page)
//     await contactObj.actions(contactData.firstname,contactData.lastname)
// })

// ! By using Excel.

// ! login workbook
test.only('Login using excel',async({page})=>{


    let book=new Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../testdata/Excel_Data/Login.xlsx'))
    let loginsheet=book.getWorksheet('Login')

    let login_details=[]

    for(let i=2;i<=loginsheet.rowCount;i++){
        let url=loginsheet.getRow(i).getCell(1).toString()
        let username=loginsheet.getRow(i).getCell(2).toString()
        let password=loginsheet.getRow(i).getCell(3).toString()

        login_details.push({
            url,username,password
        })

    }
    console.log(login_details);
    for(let data of login_details){
        let loginObj=new login(page)
        await loginObj.launch(data.url)
        await loginObj.actions(data.username,data.password)
    }


    console.log('Login sucessfully');

    // ! Filling Contact details
    
    let contactBook=new Workbook()
    await contactBook.xlsx.readFile(path.join(__dirname,'../../testdata/Excel_Data/CRMdata.xlsx'))
    let contactsheet=contactBook.getWorksheet('contacts')

    let contactExcelData=[]

    for(let i=2;i<=contactsheet.rowCount;i++){
        let title=contactsheet.getRow(i).getCell(1).toString()
        let firstname=contactsheet.getRow(i).getCell(2).toString()
        let lastname=contactsheet.getRow(i).getCell(3).toString()
        let mobile=contactsheet.getRow(i).getCell(4).toString()

        contactExcelData.push({
            title,firstname,lastname,mobile
        })

        console.log(contactExcelData);
    }
    for(let data of contactExcelData){
        let contactObj=new contactsPage(page)
        await contactObj.actions(data.firstname,data.lastname,data.mobile)
    }
})

