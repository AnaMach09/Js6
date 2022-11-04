

// davaleba1




function getUser() {
  let requist = new XMLHttpRequest();

  requist.addEventListener("load", function () {
    let pasuxiText = this.responseText;
    let pasuxiJs = JSON.parse(pasuxiText);

    let ul = document.createElement('ul');
    let li = document.createElement('li');
    li.textContent = pasuxiJs.data.name;
    ul.appendChild(li);

    pasuxiJs.data.forEach(element => {
      let li = document.createElement('li');
      li.textContent = `${element.name} ${element.year}`;
      ul.appendChild(li);
    });

    document.getElementById('username').appendChild(ul);
  });

  requist.addEventListener('error', function() {
    let p = document.createElement('p');
    p.textContent = 'Page Not found';

    document.getElementById('username').appendChild(p);
  })

  requist.open("GET", "https://reqres.in/api/unknown");
  requist.send();
}

getUser();




// 2. fetch
let currentPage = 1;
let totalPages;

function get(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (TextInfo) {
      if (TextInfo.status !== 200) {
        throw TextInfo.status;
      }
      return TextInfo.json();
    })
    .then(function (textJsData) {
     
      const fragment = new DocumentFragment();

      textJsData.data.forEach((item) => {
        let li = document.createElement("li");
        li.textContent = `${item.first_name} ${item.last_name}`;
        let image = document.createElement('img');
        image.src = item.avatar;
        fragment.appendChild(li);
        fragment.appendChild(image);
      });

      document.getElementById('list-users').innerHTML = ' ';
      document.getElementById('list-users').appendChild(fragment);
      totalPages = textJsData.total_pages;
    })
    .catch(function (error) {
      if (error == 404) {
        let p = document.createElement("p");
        p.textContent = "Page Not found";

        document.getElementById("username").appendChild(p);
      } else if (error == 500) {
        let p = document.createElement("p");
        p.textContent = "Server Error";

        document.getElementById("username").appendChild(p);
      }
    });
}

document.getElementById('loadprevius').addEventListener('click', function() {
  if (currentPage == 1) {
    return;
  }
  // currentPage--;
  // currentPage = currentPage - 1;
  currentPage -= 1;
  get(currentPage);
})

document.getElementById('loadnext').addEventListener('click', function() {
  if (currentPage == totalPages) {
    return;
  }
  // currentPage++;
  // currentPage = currentPage + 1;
  currentPage += 1;
  get(currentPage);
})

get(currentPage);

