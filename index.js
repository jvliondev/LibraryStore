const myLibrary = [];

function Book(title, author, pages, read, image) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.image = image;
    this.info = function() {
        return `${this.title}\nby ${this.author}\n${this.pages + ' pages'}\n${this.read ? 'read' : 'not read yet'}`;
    };
    this.toggleRead = function() {
        this.read = !this.read;
    };
}

const dialogElem = document.getElementById("dialog");
const showBtn = document.querySelector(".show");
const closeBtn = document.querySelector(".close");
const confirmBtn = document.getElementById("confirmBtn");
const bookForm = document.getElementById("bookForm");

function displayLibrary() {
    const librarySection = document.querySelector('.library');
    librarySection.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('libraryCard');
        
        const cardInner = document.createElement('div');
        cardInner.classList.add('cardInner');

        // Create the front of the card with the background image
        const front = document.createElement('div');
        front.classList.add('cardFront');
        front.style.backgroundImage = `url('${book.image}')`;
        cardInner.appendChild(front);

        // Create the back of the card with the book info
        const back = document.createElement('div');
        back.classList.add('cardBack');
        const bookInfo = document.createElement('p');
        bookInfo.classList.add('bookContent');
        bookInfo.textContent = book.info();
        back.appendChild(bookInfo);

        // Create the div wrapper for the toggle switch
        const switchWrapper = document.createElement('div');
        switchWrapper.classList.add('form-check', 'form-switch');

        const toggleSwitch = document.createElement('input');
        toggleSwitch.type = 'checkbox';
        toggleSwitch.checked = book.read;
        toggleSwitch.classList.add('toggleSwitch', 'form-check-input');
        toggleSwitch.id = 'flexSwitchCheckChecked';
        toggleSwitch.setAttribute('role', 'switch');

        toggleSwitch.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the card flip on toggle switch click
        });

        toggleSwitch.addEventListener('change', () => {
            book.toggleRead();
            bookInfo.textContent = book.info();
        });
        // Append the toggle switch to the wrapper
        switchWrapper.appendChild(toggleSwitch);
        back.appendChild(switchWrapper);

        cardInner.appendChild(back);

        const removeButton = document.createElement('button');
        // removeButton.textContent = backgroundImage('closeIcon.png');
        removeButton.classList.add('removeButton');
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the card flip on button click
            removeBookFromLibrary(index);
        });
        removeButton.style.backgroundImage = 'url("closeIcon.png")';
        removeButton.style.backgroundSize = 'contain';
        removeButton.style.backgroundRepeat = 'no-repeat';
        removeButton.style.backgroundPosition = 'center';
        removeButton.style.width = '24px';  // Adjust width as needed
        removeButton.style.height = '24px'; // Adjust height as needed
        removeButton.style.border = 'none';
        removeButton.style.cursor = 'pointer';
        
        card.appendChild(removeButton);

        card.appendChild(cardInner);
        librarySection.appendChild(card);

        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

showBtn.addEventListener('click', () => {
    dialogElem.showModal();
});

closeBtn.addEventListener('click', () => {
    dialogElem.close();
});

confirmBtn.addEventListener('click', () => {
    const titleInput = document.getElementById('Title');
    const authorInput = document.getElementById('Author');
    const pagesInput = document.getElementById('Pages');
    const yesInput = document.querySelector('input[name="read"][value="true"]');
    const noInput = document.querySelector('input[name="read"][value="false"]');
    const picInput = document.getElementById('picLink');
    
    let read = yesInput.checked ? true : false;

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const bookImage = picInput.value;

    addBookToLibrary(title, author, pages, read, bookImage);

    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    yesInput.checked = false;
    noInput.checked = false;
    picInput.value = '';

    dialogElem.close();
});

function addBookToLibrary(title, author, pages, read, image) {
    const newBook = new Book(title, author, pages, read, image);
    myLibrary.push(newBook);
    displayLibrary();
}

const permBook = new Book('The Hobbit','J.R.R. Tolkien','900', true, 'https://images.booksense.com/images/465/873/9780395873465.jpg');
myLibrary.push(permBook);
const permBook2 = new Book('ShakeSpear Sonnets','William Shakespear','704',true,'https://m.media-amazon.com/images/I/81yvP5Vne0L._AC_UF350,350_QL50_.jpg' );
myLibrary.push(permBook2);
displayLibrary();
