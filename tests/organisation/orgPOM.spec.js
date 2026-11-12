import {test} from '@playwright/test'

// ! importing Login POM file & LoginData
import { login } from '../../POM/login'
import logindata from '../../testdata/JSON_Data/loginData.json'

// ! importing Org POM file & OrgDetails.
import { org } from '../../POM/oganisation'
import orgData from '../../testdata/JSON_Data/org_details.json'

test('using POM for Org',async({page})=>{
    let loginobj=new login(page)
    await loginobj.launch(logindata.url)
    await loginobj.actions(logindata.username,logindata.password)

    // ! For organisation
    let org_obj=new org(page)
    await org_obj.org_method()
    await org_obj.org_actions(orgData.org_name,orgData.website,orgData.phone,orgData.email)
    await org_obj.org_validation(orgData.org_name)
})
