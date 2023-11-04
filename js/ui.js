class UI {
  constructor() {
    this.githubProfile = document.querySelector("#github-profile");
    this.cfProfile = document.querySelector("#codeforces-profile");
  }

  showProfileGithub(user) {
    //console.log(user.result[0].handle);
    this.clearAlert();
    if(user.login == undefined) {
        this.githubProfile.innerHTML = `
            <h3>User not found on GitHub</h3>
            <div class="card card-body mb-3">Oops!</div>
        `;
    } else {
    this.githubProfile.innerHTML = `
            <h3>${user.login}'s GitHub Profile</h3>
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatar_url}">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Public Followers: ${user.followers}</span>
                        <span class="badge badge-info">Public Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Name: ${user.name}</li>
                            <li class="list-group-item">Bio: ${user.bio}</li>
                            <li class="list-group-item">Email: ${user.email}</li>
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
  }}

  showProfileCf(user) {
    console.log(user.status);
    this.clearAlert();
    if(user.status == "FAILED") {
        this.cfProfile.innerHTML = `
                <h3>User not found on CodeForces</h3>
                <div class="card card-body mb-3">Oops!</div>
            `;
    } else {
        let person = user.result[0];
    this.cfProfile.innerHTML = `
                <h3>${person.handle}'s CF Profile</h3>
                <div class="card card-body mb-3">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="img-fluid mb-2" src="${person.titlePhoto}">
                            <a href="https://codeforces.com/profile/${person.handle}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <ul class="list-group">
                                <li class="list-group-item">Name: ${person.firstName} ${person.lastName}</li>
                                <li class="list-group-item">Rank: ${person.rank}</li>
                                <li class="list-group-item">Current Rating: ${person.rating}</li>
                                <li class="list-group-item">Max Rank: ${person.maxRank}</li>
                                <li class="list-group-item">Max Rating: ${person.maxRating}</li>
                                <li class="list-group-item">Email: ${person.email}</li>
                                <li class="list-group-item">Organization: ${person.organization}</li>
                                <li class="list-group-item">Location: ${person.city}, ${person.country}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
  }}

  clearProfile() {
    this.githubProfile.innerHTML = "";
    this.cfProfile.innerHTML = "";
  }

  showAlert(message, className) {
    this.clearAlert();
    this.clearProfile();
    let div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".searchContainer");
    let search = document.querySelector(".search");
    container.insertBefore(div, search);
  }

  clearAlert() {
    let currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }
}
