import {test} from '../../Fixtures/CRMFixtures'
import contactData from '../../testdata/JSON_Data/contactData.json'

test('contactFixture',async({contactFixture})=>{
    await contactFixture.actions(contactData.firstname,contactData.lastname)
})