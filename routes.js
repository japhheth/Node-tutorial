const fs = require('fs');


const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write(`<html>`);
        res.write(`<head><title>My First Page </title><head>`);
        res.write(`<body><form action="/message" method="POST"><input type="text" placeholder="message" name="message"/><button type="submit">Send</button></form></body>`);
        res.write(`</html>`);
        return res.end();   
     }
     if(url === '/message' && method === 'POST'){
         const body = [];
         
         req.on('data', (chunk) => {
            body.push(chunk)
            console.log(chunk)
         });

        return req.on('end', () => {
            

             const parsedBody = Buffer.concat(body).toString();
             const message = parsedBody.split('=')[1];
             const messageBody = message.replace('+', ' ');
             fs.writeFile('message.txt', messageBody, err => { 
                res.statusCode = 302;
                res.setHeader('Location', '/');
               return res.end();
             });

          
             
         })
     
     }
    res.setHeader('Content-type', 'text/html');
    res.write(`<html>`);
    res.write(`<head><title>response</title><head>`);
    res.write(`<body><h1>Hello from Node Js server bitches !!!!</h1></body>`);
    res.write(`</html>`);
    res.end();
     
}


module.exports = requestHandler;