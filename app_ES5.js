
function Book(title ,author ,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

document.getElementById('book-form').addEventListener('submit', function (e){
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
        const ui = new UI();
        const newBook = new Book(title,author,isbn);
        if(title && author && isbn){
            ui.addBookToList(newBook);
            ui.showAlert('Book Added','success');
            ui.clearFields();
        }else{
            ui.showAlert('Please fill in all fields','error');
        }
        
        e.preventDefault();
    } );
    
document.getElementById('book-list').addEventListener('click',function(e){
        const ui = new UI();
        ui.deleteBook(e.target);
        ui.showAlert('Book Removed','success');
        e.preventDefault();
});


function UI(){}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.author}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
    console.log(row);
}
UI.prototype.deleteBook = function(target){
    if(target.className==='delete')target.parentElement.parentElement.remove();
}
UI.prototype.clearFields = function(){
    document.getElementById('title').value= '';
    document.getElementById('author').value= '';
    document.getElementById('isbn').value = '';
}
UI.prototype.isAlerted =false;

UI.prototype.showAlert = function(msg,className){
    if(UI.prototype.isAlerted === false ) 
    {   UI.prototype.isAlerted =true;
        const div =document.createElement('div');
        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        const form =document.querySelector('#book-form');
        container.insertBefore(div,form);
    
        setTimeout(function(){        
            document.querySelector('.alert').remove();
            UI.prototype.isAlerted=false;
            // console.log(this.isAlerted);
        },3000)
    }
}

function Store(){}

Store.prototype.displayBooks = function(){
    const books =Store.getBooks();
    const ui = new UI();
    books.forEach(element => {
    
        ui.addBookToList(element);
    });
  

}
Store.prototype.addBookToStorage = function (book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
}