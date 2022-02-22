const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
   const resp = await fetch(APIURL + username);
   const respData = await resp.json();

   createUserCard(respData);

   getRepos(username);
}

async function getRepos(username) {
   const resp = await fetch(APIURL + username + "/repos");
   const respData = await resp.json();

   addReposToCard(respData);
}

getUser("sir-rumeh");//remove this

function createUserCard(user) {
   const card = document.createElement("div");
   card.classList.add("card");

   const cardHTML = `
      <div class="card">
         <div class="img-container">
            <img class="avatar" src= "${user.avatar_url}" alt = "${user.name}" style=""/>
         </div>

         <div class="user-info">
            <h2>${user.name}</h2>
            
            <hr/>
            <p>${user.bio}</p>

            <ul class="info" >
               <li>${user.followers}<strong>followers</strong></li>
               <li>${user.following}<strong>following</strong></li>
               <li>${user.public_repos}<strong>repos</strong></li>
            </ul>

            <h4 style="text-decoration: underline;">public repositories:</h4>

            <div class="repos" id="repos">

            </div>
            
         </div>
      </div>
   `;

   

   main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
   const reposEl = document.getElementById("repos");

   repos.sort((a, b) => b.stargazers_count - a.stargazers_count).forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
   });
}

form.addEventListener("submit", (e) => {
   e.preventDefault();

   let user = search.value;

   if (user) {
      getUser(user);

      search.value = "";
   }
});