import {test,expect} from '@playwright/test'

// ! login files
import {login} from '../../POM/login'
import logindata from '../../testdata/JSON_Data/loginData.json'

// ! Quotes files
import { quotes } from '../../POM/quotes'
import quotesData from '../../testdata/JSON_Data/quotes.json'

test('quotesPOM',async({page})=>{
    // ! login
    let loginObj=new login(page)
    await loginObj.launch(logindata.url)
    await loginObj.actions(logindata.username,logindata.password)

    // ! quotes
    let quotesObj=new quotes(page)
    await quotesObj.actions(quotesData.subject,quotesData.billaddress,quotesData.shippingaddress,quotesData.Quantity)


})
