var issueContainerEl = document.querySelector("#issues-container");
var getRepoIssues = function (repo){
    console.log(repo);
    //creating a variable to hold the query for repo
    var apiUrl = "https://api.github.com/repos/" + repo +"/issues?direction=asc"
    fetch(apiUrl).then(function(response){
        //request was successful
        if(response.ok){
            response.json().then(function(data){
            //pass response data to dom function
            displayIssues(data);
            })
        }else{
            alert("There was a problem with your request!")
        }
    });
}

// adding function that accepts a parameter called issues
var displayIssues = function(issues){
    for(var i=0; i<issues.length; i++){
        //create a link element to take users to the issues on github
        var issueEl = document.createElement("a");
        issueEl.classList="list-item flex-tow justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target","_blank");
        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        // append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");
        //check if issues is an actual issue or a pull request
        if(issues[i].pull_request){
            typeEl.textContent ="(Pull request)";
        } else{
            typeEl.textContent ="(Issue)";
        }
//append to container
issueEl.appendChild(typeEl);
issueContainerEl.appendChild(issueEl);
    }
};
getRepoIssues("facebook/react");