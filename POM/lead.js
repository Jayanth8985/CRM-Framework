import { expect } from "@playwright/test";

export class leaddata{
    #lead
    #createlead
    #salutationtype
    #firstname
    #lastname
    #company
    #save
    #validation

    constructor(page){
        this.#lead=page.getByRole('link',{name:'Leads'})
        this.#createlead=page.getByRole('img',{name:'Create Lead...'})

        this.#salutationtype=page.locator('select[name="salutationtype"]')
        this.#firstname=page.locator('input[name="firstname"]')
        this.#lastname=page.locator('input[name="lastname"]')
        this.#company=page.locator('input[name="company"]')

        this.#save=page.locator('(//input[@title="Save [Alt+S]"])[1]')

        this.#validation=page.locator('span[class="dvHeaderText"]')
    }
    async leadmethod(){
        await this.#lead.first().click()
    }
    async leadactions(firstname,lastname,company){
        await this.#createlead.click()
        await this.#salutationtype.selectOption({value:'Mr.'})
        await this.#firstname.fill(firstname)
        await this.#lastname.fill(lastname)
        await this.#company.fill(company)
        await this.#save.click()
    }

    async validation(lastname){
        await expect(this.#validation).toContainText(lastname)
    }
}