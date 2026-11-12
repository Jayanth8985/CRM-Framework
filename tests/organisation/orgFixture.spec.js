import {test} from '../../Fixtures/CRMFixtures'
import orgData from '../../testdata/JSON_Data/org_details.json'

test('organisationFixture',async({organisationFixture})=>{
    await organisationFixture.org_method()
    await organisationFixture.org_actions(orgData.org_name,orgData.website,orgData.phone,orgData.email)
    await organisationFixture.org_validation(orgData.org_name)
})