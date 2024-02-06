
const fs=require('fs');
const path=require('path');
const  http=require('http');

const todosStream=fs.createReadStream(path.join(__dirname,'data-todos.json'),'utf-8');
const styleStream=fs.createReadStream(path.join(__dirname,'style.css'),'utf-8');

//create server

const server=http.createServer((req,res)=>{
  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('content-type', 'text/html');

    //if data no exist
    if (!fs.existsSync(path.join(__dirname, 'data-todos.json'))) {
      res.write(' <h1>Empty ToDo List</h1> ');
      return res.end();
    }

    //--------------------------------------------------------


    let data = '';
    todosStream.on('data', (chunk) => {
      data += chunk;
    });

    let style = '';
    styleStream.on('data', (chunk) => {
      style += chunk;
    });

     
    todosStream.on('end', () => {
      const todos = JSON.parse(data);
      const todoListItems = todos.map(todo => `<li>${todo.text}</li>`).join('');
      const html = `<body><style>${style}</style><h3>todos</h3><ul>${todoListItems}</ul></body>`;
      res.end(html);
    });
    //-------------------------------------------------------------

     
  }else if(req.url === '/astronomy' && req.method === 'GET'){
    const imgSrc = 'https://media.cnn.com/api/v1/images/stellar/prod/200505225212-04-fossils-and-climate-change-museum.jpg?q=x_0,y_0,h_1125,w_1999,c_fill/h_720,w_1280';
    res.setHeader('content-type', 'text/html');
    res.write(`<body><div><img src="${imgSrc}"></div></body>`);
    res.write('<p> The image showcases a vast expanse of the night sky, dotted with numerous stars of varying brightness and color</p>');
    return res.end();
  }else{
    
    return res.end('<h1>404 : Page Not Found</h1>');
  }
});

const PORT=process.env.PORT || 3000;
server.listen(PORT,()=>console.log(`server running on port ${PORT}`));