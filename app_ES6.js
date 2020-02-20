class Book{
    constructor(title, author ,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    static isAlerted =false;
    addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
    
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
    
        list.appendChild(row);
        //console.log(row);
    }
    
    deleteBook(target){
        if(target.className==='delete'){
            target.parentElement.parentElement.remove();
            Store.removeBookFromStorage(target.parentElement.parentElement.lastElementChild.previousElementSibling.textContent);
        }
    }

    clearFields(){
        document.getElementById('title').value= '';
        document.getElementById('author').value= '';
        document.getElementById('isbn').value = '';
    }
    showAlert = function(msg,className){
        if(UI.isAlerted === false ) 
        {   UI.isAlerted =true;
            const div =document.createElement('div');
            div.className=`alert ${className}`;
            div.appendChild(document.createTextNode(msg));
            const container = document.querySelector('.container');
            const form =document.querySelector('#book-form');
            container.insertBefore(div,form);
        
            setTimeout(function(){        
                document.querySelector('.alert').remove();
                UI.isAlerted=false;
                // console.log(this.isAlerted);
            },3000)
        }
    }

}
class Store{
    static getBooks(){
        let books =localStorage.getItem('books') ;
        if( books=== null){
            books =[];
        }else{
            books=JSON.parse(books);
        }

        return books;

    }
    static displayBooks(){
        const books =Store.getBooks();
        const ui = new UI();
        books.forEach(element => {
        
            ui.addBookToList(element);
        });
       
    }   
    
    static addBookToStorage(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBookFromStorage(isbn){
        const books = Store.getBooks();
       // console.log(isbn);
        books.forEach(function(element,index) {
            if(element.isbn ===isbn){
                books.splice(index ,1);
            }

        });
        localStorage.setItem('books',JSON.stringify(books));
    }
    

    

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
            Store.addBookToStorage(newBook);
        }else{
            ui.showAlert('Please fill in all fields','error');
        }
        
        e.preventDefault();
    } );
    
document.getElementById('book-list').addEventListener('click',function(e){
        const ui = new UI();
        if(e.target.className==='delete'){
            ui.deleteBook(e.target);
            ui.showAlert('Book Removed','success');
        }
        e.preventDefault();
});
document.addEventListener('DOMContentLoaded',Store.displayBooks);
