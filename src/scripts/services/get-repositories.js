import { baseUrl, itemsQuantity } from "/src/scripts/variables.js"

async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${itemsQuantity}`)
    return await response.json()
}
export { getRepositories }