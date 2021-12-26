class PrintEditionItem {
    constructor(name, releaseDate, pagesCount, state=100, type=null) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = state;
        this.type = type;
    }

    set state(num) {
        if (num < 0) {
            this.state = 0;
        } else if (num > 100) {
            this.state = 100;
        } else {
            this._state = num;
        }
   }

    get state() {
       return this._state;
   }
      
}

PrintEditionItem.prototype.fix = function() {
    this.state *= 1.5;
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount, state, type) {
        super(name, releaseDate, pagesCount, state, type);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount, state, type) {
        super(name, releaseDate, pagesCount, state, type);
        this.author = author;
        this.type = "book";
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount, state, type) {
        super(author, name, releaseDate, pagesCount, state, type);
        this.author = author;
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount, state, type) {
        super(author, name, releaseDate, pagesCount, state, type);
        this.author = author;
        this.type = "fantastic";
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount, state, type) {
        super(author, name, releaseDate, pagesCount, state, type);
        this.author = author;
        this.type = "detective";
    }
}

const book1 = new PrintEditionItem('title', '2021-12-25', 675, 400);
// book1.fix();
// console.log(book1)

const mag1 = new Magazine('tit', '12.12.21', 42, 12);
// mag1.fix();
// console.log(mag1);

const book2 = new Book('А. Сапковский','Меч Предназначения', 1992, 384);
// book2.fix();
// console.log(book2);

const picknick = new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168,
    90
  );

// picknick.fix();
// console.log(picknick); //"Аркадий и Борис Стругацкие"
// picknick.state = 10;
// console.log(picknick.state); //10
// picknick.fix();
// console.log(picknick.state); //15


class Library {
    constructor (name=String, books=[]) {
        this.name = name;
        this.books = books;
    }
}

Library.prototype.addBook = function(book) {
    if (book.state > 30) {
        this.books.push(book);
    }
}

Library.prototype.findBookBy = function(type, value) {
    let result;
    this.type = type;
    this.value = value;

    for (let i = 0; i < this.books.length; i++) {
        if (this.books[i][this.type] === this.value) {
            result = this.books[i];
        } 
    }
    
    if (result === undefined) {
        return null;
    } else {
        return result;
    }
}

Library.prototype.giveBookByName = function(bookName) {
    let result;
    this.bookName = bookName;

    for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].name === this.bookName) {
            result = this.books.pop(this.books[i]);
        } 
    }

    if (result === undefined) {
        return null;
    } else {
        return result;
    }
    
}

const library = new Library("Библиотека имени Ленина");

library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);

// library.addBook(new PrintEditionItem('Типовой школьный журнал', 2019, 102));

library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

// console.log(library.findBookBy("name", 'Типовой школьный журнал')); //null
// console.log(library.findBookBy("releaseDate", 1924)); //"Мурзилка"

// console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
// console.log(library.giveBookByName("Машина времени"));
// console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3


class Student {
    constructor (name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.marks = [];
    }
}

let student1 = new Student('Bob', 'male', 19);
let student2 = new Student('Tom', 'male', 21);
let student3 = new Student('Amily', 'female', 20);


Student.prototype.addMark = function (mark, subject) {
    if (mark >= 1 && mark <= 5) {
            if (subject in this.marks) {
                this.marks[subject].push(mark)
            } else {
                this.marks[subject] = [mark];
            }
    } else {
        console.log("Ошибка, оценка должна быть числом от 1 до 5");
    }
}


Student.prototype.getAverage = function() {
    let sum = 0;
    let count = 0;

    valuesList = Object.values(this.marks);
    for (i = 0; i < valuesList.length; i++) {
        for (j = 0; j < valuesList[i].length; j++){
            sum += valuesList[i][j];
            count++
        }
    }
    return sum / count;
}

Student.prototype.getAverageBySubject = function(subject) {
    this.subject = subject;
    let sumSubject = 0;

    if (subject in this.marks) {
        for ( i = 0; i < this.marks[subject].length; i++){
            sumSubject += this.marks[subject][i];
        }
    }

    return sumSubject / this.marks[subject].length;
}

// student2.addMark(5, "algebra");
// student2.addMark(5, "Math");
// student2.addMark(4, 'Math');
// student2.addMark(3, 'lang');
// student2.getAverage();
// console.log(student2.getAverageBySubject("Math"));
// console.log(student2);