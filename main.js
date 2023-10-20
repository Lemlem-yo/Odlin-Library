let openModelButtons = document.querySelectorAll('[data-model-targer]');
let overlay = document.getElementById("overlay");
let modal;

//
let form = document.getElementById("newForm");
let author = document.getElementById("author");
let title = document.getElementById("title");
let pages = document.getElementById("pages");
let isRead = document.getElementById("isRead");
let book = document.getElementById("book");



openModelButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    console.log("Button clicked"); // Debugging line
    modal = document.querySelector('.newForm');
    console.log(modal);
    openModal();
  });
});

let openModal = () => {
  
  if (modal == null) return;
  console.log("Opening modal"); // Debugging line
  modal.classList.add('active');
  overlay.classList.add('active');
  
  // Add an event listener to close the modal when clicking outside
  overlay.addEventListener("click", closeModal);

   // Add an event listener to the submit button to close the modal after a successful operation
   const submitButton = modal.querySelector(".submit");
   submitButton.addEventListener("click", handleSuccessfulSubmit);
};

let handleSuccessfulSubmit = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;

  if (title.trim() === '' || author.trim() === '' || isNaN(pages) || pages === ''){
    console.log("validation failed");
  }else{
    closeModal();
    console.log("validation success");
  }
 
};


let closeModal = () => {
  if (modal !== null && overlay !== null) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    overlay.removeEventListener("click", closeModal);
  }
}
// Add newbooklist on the desktop 

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  acceptBook();
})

let Book = [];
  
let acceptBook = ()=>{
  Book.push({
    title: title.value,
    author: author.value,
    pages: parseInt(pages.value),
    isRead: isRead.checked,  
  })
  
  localStorage.setItem("Book", JSON.stringify(Book));
  console.log(Book);
  addBookToLibrary();
};

let addBookToLibrary = ()=>{  
  book.innerHTML = "";
  Book.map((x, y)=>{

    return(
      book.innerHTML += 
      `
       <div class="add-new-book" id=${y}>
          <p>${x.title}</p>
            <p>${x.author}</p>
            <p>${x.pages + " "+ "pages"}</p>
            <button class="read-or-not">${x.isRead ? "Read" : "Not Read"}</button>
            <button onclick="editBook(this)" class="edit">Edit</button>
            <button onclick="deleteBook(this); addBookToLibrary()" class="remove">Remove</button>
           
        </div> 
       `
    );

  } )

  
  resetSubmit();
  
};

let resetSubmit = ()=>{
  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.checked = false;
};

let toggleRead = (readButton) => {
  let read = readButton.parentElement.querySelector(".read-or-not");
  read.innerHTML = read.innerHTML === "Read" ? "Not Read" : "Read";
  read.classList.toggle('red');
};


let deleteBook = (e)=> {
  e.parentElement.remove();
  Book.splice(e.parentElement.id, 1);
  localStorage.setItem("Book", JSON.stringify(Book));
  console.log("deleted")
};

let editBook = (e)=>{
  openModal();
  let selectdTask = e.parentElement;
  title.value = selectdTask.children[0].innerHTML
  author.value = selectdTask.children[1].innerHTML
  const pagesValue = selectdTask.children[2].innerHTML.replace("pages", "");
  pages.value = pagesValue;

  isRead.checked = selectdTask.children[3].innerHTML
 


  deleteBook(e);
}; 

(()=> {
  Book = JSON.parse(localStorage.getItem("Book")) || []; 
  addBookToLibrary();
   
})()