import { expect } from "@playwright/test"
export class opportunityPage{
    #page
    #org
    #create_org
    #oppName
    #popup
    #save
    #validation

    constructor(page){
        this.#page=page
        this.#org=page.getByRole('link',{name:'OPPORTUNITIES'})
        this.#create_org=page.getByRole('link',{name:'Create Opportunity...'})
        this.#oppName=page.locator('input[name="potentialname"]')
        this.#popup=page.getByRole('img',{name:'Select'})
        this.#save=page.locator('(//input[@title="Save [Alt+S]"])[2]')
        this.#validation=page.locator('span[class="dvHeaderText"]')
    }

    async org_actions(oppName){
        await this.#org.first().click()
        await this.#create_org.click()
        await this.#oppName.fill(oppName)

        // ! Window Handling
        let [popupPage]=await Promise.all([
            this.#page.waitForEvent('popup'),
            this.#popup.first().click()
        ])
        await popupPage.locator('a[id="1"]').click()
        
        await this.#save.first().click()

        await expect(this.#validation).toContainText(oppName)
    }
}