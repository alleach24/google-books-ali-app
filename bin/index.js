#!/usr/bin/env node

import axios from 'axios';
import promptSync from 'prompt-sync';
import inquirer from 'inquirer';


let readingLists = {};

console.log('Welcome to this Google Books API CLI app!');
async function main() {
    const userAction = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message:'What would you like to do?',
        choices: [
            "Search for books",
            "View reading lists",
            "Quit application"
        ]
    })
    if (userAction.action == "Search for books") {
        searchBooks();
    } else if (userAction.action == "View reading lists") {
        viewReadingLists();
    } 
}
main()


function searchBooks() {
    let prompt = promptSync();
    let search = prompt('Enter a search query: ')
    while (!search){
        console.log("Please enter a valid search term.");
        search = prompt('Enter a query: ');
    }
    let url = `https://www.googleapis.com/books/v1/volumes?q=${search}`
    retrieveBooks(url)
}

const retrieveBooks = (url) => {
    axios.get(url).then(function (response) {
        addBooksToList(response.data)
    });
}

async function addBooksToList(data) {
    const book = await inquirer.prompt({
        name: 'bookData',
        type: 'list',
        message:'Select a book to add to a reading list',
        choices: [
            `"${data.items[0].volumeInfo.title}" by ${data.items[0].volumeInfo.authors}, published by ${data.items[0].volumeInfo.publisher}.`,
            `"${data.items[1].volumeInfo.title}" by ${data.items[1].volumeInfo.authors}, published by ${data.items[1].volumeInfo.publisher}.`,
            `"${data.items[2].volumeInfo.title}" by ${data.items[2].volumeInfo.authors}, published by ${data.items[2].volumeInfo.publisher}.`,
            `"${data.items[3].volumeInfo.title}" by ${data.items[3].volumeInfo.authors}, published by ${data.items[3].volumeInfo.publisher}.`,
            `"${data.items[4].volumeInfo.title}" by ${data.items[4].volumeInfo.authors}, published by ${data.items[4].volumeInfo.publisher}.`,
            // do later: handle if the data has less than 5 results
        ]
    })
    const list = await inquirer.prompt({
        name: 'listOptions',
        type: 'list',
        message:'Which reading list should it be saved to: ',
        choices: [...Object.keys(readingLists), "New List"]
    })
    if (list.listOptions == "New List") {
        let title = makeList()
        addBookToList(book.bookData, title)
    } else {
        addBookToList(book.bookData, list.listOptions)
    }
    console.log("Book successfully added")
    main()
}

function addBookToList(book, list) {
    readingLists[list].push(book)
}

function makeList() {
    let prompt = promptSync();
    let title = prompt('Enter the list title: ') // account for if user enters no title
    readingLists[title] = []
    return title
}


async function viewReadingLists() {
    const list = await inquirer.prompt({
        name: 'readingLists',
        type: 'list',
        message:'Reading Lists:',
        choices: Object.keys(readingLists), // handle for if there are no existing reading lists
    })
    console.log(`List: ${list.readingLists}`)
    console.log(readingLists[list.readingLists])
    main()
}
