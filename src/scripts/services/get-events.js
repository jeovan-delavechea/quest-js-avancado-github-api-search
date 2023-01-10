import { baseUrl, itemsQuantity } from "/src/scripts/variables.js"

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${itemsQuantity}`)
    return await response.json()
}
export { getEvents }