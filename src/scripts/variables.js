const baseUrl = "https://api.github.com/users"
const followers = "https://api.github.com/user/followers"
const following = "https://api.github.com/user/following{/target}"
const events = (userName) => `${baseUrl}/${userName}/events`
const repositoriesQuantity = 10

export { baseUrl, repositoriesQuantity, followers, following, events }