const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
            <div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                <div clas="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                    <p>${user.followers} follower - ${user.following} following</p>
                </div>
            </div>`;
        let repositoriesItems = ''
        user.repositories.forEach(repo => repositoriesItems += `
        <li><a href="${repo.html_url}" target="_blank">${repo.name}
            <div class="repository-infos">
                <p>🍴 ${repo.forks_count}</p>
                <p>⭐ ${repo.stargazers_count}</p>
                <p>👀 ${repo.watchers_count}</p>
                <p>💻 ${repo.language ?? '---'}</p>
            </div>
        </a></li>`);

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItems}</ul>
            </div>`
        };

        let eventsList = user.events.filter(event => event.type === 'PushEvent' || event.type === 'CreateEvent')
        let eventsItems = ''
        eventsList.forEach((event) => {
            if(event.payload.commits){
                eventsItems += `<li><h4>${event.repo.name}</h4>  <p>- ${event.payload.commits[0].message}</p></li>`
            } else{
                eventsItems += `<li><h4>${event.repo.name}</h4>  <p>- evento sem commit.</p></li>`
            }
        });
        if(user.events.length > 0){
            this.userProfile.innerHTML += `
            <div class="events section">
                <h2>Eventos</h2>
                <ul>${eventsItems}</ul>
            </div>`
        };
    },
    renderNotFound(){
        this.userProfile.innerHTML =`
        <h3>Usuário não encontrado.</h3>`
    }
}

export { screen }