#!/usr/bin/env node

import axios from 'axios';
import promptSync from 'prompt-sync';
import inquirer from 'inquirer';

const index = () => {
    return 'hello';
}
const index1 = () => {
    return 'hello1';
}
export { index, index1 };


let readingLists = {};

// console.log('Welcome to this Google Books API CLI app!');
// async function main() {
//     console.log()
//     const userAction = await inquirer.prompt({
//         name: 'action',
//         type: 'list',
//         message:'What would you like to do?',
//         choices: [
//             "Search for books",
//             "View reading lists",
//             "Quit application"
//         ]
//     })
//     if (userAction.action == "Search for books") {
//         searchBooks();
//     } else if (userAction.action == "View reading lists") {
//         viewReadingLists();
//     } 
// }
// main()




// function searchBooks() {
//     let prompt = promptSync();
//     let search = prompt('Enter a search query: ')
//     while (!search){
//         console.log("Please enter a valid search term.");
//         search = prompt('Enter a query: ');
//     }
//     let url = `https://www.googleapis.com/books/v1/volumes?q=${search}`
//     retrieveBooks(url)
// }


// const retrieveBooks = (url) => {
//     axios.get(url).then(function (response) {
//         addBooksToList(response.data)
//     });
// }


// async function addBooksToList(data) {
//     try {
//         let numberOfResults = (data.items).length
//         let searchResults = []
//         for (let i=0; i<(numberOfResults >=5 ? 5 : numberOfResults); i++) {
//             searchResults.push(`"${data.items[i].volumeInfo.title}" by ${data.items[i].volumeInfo.authors}, published by ${data.items[i].volumeInfo.publisher}.`)
//         }

//         const book = await inquirer.prompt({
//             name: 'bookData',
//             type: 'list',
//             message:'Select a book to add to a reading list',
//             choices: searchResults
//         })
//         const list = await inquirer.prompt({
//             name: 'listOptions',
//             type: 'list',
//             message:'Which reading list should it be saved to: ',
//             choices: [...Object.keys(readingLists), "New List"]
//         })
//         if (list.listOptions == "New List") {
//             let title = makeList()
//             addBookToList(book.bookData, title)
//         } else {
//             addBookToList(book.bookData, list.listOptions)
//         }
//         console.log("Book successfully added")
//     } catch {
//         console.log('Invalid search term.')
//     }
//     main()
// }


// function addBookToList(book, list) {
//     readingLists[list].push(book)
// }


function makeList() {
    let prompt = promptSync();
    let title = ''
    while (title == '') {
        title = prompt('Enter the list title: ') // account for if user enters no title
        if (title == '') {
            console.log('Please enter a valid title')
        }
    }
    readingLists[title] = []
    return title
}

export { makeList }


// async function viewReadingLists() {
//     const list = await inquirer.prompt({
//         name: 'readingLists',
//         type: 'list',
//         message:'Reading Lists:',
//         choices: ["New List", ...Object.keys(readingLists)],
//     })
//     if (list.readingLists == "New List") {
//         makeList()
//     } else {
//         console.log(`List: ${list.readingLists}`)
//         console.log(readingLists[list.readingLists])
//     }
//     main()
// }
