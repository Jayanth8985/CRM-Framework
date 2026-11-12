import {test as base} from './loginFixture.js'
import { leaddata } from '../POM/lead.js'
import { org } from '../POM/oganisation.js'
import { opportunityPage } from '../POM/opportunities.js'
import { quotes } from '../POM/quotes.js'
import { contactsPage } from '../POM/contact.js'
// import { use } from 'react'

export let test=base.extend({
    leadFixture:async({loginFixture},use)=>{
        let leadObj=new leaddata(loginFixture)
        use(leadObj)
    },
    oppFixture:async({loginFixture},use)=>{
        let oppObj=new opportunityPage(loginFixture)
        use(oppObj)
    },
    organisationFixture:async({loginFixture},use)=>{
        let orgObj=new org(loginFixture)
        use(orgObj)
    },
    quoteFixture:async({loginFixture},use)=>{
        let quoteObj=new quotes(loginFixture)
        use(quoteObj)
    },
    contactFixture:async({loginFixture},use)=>{
        let contactObj=new contactsPage(loginFixture)
        use(contactObj)
    }
})