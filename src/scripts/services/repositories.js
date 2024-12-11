import { baseUrl, repositoriesQuantity } from "../variables.js"


async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`)

    const repositories = await response.json()

    const detailedRepositories = await Promise.all(
        repositories.map(async (repo) => {
            const repoDetailsResponse = await fetch(`https://api.github.com/repos/${userName}/${repo.name}`)

            return {
                name: repo.name,
                html_url: repo.html_url,
                forks: repo.forks_count,
                stars: repo.stargazers_count,
                watchers: repo.watchers_count,
                language: repo.language,
            }
        })
    )
     console.log(detailedRepositories);
    return detailedRepositories
}

export { getRepositories }