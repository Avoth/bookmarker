//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
// Save bookmark

function saveBookmark(e){
  //Values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  // Test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null){
    //Init array
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    //Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //Get from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmarks to array
    bookmarks.push(bookmark);
    //Re-set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //Clear form
  document.getElementById('myForm').reset;

  //Re-fetch bookmmarks
  fetchBookmarks();
  // Prevent form from submtting
  e.preventDefault();
}

//Delete bookmarks
function deleteBookmark(url){
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Loop throught bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  //Re-set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //Re-fetch bookmmarks
  fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks(){
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarkResults = document.getElementById('bookmarkResults');
  // Build output
  bookmarkResults.innerHTML = '';
  for(i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class = "well">'
                                +'<h3>'+name+
                                ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                '</h3>'+
                                '</div>';
  }
}

function validateForm(siteName, siteUrl){
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  if(!siteName || !siteUrl){
    alert('Please fill in the form!');
    return false;
  }
  return true;
}
