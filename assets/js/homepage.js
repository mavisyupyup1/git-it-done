//creating elements to store a reference
var userFormEl = document.querySelector("#user-form");
var nameInputEl =  document.querySelector("#username");
// creating variables to reference the DOM elements to write data into
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons");

// creating a form submit handler function to be executed upon a form submission event
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

var getUserRepos = function(user){
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos"

    //make a request to the url
    // editing this so JSON data will be sent from getUserRepos() to displayRepos()
   fetch(apiUrl)
   .then(function(response){
       // request was successful
    if(response.ok){
       response.json().then(function(data){
           //console.log(data);
        // editing this so JSON data will be sent from getUserRepos() to displayRepos()
            displayRepos(data,user);  
       });
    }else {
        alert("Error: GitHub User Not Found");
    }
    }) 
    .catch(function(error){
        // notice this '.catch()' getting chained on to the end of '.then()' method
        alert("Unable to connect to GitHub.");
    
   });
}


//creating a function to accept array from repo and the terms to search for as parameters
var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

var getFeaturedRepos = function(language){
    var apiUrl ="https://api.github.com/search/repositories?q=" + language +"+is:featured&sort=help-wanted-issues";
    fetch(apiUrl).then(function(response){
        if(response.ok){
           response.json().then(function(data){
              displayRepos(data.items,language);
           });
        } else {
            alert('Error: GitHub User Not Found');
        }
    })
};
var buttonClickHandler = function(event){
    var language = event.target.getAttribute("data-language");
    console.log(language);
    if(language){
        getFeaturedRepos(language);
        
        //clear old content. this is to clear out any remaining text from the repo container
        repoContainerEl.textContent = "";
    }
}
//add submit event listener
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click",buttonClickHandler);