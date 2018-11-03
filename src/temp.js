const user = (value, token) => {
  return {
    value,
    token
  };
};

const createUser = (u, t) => user(u, t);
const githubURL = (value, token) =>
  `https://api.github.com/users/${value}/repos?per_page=100&token=${token}`;

const getData = async () => {
  const jwknz = createUser("jwknz", "11954287ba50fa44ba661d04b0b3516ad0643a38");
  const { value, token } = jwknz;
  const ghlink = githubURL(value, token);

  const response = await fetch(ghlink);
  const data = await response.json();

  //console.log(data);
  return data;
};

//getData().then(data => data.map(d => console.log(d.full_name)));
const showOnDOM = () => {
  const tbody = document.querySelector("tbody");

  getData().then(data =>
    data.map(d => {
      let description = "";

      if (d.description !== null) {
        description = `<small style="color: #06c; font-weight: bold">${
          d.description
        }</small>`;
      } else {
        description = `<small style="color: red;">No Description</small>`;
      }

      let pages = "";

      if (d.has_pages === true) {
        pages = `<br><br><a class="btn btn-info" style="width: 100%" href="https://jwknz.github.io/${
          d.name
        }" target="_blank">Has Pages</a>`;
      }

      return (tbody.innerHTML += `
      <tr>
        <td>${d.name}<br>${description}</td>
        <td><a class="btn btn-primary" style="width: 100%" href="${
          d.html_url
        }" target="_blank">View on Github</a>${pages}</td>
      </tr>`);
    })
  );
};

showOnDOM();
