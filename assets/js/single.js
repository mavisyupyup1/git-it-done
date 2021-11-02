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
    }
};
getRepoIssues("facebook/react");