import { expect } from "@playwright/test";
export class contactsPage{
    #selcontact
    #createContact
    #dropdown
    #firstname
    #lastname
    #save
    #validate

    constructor(page){
        this.#selcontact=page.getByRole('link',{name:'CONTACTS'})
        this.#createContact=page.getByRole('link',{name:'Create Contact...'})
        this.#dropdown=page.locator('select[name="salutationtype"]')
        this.#firstname=page.locator('input[name="firstname"]')
        this.#lastname=page.locator('input[name="lastname"]')
        this.#save=page.locator('(//input[@title="Save [Alt+S]"])[1]')
        this.#validate=page.locator('span[class="dvHeaderText"]')
    }
    async actions(firstname,lastname){
        await this.#selcontact.click()
        await this.#createContact.click()
        await this.#dropdown.selectOption({value:"Dr."})
        await this.#firstname.fill(firstname)
        await this.#lastname.fill(lastname)
        await this.#save.click()
        await expect(this.#validate).toContainText(lastname)
    }
}