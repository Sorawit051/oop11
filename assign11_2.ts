classDiagram
    class Library {
        -books: Book[]
        -members: Member[]
        +addBook(book: Book): void
        +registerMember(member: Member): void
    }

    class Book {
        <<abstract>>
        -title: string
        -author: string
        -isbn: string
        -isAvailable: boolean
        +borrowBook(): boolean
        +returnBook(): void
        +getDetails()* string
    }

    class PrintedBook {
        -numPages: number
        +getDetails(): string
    }

    class EBook {
        -fileSizeMB: number
        +getDetails(): string
    }

    class Member {
        -memberId: string
        -name: string
        -borrowedBooks: Book[]
        +borrow(book: Book): void
        +return(book: Book): void
        +listBorrowedBooks(): void
    }

    Library o-- "*" Book
    Library o-- "*" Member
    Book <|-- PrintedBook
    Book <|-- EBook
    Member --> "*" Book