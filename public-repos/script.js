//Setup submit button
let button = document.querySelector('input[type="submit"]')
button.addEventListener('click', showData)

var user = document.querySelector('#user')
var u = new URL(window.location.href);
var c = u.searchParams.get("user");
var s = document.querySelector('.warning')


//if user comes from param make disable the input box
if(c != null) {
    user.value = `${c}`;
    user.style.display = "none";
    user.style.color = "red"
    s.style.display = "block";
    button.style.display = "none";
    window.addEventListener('load', showData())
}

////////////////////////////////////////////////////////
// Spinner by https://codepen.io/AshutoshD/pen/dMEGqM //
////////////////////////////////////////////////////////

function showSpinner(div) {
    console.log(div)
  div.style.visibility = "visible";
  
}

function hideSpinner(div) {
    div.style.visibility = "hidden";
}

///////////////
// Show Data //
///////////////

function showData() {

    //show spinner
    var loadingDiv = document.getElementById('loading');
    showSpinner(loadingDiv);

    //tokens
    let cid = "ec569ac44c7094ee0173";
    let cs = "6a39853312e1467b8331b7106e0be31b9f01250e";

    // Get objects for function
    let tbody = document.querySelector('tbody')
    let repocount = document.querySelector('#repo-count'); // h2 tag

    let url = `https://api.github.com/users/${user.value}/repos?per_page=100&client_id=${cid}&client_secret=${cs}`;

    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {

        //Add the repo username and repo number between 2 big lines
        repocount.innerHTML = `
            User: ${user.value} has ${myJson.length} repositories.
        `

        //Add data to table
        let tableStuff = "";

        for (let x of myJson) {

            hideSpinner(loadingDiv);

            let description = "";

            if (x.description !== null) {
                description = `<small style="color: #06c; font-weight: bold">${x.description}</small>`
            } else {
                description = `<small style="color: red;">No Description</small>`;
            }

            let pages = "";

            if (x.has_pages == true) {
                pages = `<br><br><a class="btn btn-info" style="width: 100%" href="https://${user.value}.github.io/${x.name}" target="_blank">Has Pages</a>`
            }

            tableStuff += `
                <tr><td>${x.name}<br>${description}</td>
                <td><a class="btn btn-primary" style="width: 100%" href="${x.html_url}" target="_blank">View on Github</a>${pages}</td></tr>
                `
        }

        tbody.innerHTML = tableStuff;

    });
}
