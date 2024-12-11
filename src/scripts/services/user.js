import { baseUrl, followers, following, events } from "../variables.js"


async function getUser(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()
}

async function getFollowers(userName) {
    const response = await fetch(`${baseUrl}/${userName}/${followers}`)
    return await response.json()

}

async function getFollows(userName) {
    const response = await fetch(`${baseUrl}/${userName}/${following}`)
    return await response.json()
}

async function getEvents(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events`)
    const event = await response.json()

    const filterEvents = event.filter(event => event.type === 'PushEvent' || event.type === 'CreateEvent')

    return filterEvents.slice(0, 10);
}

export { getUser, getFollowers, getFollows, getEvents }