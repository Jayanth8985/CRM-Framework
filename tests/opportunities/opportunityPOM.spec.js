import {test,expect} from '@playwright/test'

// ! Login Files
import { login } from '../../POM/login'
import loginData from '../../testdata/JSON_Data/loginData.json'

// ! Opportunities Files
import { opportunityPage } from '../../POM/opportunities'
import oppData from '../../testdata/JSON_Data/oppData.json'

test('OpportunityPOM',async ({page}) => {
    let login_obj=new login(page)
    await login_obj.launch(loginData.url)
    await login_obj.actions(loginData.username,loginData.password)

    // ! For opportunities
    let opp_obj=new opportunityPage(page)
    await opp_obj.org_actions(oppData.oppName)
})

