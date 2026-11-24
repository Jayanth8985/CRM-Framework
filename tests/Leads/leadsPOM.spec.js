import {test} from '@playwright/test'

import { login } from '../../POM/login'
// import logindata from '../../testdata/JSON_Data/loginData.json'


import leadsdata from '../../testdata/JSON_Data/leadsdata.json'
import { leaddata } from '../../POM/lead'

test('using POM',async({page})=>{
    let loginobj=new login(page)
    // await loginobj.launch(logindata.url)
    await loginobj.actions(logindata.urlogindata.username,logindata.password)

    // ! From leads.js
    let leadobj=new leaddata(page)
    await leadobj.leadmethod()
    await leadobj.leadactions(leadsdata.firstname,leadsdata.lastname,leadsdata.company)
    await leadobj.validation(leadsdata.lastname)
})