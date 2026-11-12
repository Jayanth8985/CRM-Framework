import {test as base} from '@playwright/test'
import loginData from '../testdata/JSON_Data/loginData.json'
import { login } from '../POM/login'

export let test=base.extend({
    loginFixture: async({page},use)=>{
        let loginObj=new login(page)
        await loginObj.launch(loginData.url)
        await loginObj.actions(loginData.username,loginData.password)
        use(page)
    }
})