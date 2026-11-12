import {test} from '../../Fixtures/CRMFixtures'
import quoteData from '../../testdata/JSON_Data/quotes.json'

test('quotesFixture',async({quoteFixture},use)=>{
    await quoteFixture.actions(quoteData.subject,quoteData.billaddress,quoteData.shippingaddress,quoteData.Quantity)
})