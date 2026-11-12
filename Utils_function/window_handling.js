export async function window_handling(page,action) {
    let [popup]=await Promise.all([
        page.waitForEvent('popup'),
        action
    ])
    return popup
}