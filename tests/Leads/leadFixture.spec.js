import {test} from '../../Fixtures/CRMFixtures'
import leadData from '../../testdata/JSON_Data/leadsdata.json'

test('leadFixtures',async ({leadFixture}) => {
    await leadFixture.leadmethod()
    await leadFixture.leadactions(leadData.firstname,leadData.lastname,leadData.company)
    await leadFixture.validation(leadData.lastname)
    
})