//creating elements to store a reference
var userFormEl = document.querySelector("#user-form");
var nameInputEl =  document.querySelector("#username");
// creating variables to reference the DOM elements to write data into
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
console.log(repoContainerEl);

// creating a form submit handler function to be executed upon a form submission event
var formSubmitHandler = function(event){
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();
    if(username){
        getUserRepos(username);
        nameInputEl.value = "";
    } else{
        alert("Please enter a GitHub username!");
    }
    console.log(event);
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
getUserRepos();

//creating a function to accept array from repo and the terms to search for as parameters
var displayRepos = function(repos, searchTerm){
    console.log(repos);
    console.log(searchTerm);
    console.log(repoContainerEl);
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
   
    for(var i = 0; i<repos.length; i++){
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // adding expression to create a new href attribute;
        repoEl.setAttribute("href","./single-repo.html");

        //create a span element to hold repository name
        var titleEl = document.createElement("span")
        titleEl.textContent=repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);
            //create a status element
    var statusEl =document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not
    if(repos[i].open_issues_count>0){
        statusEl.innerHTML ="<i class = 'fas fa-times status-icon icon-danger'> <i>" + repos[i].open_issues_count + " issue(s)";
    } else {
        statusEl.innerHTML ="<i class='fas fa-check-square status-icon icon-success'><i>";
    }
    //append to container
    repoEl.appendChild(statusEl);

    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    
    }
};

//add submit event listener
userFormEl.addEventListener("submit", formSubmitHandler);