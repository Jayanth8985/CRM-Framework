import {test} from '../../Fixtures/CRMFixtures'
import oppData from '../../testdata/JSON_Data/oppData.json'

test('opportunitiesFixtures',async({oppFixture})=>{
    await oppFixture.org_actions(oppData.oppName)
})