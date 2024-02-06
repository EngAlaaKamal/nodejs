const fs = require("fs");
const path = require("path");

const datapath = path.join(__dirname, "data-todos.json");

//create file if no exist
if (!fs.existsSync(datapath)) {
  fs.writeFileSync(datapath, "[]");
}

//read data from file
function readData() {
  const data = fs.readFileSync(datapath, "utf-8");
  return JSON.parse(data);
}

//write data to file
function writedata(data) {
  fs.writeFileSync(datapath, JSON.stringify(data));
}

const [, , command, ...args] = process.argv;

if (command == "add") {
  add(args);
} else if (command == "list") {
  list();
} else if (command == "update") {
  update(args);
} else if ("delete") {
  deletetodo(args);
} else {
  console.log(
    "command not found use only: add (todo) | list | update (text,id) | delete (id)"
  );
}

// Function to add a new entry
function add(text) {
  if(text && text!=" "){
    const data = readData();
    const id = data.length + 1;
    data.push({ id, text });
    writedata(data);
    console.log(`Entry with id ${id} added: ${text}`);//validate to prevent undefined and null 
  }else{
    console.log("please inter valid to do");
  }
 
}

//list
function list() {
  const data = readData();
  if (data.length == 0) {
    console.log("no data found");
    return;
  }
  data.forEach((task) => console.log(`ID: ${task.id}, Task: ${task.text}`));//i want make one console log and get rid of foreach
}

//delete
function deletetodo(id) {
  const data = readData();
  const taskIndex = data.findIndex((task) => task.id === parseInt(id));
  if (taskIndex !== -1 && taskIndex < data.length) {
    data.splice(taskIndex, 1);
    let num=0;
    data.forEach((task) =>{ task.id=num+1; num++;}   );
    writedata(data);
    console.log(`Task with ID: ${id} deleted.`);
  } else {
    console.log(`No task found with ID: ${id}.`);//validate to prevent delete undefined and solve id when delete 
  }
}


function update( [ id, newTask]  ) {
    const data = readData();
    const taskIndex = data.findIndex(task => task.id === Number(id));
    if (taskIndex !== -1) {
        data[taskIndex].text = newTask;
        writedata(data);
        console.log(`Task with ID: ${id} edited.`);
    } else {
        console.log(`No task found with ID: ${id}.`);
    }
}