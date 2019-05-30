const { ipcRenderer } = require('electron')
const fs = require("fs");
const _ = require('lodash');

let fileName = document.querySelector('.fileName');
let readT = document.querySelector('.readT');
let AlgT = document.querySelector('.AlgT');
let FullT = document.querySelector('.FullT');
let AnsvMaxx = document.querySelector('.Maxx');


let data = ipcRenderer.sendSync('data_2', "Give me path")

fileName.textContent = data[0]
readT.textContent = data[1]
AlgT.textContent = data[2]
FullT.textContent = data[3]
AnsvMaxx.textContent = data[4]
