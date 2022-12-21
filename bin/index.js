#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const prompt = require('prompt-sync')();


console.log('Welcome to this Google Books API CLI app!');


const viewBooks = (data) => {
    // console.log('hit viewBooks function')
    // console.log(data.items)
    for (let i=0; i < 5; i++) {
        // console.log(data.items[i].volumeInfo)
        console.log(`Title: ${data.items[i].volumeInfo.title}`)
        console.log(`Author: ${data.items[i].volumeInfo.authors}`)
        console.log(`Publisher: ${data.items[i].volumeInfo.publisher}`)
    }
}
const retrieveBooks = (url) => {
    // console.log('hit retrieveBooks function')
    // console.log(url)
    axios.get(url).then(function (res) {
        // console.log(res.data)
        viewBooks(res.data)
    });
}

const search = prompt('Enter a query: ');
let url = search ? `https://www.googleapis.com/books/v1/volumes?q=${search}` : "https://www.googleapis.com/books/v1/volumes"
// console.log(url)
retrieveBooks(url)