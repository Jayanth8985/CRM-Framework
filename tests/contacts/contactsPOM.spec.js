import {test,expect} from '@playwright/test'

// ! login files
import { login } from '../../POM/login'
import loginData from '../../testdata/JSON_Data/loginData.json'

// ! contacts files
import { contactsPage } from '../../POM/contact'
import contactData from '../../testdata/JSON_Data/contactData.json'

test('contactsPOM',async({page})=>{
    // ! login
    let loginObj=new login(page)
    await loginObj.launch(loginData.url)
    await loginObj.actions(loginData.username,loginData.password)

    // ! contacts_details
    let contactObj=new contactsPage(page)
    await contactObj.actions(contactData.firstname,contactData.lastname)
})