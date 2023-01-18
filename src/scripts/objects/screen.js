const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderData(user) {
        this.renderUser(user)
        this.renderRepositories(user.repositories)
        this.renderEvents(user.events)
    },

    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div clas="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                            <p>${user.followers} follower - ${user.following} following</p>
                                        </div>
                                    </div>`
    },

    renderRepositories(repositories) {
        let repositoriesItems = ''
        repositories.forEach((repo) => repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
                                                                <div class="repository-infos">
                                                                    <p>🍴 ${repo.forks_count}</p>
                                                                    <p>⭐ ${repo.stargazers_count}</p>
                                                                    <p>👀 ${repo.watchers_count}</p>
                                                                    <p>💻 ${repo.language ?? 'Sem linguagem'}</p>
                                                                </div>
                                                            </a></li>`
        );
        if (repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItems}</ul>
                                            </div>`
        }
    },

    renderEvents(events) {
        let eventsList = events.filter(event => event.type === 'PushEvent' || event.type === 'CreateEvent')
        let eventsItems = ''
        eventsList.forEach((event) => {
            eventsItems += `<li>
                                <h4>${event.repo.name}</h4>  
                                <p>- ${event.payload.commits?.[0].message ?? `Create ${event.payload.ref_type}`}</p>
                            </li>`
        });
        if (events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItems}</ul>
                                            </div>`
        } else {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <p>Não possui eventos.</p>
                                            </div>`
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usuário não encontrado.</h3>`
    }
}

export { screen }