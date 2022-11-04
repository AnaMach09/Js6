// ajax
// 1. xml http requist
// 2. fetch

// function getUsers() {
//   let requist = new XMLHttpRequest();

//   requist.addEventListener("load", function () {
//     let pasuxiText = this.responseText;
//     let pasuxiJs = JSON.parse(pasuxiText);

//     let ul = document.createElement('ul');
//     let li = document.createElement('li');
//     li.textContent = pasuxiJs.data[3].email;
//     ul.appendChild(li);

//     // pasuxiJs.data.forEach(element => {
//     //   let li = document.createElement('li');
//     //   li.textContent = `${element.first_name} ${element.last_name}`;
//     //   ul.appendChild(li);
//     // });

//     document.getElementById('userinfo').appendChild(ul);
//   });

//   requist.addEventListener('error', function() {
//     let p = document.createElement('p');
//     p.textContent = 'Page Not found';

//     document.getElementById('userinfo').appendChild(p);
//   })

//   requist.open("GET", "https://reqres.in/api/users?page=2");
//   requist.send();
// }

// getUsers();

// 2. fetch
let currentPage = 1;
let totalPages;

function getUsersFunction(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responseTextInfo) {
      if (responseTextInfo.status !== 200) {
        throw responseTextInfo.status;
      }
      return responseTextInfo.json();
    })
    .then(function (resposnseJsData) {
     
      const fragment = new DocumentFragment();

      resposnseJsData.data.forEach((element) => {
        let li = document.createElement("li");
        
        li.textContent = `${element.first_name} ${element.last_name}`;
        fragment.appendChild(li);
      });

      document.getElementById('list-users').innerHTML = ' ';
      document.getElementById('list-users').appendChild(fragment);
      totalPages = resposnseJsData.total_pages;

      // let li = document.createElement("li");
      // li.textContent = resposnseJsData.data[3].email;
      // ul.appendChild(li);
      // document.getElementById("userinfo").appendChild(ul);
    })
    .catch(function (error) {
      if (error == 404) {
        let p = document.createElement("p");
        p.textContent = "Page Not found";

        document.getElementById("userinfo").appendChild(p);
      } else if (error == 500) {
        let p = document.createElement("p");
        p.textContent = "Server Error";

        document.getElementById("userinfo").appendChild(p);
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
  getUsersFunction(currentPage);
})

document.getElementById('loadnext').addEventListener('click', function() {
  if (currentPage == totalPages) {
    return;
  }
  // currentPage++;
  // currentPage = currentPage + 1;
  currentPage += 1;
  getUsersFunction(currentPage);
})

getUsersFunction(currentPage);