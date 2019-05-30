const { ipcRenderer } = require('electron')
let file = document.getElementById('file');

file.onchange = function() {
  ipcRenderer.send('data', file.value.slice(12))
  
};
/*const fs = require("fs");
let fileContent = fs.readFileSync(file, "utf8").split('\n')
let inputMass = []

if(fileContent[2]){
  one.value = fileContent[1]
  two.value = fileContent[2]
  three.value = fileContent[3]
  chenger.value = fileContent[0]
  for(let k = 4; k < fileContent.length; k++){
    inputMass.push(fileContent[k])
  }
}
const { ipcRenderer } = require('electron')
let from, to, step
let mainMass = []

document.getElementById("Drow").onclick = function() {myFunction()};
document.getElementById("Save").onclick = function() {saveFunction()};
document.getElementById("Load").onclick = function() {loadFunction()};

function myFunction(){
  mainMass = []
  from = parseFloat(one.value)
  to = parseFloat(two.value)
  step = parseFloat(three.value)
  mainMass.push(chenger.value)
  mainMass.push(from)
  mainMass.push(to)
  mainMass.push(step)

  fs.writeFileSync("input.txt", mainMass.join('\n'))
  if(!isNaN(step) && !isNaN(from) && !isNaN(to) && step != 0){
    if(inputMass.length == 0)
      mainMass.push(picture(from, to, step, chenger.value))
    else {
      mainMass.push(inputMass)
      inputMass = []
    }

    fs.appendFileSync("input.txt", '\n'+mainMass[4].join('\n'))

    ipcRenderer.send('data', mainMass)

  }

}
function saveFunction(){
  mainMass = []
  from = parseFloat(one.value)
  to = parseFloat(two.value)
  step = parseFloat(three.value)
  mainMass.push(chenger.value)
  mainMass.push(from)
  mainMass.push(to)
  mainMass.push(step)
  //fs.writeFileSync("input.txt", mainMass.join('\n'))
  if(!isNaN(step) && !isNaN(from) && !isNaN(to) && step != 0){
    if(inputMass.length == 0)
      mainMass.push(picture(from, to, step, chenger.value))
    else {
      mainMass.push(inputMass)
      inputMass = []
    }

  //  fs.appendFileSync("input.txt", '\n'+mainMass[4].join('\n'))
  ipcRenderer.send('show-save', mainMass)

  }
}
function loadFunction(){
ipcRenderer.send('show-load')

}
function picture(from, to, step, func){
  let y
  from *= 0.0174533
  to *= 0.0174533
  step *= 0.0174533
  let yMass = []
  if(func == 'sin'){
    for(let i= from; i < to; i+=step){
      y = Math.sin(i)
      yMass.push(y)
      //ctx.fillRect((i*20+315), (200 - y*20), 1, 1);
    }
  }
  if(func == 'cos'){
    for(let i= from; i < to; i+=step){
      y = Math.cos(i)
      yMass.push(y)
      //ctx.fillRect((i*20+315), (200 - y*20), 1, 1);
    }
  }
  return yMass
}
*/
