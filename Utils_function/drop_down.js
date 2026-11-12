export async function drop_down(locator,value){
    await locator.selectOption(value)
}