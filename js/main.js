var bookmarkNameInput = document.getElementById("name");
var bookmarkURLInput = document.getElementById("url");

var addButton = document.getElementById("addBtn");
var errorMsg = document.getElementById("errorMsg");
var bookmarksTable = document.getElementById("tableContent");

var urlRegex = /^(https?:\/\/|www\.)\w+\.\w{2,}(\/.*)?$/;

var KEY = "bookmarks";
var bookmarks = JSON.parse(localStorage.getItem(KEY)) || [];
displayBookmarks();

function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
}

function addBookmark() {
  var siteName = bookmarkNameInput.value.trim();
  var siteURL = bookmarkURLInput.value.trim();

  if (!siteName || !siteURL) {
    alert("Both fields are required.");
    return;
  }

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name === siteName) {
      alert("This bookmark already exists.");
      return;
    }
  }

  if (!siteName || siteName.trim() === "") {
    alert("Website name is required.");
    return;
  }
  

  if (!urlRegex.test(siteURL)) {
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");

  var bookMark = { name: siteName, url: siteURL };

  bookmarks.push(bookMark);
  localStorage.setItem(KEY, JSON.stringify(bookmarks));
  displayBookmarks();
  clearForm();
}

function displayBookmarks() {
  var cartona = "";
  for (var i = 0; i < bookmarks.length; i++) {
    cartona += 
    `<tr>
    <td>${i + 1}</td>
    <td>${bookmarks[i].name}</td>
    <td>
      <!-- Visit Button -->
      <button onclick="visitBookmark(${i})" class="btn btn-visit">
        <i class="fa-solid fa-eye pe-2"></i>Visit
      </button>
    </td>
    <td>
      <!-- Delete Button -->
      <button onclick="deleteBookmark(${i})" class="btn btn-delete pe-2">
        <i class="fa-solid fa-trash-can"></i> Delete
      </button>
    </td>
  </tr>`; 
  }
  bookmarksTable.innerHTML = cartona;
}


function visitBookmark(index) {
  var siteURL = bookmarks[index].url;
  var fullURL = siteURL.startsWith("http") ? siteURL : "https://" + siteURL;
  window.open(fullURL, "_blank");
}


function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(bookmarks));
  displayBookmarks();
}

addButton.addEventListener("click", addBookmark);



