#!/usr/bin/env node

// const yargs = require("yargs");
// const axios = require("axios");
import axios from 'axios';
import promptSync from 'prompt-sync';
// const prompt = require('prompt-sync')();
import inquirer from 'inquirer';
import { read } from 'fs';


let readingLists = [];


console.log('Welcome to this Google Books API CLI app!');
async function main() {
    const userdo = await inquirer.prompt({
        name: 'do',
        type: 'list',
        message:'What would you like to do?',
        choices: [
            "Search for books",
            "View reading lists",
            "Quit application"
        ]
    })
    if (userdo.do == "Search for books") {
        console.log('You selected "Search for books"');
        searchBooks();
    } else if (userdo.do == "View reading lists") {
        console.log('You selected "View reading lists"');
        viewReadingLists();
    } 
}
main()


const retrieveBooks = (url) => {
    // console.log('hit retrieveBooks function')
    // console.log(url)
    axios.get(url).then(function (res) {
        addBooksToList(res.data)
    });
}
async function addBooksToList(data) {
    const book = await inquirer.prompt({
        name: 'viewBook',
        type: 'list',
        message:'Select a book to add to a reading list',
        choices: [
            `"${data.items[0].volumeInfo.title}" by ${data.items[0].volumeInfo.authors}, published by ${data.items[0].volumeInfo.publisher}.`,
            `"${data.items[1].volumeInfo.title}" by ${data.items[0].volumeInfo.authors}, published by ${data.items[0].volumeInfo.publisher}.`,
            `"${data.items[2].volumeInfo.title}" by ${data.items[0].volumeInfo.authors}, published by ${data.items[0].volumeInfo.publisher}.`,
            `"${data.items[3].volumeInfo.title}" by ${data.items[0].volumeInfo.authors}, published by ${data.items[0].volumeInfo.publisher}.`,
            `"${data.items[4].volumeInfo.title}" by ${data.items[0].volumeInfo.authors}, published by ${data.items[0].volumeInfo.publisher}.`,
            // do later: handle if the data has less than 5 results
        ]
    })
    console.log(`Saving ${book.viewBook} to Reading List`)
    const list = await inquirer.prompt({
        name: 'lists',
        type: 'list',
        message:'Which reading list should it be saved to: ',
        choices: [
            [...readingLists],
            "New List"
        ]
    })
    if (list.lists == "New List") {
        console.log('make a new list')
        let title = makeList()
        addBookToList(book.viewBook, title)
    } else {
        addBookToList(book.viewBook, list.lists)
    }
    console.log("Book successfully added")
    main()
    
}
function addBookToList(book, list) {
}
function makeList() {
    let prompt = promptSync();
    let title = prompt('Enter the list title: ')
    readingLists.push([title, []])
    return title
}
function searchBooks() {
    let prompt = promptSync();
    let search = prompt('Enter a search query: ')
    while (!search){
        console.log("Please enter a valid search term.");
        search = prompt('Enter a query: ');
    }
    let url = `https://www.googleapis.com/books/v1/volumes?q=${search}` 
    // console.log(url)
    retrieveBooks(url)
}



async function viewReadingLists() {
    const readingList = await inquirer.prompt({
        name: 'readingLists',
        type: 'list',
        message:'Reading Lists:',
        choices: readingLists, //handle if readingLists is blank
    })
    console.log(readingList)
    console.log(readingLists)
}