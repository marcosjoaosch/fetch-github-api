const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                         <img src="${user.avatarUrl}}" alt="Foto do perfil user"/>
                         <div class="data">
                             <h1>${user.name ?? "Não possuí nome cadastrado 😿"}</h1>
                             <h3>${user.bio ?? "Não possuí bio cadastrada 😿"}</h3>
                             <br>
                             <p>Seguidores: ${user.followers ?? "Não possuí seguidores 😿"}</p>
                             <p>Seguindo: ${user.following ?? "Não segue ninguém 😿"}</p>
                         </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <div class="repositories-details">
            <p>🍴${repo.forks} </p>
            <p>⭐${repo.stars} </p>
            <p>👀${repo.watchers} </p>
            <p>☕${repo.language     ?? "Não especificada"} </p></div>
            </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                             <h2>Repositórios</h2>
                                             <ul>${repositoriesItens}</ul}    
                                            </div>`
        }
    }
    ,
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
    ,
    userEvents: document.querySelector('.profile-events'),
    renderEvents(user) {
        if (!Array.isArray(user.events) || user.events.length === 0) {
            this.userEvents.innerHTML = `
                <div class="events">
                    <h2>Últimos 10 Eventos</h2>
                    <p>O usuário não possui eventos do tipo requerido 😿</p>
                </div>`;
            return;
        }

        let eventsItems = '';
        user.events.forEach(event => {
            if (event.type === 'PushEvent') {

                const repoName = event.repo.name;
                const commitMessage = event.payload.commits?.[0]?.message || "Sem mensagem de commit";
                eventsItems += `
                    <li>
                        <strong>Repositório:</strong> ${repoName} <br>
                        <strong>Mensagem:</strong> ${commitMessage}
                    </li>`;
            } else if (event.type === 'CreateEvent') {

                const repoName = event.repo.name;
                eventsItems += `
                    <li>
                        <strong>Repositório:</strong> ${repoName} <br>
                        <strong>Mensagem:</strong> Sem mensagem de commit
                    </li>`;
            }
        });

        this.userEvents.innerHTML = `
            <div class="events">
                <h2>Últimos Eventos</h2>
                <ul>${eventsItems}</ul>
            </div>`
    }
}

export { screen }