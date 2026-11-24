import { expect } from "@playwright/test";
class contactsPage{
    #selcontact
    #createContact
    #dropdown
    #firstname
    #lastname
    #mobile
    #save
    #validate

    constructor(page){
        this.#selcontact=page.getByRole('link',{name:'CONTACTS'})
        this.#createContact=page.getByRole('link',{name:'Create Contact...'})
        this.#dropdown=page.locator('select[name="salutationtype"]')
        this.#firstname=page.locator('input[name="firstname"]')
        this.#lastname=page.locator('input[name="lastname"]')
        this.#mobile=page.locator('input[id="mobile"]')
        this.#save=page.locator('(//input[@title="Save [Alt+S]"])[1]')
        this.#validate=page.locator('span[class="dvHeaderText"]')
    }
    async actions(firstname,lastname,mobile){
        await this.#selcontact.first().click()
        await this.#createContact.click()
        await this.#dropdown.selectOption({value:"Dr."})
        await this.#firstname.fill(firstname)
        await this.#lastname.fill(lastname)
        await this.#mobile.fill(mobile)
        await this.#save.click()
        await expect(this.#validate).toContainText(lastname)
    }
}
export {contactsPage}

