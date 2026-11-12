import { expect } from "@playwright/test";

export class org{
    #org
    #create_org
    #org_name
    #website
    #phone
    #email
    #save
    #validation

    constructor(page){
        this.#org=page.getByRole('link',{name:'Organizations'})
        this.#create_org=page.getByRole('img',{name:'Create Organization...'})
        this.#org_name=page.locator('input[name="accountname"]')
        this.#website=page.locator('input[name="website"]')
        this.#phone=page.locator('input[name="phone"]')
        this.#email=page.locator('input[id="email1"]')
        this.#save=page.locator('(//input[@title="Save [Alt+S]"])[1]')
        this.#validation=page.locator('span[class="dvHeaderText"]')
    }
    async org_method(){
        await this.#org.first().click()
    }
    async org_actions(org_name,website,phone,email){
        await this.#create_org.click()
        await this.#org_name.fill(org_name)
        await this.#website.fill(website)
        await this.#phone.fill(phone)
        await this.#email.fill(email)
        await this.#save.click()
    }
    async org_validation(org_name){
        await expect(this.#validation).toContainText(org_name)
    }

}