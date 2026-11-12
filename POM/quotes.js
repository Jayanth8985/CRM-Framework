import {expect} from '@playwright/test'

export class quotes{
    #page
    #hover
    #quotes
    #createQuotes
    #subject
    #popup
    #select
    #item
    #billAddress
    #shippingAddress
    #save
    #validate
    #quantity
    
    constructor(page){
        this.#page=page
        this.#hover=page.locator('img[src="themes/softed/images/menuDnArrow.gif"]')
        this.#quotes=page.locator('a[name="Quotes"]')
        this.#createQuotes=page.getByRole('img',{name:'Create Quote...'})
        this.#subject=page.locator('input[name="subject"]')
        this.#popup=page.locator('(//img[@src="themes/softed/images/select.gif"])[1]')
        this.#billAddress=page.locator('textarea[name="bill_street"]')
        this.#shippingAddress=page.locator('textarea[name="ship_street"]')
        this.#save=page.locator('(//input[@title="Save [Alt+S]"])[1]')
        this.#validate=page.locator('span[class="lvtHeaderText"]')
        this.#select=page.locator('select[name="quotestage"]')
        this.#item=page.locator('img[id="searchIcon1"]')
        this.#quantity=page.locator('input[id="qty1"]')
    }

    async actions(subject,billAddress,shippingAddress,quantity){
        await this.#hover.hover()
        await this.#quotes.click()
        await this.#createQuotes.click()
        await this.#subject.fill(subject)

        // ! window handling.
        let [popup]=await Promise.all([
            this.#page.waitForEvent('popup'),
            this.#popup.click()
        ])
        await popup.locator('a[id="1"]').click()

        // ! SelectOption
        await this.#select.selectOption({value:"Delivered"})

        await this.#billAddress.fill(billAddress)
        await this.#shippingAddress.fill(shippingAddress)

        // ! Item Name
        let [itemWindow]=await Promise.all([
            this.#page.waitForEvent('popup'),
            this.#item.click()
        ])
        await itemWindow.locator('a[id="popup_product_18"]').click()

        await this.#quantity.fill(quantity)
        
        
        await this.#save.click()
        await expect(this.#validate).toContainText(subject)
    }
}