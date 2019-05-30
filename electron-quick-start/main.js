// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require("fs");
const _ = require('lodash');
//let ipc = require('ipc')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, ansverWindow, waitWindow
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 85,
    webPreferences: {
      nodeIntegration: true
    }
  })
  ansverWindow = new BrowserWindow({
    width: 350,
    height: 400,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  /*ipcMain.on('hide', (event, args_4) =>{
    mainWindow.hide()
    ansverWindow.show()
  })*/
 ipcMain.on('data', (event, args) =>{
   mainWindow.hide()

   waitWindow = new BrowserWindow({
     width: 350,
     height: 400,
     show: false,
     webPreferences: {
       nodeIntegration: true
     }
   })

   waitWindow.loadFile('wait.html')
   waitWindow.show()

   ipcMain.on('wait', (event, args_2) =>{
     let  start, end, end_1, AlgT, FullT, AnsvMaxx, readT
     start = new Date().getTime();

     let data = args


     let mainMass = fs.readFileSync("./TestFiles/" + data, "utf8").split('\n')

     let lowMass = [],  functionMass = [], hyperLineMass = [], ansverMass = [], saveAnsverMass = []
     let helper_1, helper_2, ansver = 0
     let massForReplaceCounter = []
     let massForReplaceValue = []
     let sumMax = 0
     let maxx
     let vectorMax = null
     let vector = 0
     let hyperLine = 0

     let variableValue = 1
     let counter = 0
     let dominate, timeForRead, fullTime, timeForProgramm

     for(let i = 0; i < mainMass.length; i++){             //Считываем из файла и записываем в массивы
       mainMass[i] = mainMass[i].split(' ')
     }
     for(i = 0; i < mainMass.length; i++){
       for(j = 0; j < mainMass[i].length; j++){
         mainMass[i][j] = parseFloat(mainMass[i][j], 10)
       }
     }
     functionMass = mainMass[0].slice()

     helper_1 = mainMass[0].length
     helper_2 = mainMass.length
     lowMass = mainMass[helper_2-2].slice()

     end_1 = new Date().getTime();
     timeForRead = (end_1 - start)/1000
     readT = timeForRead + " c"

     for(i=1; i<=helper_1; i++){                          //Дополняем систему неравенств
       mainMass[i+helper_2-3] = []
       ansverMass.push([])
     	lowMass.push(0)
     	for(j=0; j<helper_1; j++){

       	if(i!=j+1)
       		mainMass[i+helper_2-3][j] = 0
       	else
       		mainMass[i+helper_2-3][j] = -1
     	}
     }
     for(k=0; k<helper_1; k++){                             //Основной цикл
       for(i=1; i< mainMass.length; i++){                   //Ищем новую гипергрань
       		sumMax = 0
       		vector = 0
       		for(j=0; j< mainMass[0].length; j++){
       				sumMax = sumMax + mainMass[0][j] * mainMass[i][j]
       				vector = vector + mainMass[i][j]*mainMass[i][j]
       		}
       		vector = sumMax/Math.sqrt(vector)
       		if(vector > vectorMax){
     			//console.log(vector)
       			vectorMax = vector
       			hyperLine = i
       		}
     	}
       hyperLineMass = mainMass[hyperLine].slice()                   //Задаем новую гипергрань

       //console.log(mainMass, hyperLineMass);

         /*if(k == 0){
             maxx = 3                            //ТЕСТ
         }                                                                                         //с максимальным коэффициентом
         else{*/
     //console.log(mainMass[hyperLine])
     	/*for(i = 0; true; i++){
     		if(mainMass[hyperLine][i] != 0){
     			maxx = i
     			break
     		}
     	}*/

       maxx = mainMass[hyperLine].indexOf(_.maxBy(mainMass[hyperLine], function(o) { return Math.abs(o); }))     //Определяем х
     //console.log(mainMass, mainMass[hyperLine], maxx, lowMass[hyperLine-1], lowMass)
         //}

       //console.log(hyperLine, mainMass[hyperLine], _.maxBy(mainMass[hyperLine], function(o) { return Math.abs(o); }), maxx)
       //console.log(mainMass, lowMass)
     //console.log(maxx)
       variableValue = mainMass[hyperLine][maxx]                         //Выражаем х с наибольшим коэффициентом
       mainRightValue = lowMass[hyperLine-1]/variableValue


       for(i=0; i< mainMass[hyperLine].length; i++){                     //Запоминаем на что менять эти х в других уравнениях
       	if(mainMass[hyperLine][i] != 0){
           if(i != maxx){
             ansverMass[maxx].push([i, -mainMass[hyperLine][i]]) //Составляем финальную таблицу отношений х
           }
           mainMass[hyperLine][i] = mainMass[hyperLine][i]/variableValue
       		massForReplaceCounter.push(i)
       		massForReplaceValue.push(mainMass[hyperLine][i])
       			//mainMass[hyperLine][i] = 0
       	}
     	}
       ansverMass[maxx].push(variableValue, lowMass[hyperLine-1])      //Составляем финальную таблицу отношений х
       //console.log(ansverMass)
       mainMass.splice(hyperLine, 1)                                 //Удаляем из mainMass главную грань
       lowMass.splice(hyperLine-1, 1)

       for(i=0; i< mainMass.length; i++){                            //Изменяем все неравенства
       	if(mainMass[i][maxx]!=0){
       		dominate = mainMass[i][maxx]
       		for(j = 0; j < massForReplaceCounter.length; j++){
       			mainMass[i][massForReplaceCounter[j]] =  mainMass[i][massForReplaceCounter[j]]
       																								- massForReplaceValue[j]*dominate
       		}
           if(i > 0)
       		  lowMass[i-1] = lowMass[i-1] - mainRightValue*dominate
       	  mainMass[i][maxx] = 0
       	}
       }

       vectorMax = null

       massForReplaceCounter = []
       massForReplaceValue = []
       sumMax = 0
       vector = 0
       hyperLine = 0

       variableValue = 1
       counter = 0

     }

     mainMass = []
     lowMass = []
     hyperLineMass = []
     //saveAnsverMass = ansverMass.slice()
  	//console.log(ansverMass)
     for(i = 0; i < ansverMass.length; i++){
                                            //Составляем массив ответов ansverMass[i] = x[i]
       if(ansverMass[i].length == 2){                                                //ansverMass[i] изначально состоит из элементов [a,b]
         ansverMass[i] = [ansverMass[i][1]/ansverMass[i][0]]
     	/*if(ansverMass[i] < 0){
     		ansverMass[i] = 0
     	}*/
           //где а - это х[a] от которого зависит x[i]
         for(j = 0; j < ansverMass.length; j++){                                     //b - это множитель при  x[a], и 2 последних элемента
           for(k = 0; k < ansverMass[j].length; k++){                                //массива это множитель перед x[i] и свободный член.
             if(ansverMass[j][k][0] == i){                                           //Таким образом если ansverMass[i] состоит только из последних
               ansverMass[j][ansverMass[j].length-1] +=                              //двух членов, значит мы знаем значение x[i], и можем использовать
                         (ansverMass[i])*ansverMass[j][k][1]   //его для нахождения тех x, которые от него зависят.
               ansverMass[j].splice(k, 1)
                                                        //На каждой итерации заменяем элемент [a,b] на значение x[a],
               break                                                                 //если оно уже известно.
             }                                                                       //В итоге получаем массив ansverMass, в котором значение
           }                                                                         //i-го элемента = x[i]
         }

       i = -1
       }
       end = new Date().getTime();
       AlgT = (end - end_1)/1000 + " c"
     }
     //console.log(ansverMass);
     for(i = 0; i < ansverMass.length; i++){
       /*if(ansverMass[i] < 0){
         ansverMass[i] = 0
       }*/
       ansver = ansver + ansverMass[i]*functionMass[i]
     }
     end = new Date().getTime();
     AlgT = (end - end_1)/1000 + " c"
     FullT = (end - start)/1000 + " c"
     AnsvMaxx = Math.round(ansver*100)/100
     ansverWindow.loadFile('ansver.html')
     waitWindow.hide()
     ansverWindow.show()
     ipcMain.on('data_2', (event, args_2) =>{
       event.returnValue = [data, readT, AlgT, FullT, AnsvMaxx]
     })
   })
 })



  // and load the index.html of the app.
  mainWindow.loadFile('index.html')



  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
