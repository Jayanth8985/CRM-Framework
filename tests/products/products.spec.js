import {test,expect} from '@playwright/test'
import logindata from '../../testdata/JSON_Data/loginData.json'


test('create Products',async({page})=>{
    // ! Login into the localhost.
    await page.goto('http://localhost:8888')
    await page.locator('input[name="user_name"]').fill(logindata.username)
    await page.locator('input[name="user_password"]').fill(logindata.password)
    await page.getByRole('button',{name:'Login'}).click()

    await page.getByRole('link',{name:'PRODUCTS'}).click()
    await page.getByRole('img',{name:'Create Product...'}).click()
    await page.locator('input[name="productname"]').fill('Products Page')
    await page.locator('input[name="sales_start_date"]').fill('2027-01-01')
    await page.locator('select[name="productcategory"]').selectOption('Software')
    await page.locator('input[name="expiry_date"]').fill('2028-01-01')

    // let [newtab]=await Promise.all([
    //     page.waitForEvent('popup'),
    //     page.locator('input[name="file_1"]').click()
    // ])
    // await newtab.locator('')

    await page.locator('input[id="my_file_element"]').setInputFiles('C:/Users/Jayanth/OneDrive/Pictures/wallpapers/car.jpg')

    await page.getByRole('button',{name:'Save '}).first().click()

    let product_name=await page.locator('span[class="lvtHeaderText"]').textContent('Products Page')
    console.log(product_name);

    // ! validateing
    if(product_name?.includes('Products Page')){
        console.log('Product is created');
    }else{
        console.log('product is not created');
    }
    
})