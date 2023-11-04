let searchBtn = document.querySelector('#searchBtn');
let searchUser = document.querySelector('#searchUser');
let ui = new UI();

searchBtn.addEventListener('click', (e) => {
    let userText = searchUser.value;
    if (userText != '') {
        // Create promises for GitHub and Codeforces requests
        const githubPromise = fetch(`https://api.github.com/users/${userText}`).then(result => result.json());
        const codeforcesPromise = fetch(`https://codeforces.com/api/user.info?handles=${userText}`).then(result => result.json());

        //console.log(codeforcesPromise);

        // Use Promise.all to wait for both responses
        Promise.all([githubPromise, codeforcesPromise])
            .then(([githubData, codeforcesData]) => {
                if (githubData.message == 'Not Found' && codeforcesData.status == 'FAILED') {
                    // Show an alert for both services if the user is not found
                    ui.showAlert('User not found on GitHub and Codeforces', 'alert alert-danger');
                } else if (githubData.message == 'Not Found') {
                    // Show an alert for GitHub if the user is not found
                    //ui.showAlert('User not found on GitHub', 'alert alert-danger');
                    githubData.login = undefined;
                    ui.showProfileGithub(githubData);
                    ui.showProfileCf(codeforcesData);
                } else if (codeforcesData.status == 'FAILED') {
                    // Show an alert for Codeforces if the user is not found
                    //ui.showAlert('User not found on Codeforces', 'alert alert-danger');
                    //codeforcesData.handle = undefined;
                    //console.log(codeforcesData);
                    ui.showProfileCf(codeforcesData);
                    ui.showProfileGithub(githubData);
                }                
                else {
                    // Show profiles for both services
                    ui.showProfileGithub(githubData);
                    ui.showProfileCf(codeforcesData);
                }
            })
            .catch(error => {
                console.error(error);
                ui.showAlert('An error occurred while fetching data', 'alert alert-danger');
            });
    } else {
        // Clear the profile if the input is empty
        ui.clearProfile();
    }
});
