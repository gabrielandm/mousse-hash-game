const http = require('http');
const fs = require('fs');

let activeMem = [false, false, false,
                 false, false, false,
                 false, false, false
                ];

http.createServer(
   (request, response) => {
      if (request.url.includes('/LerTabuleiro')) {
         let params = new URL(`http://localhost:3333${request.url}`);
         params = params.searchParams;

         let responseText = "";
         for(let i = 0; i < activeMem.length; i++) {
            responseText += `${activeMem[i]} `;
         }

         response.writeHead(200, { 'Content-Type': "text/plain"});
         response.end(`${responseText}`);
      } else if(request.url.includes('/MarcarCelula')) {
         let params = new URL(`http://localhost:3333${request.url}`);
         params = params.searchParams;

         const i = parseInt(params.get('i'));
         const j = parseInt(params.get('j'));

         activeMem[i + (j * 3)] = true; // Update state of div

         response.writeHead(204);
         response.end();
      } else if(request.url.includes('/ResetarJogo')) {
         for (let i = 0; i < activeMem.length; i++) {
            activeMem[i] = false;
         }

         response.writeHead(204);
         response.end();
      } else if(request.url.includes('/cat.png')) {
         fs.readFile('./cat.png', function (error, file) {
            if (error)
               return;

            response.writeHead(200, { 'Content-Type': "image/png" });
            response.end(file);
         });
      } else if(request.url.includes('/uwu.png')) {
         fs.readFile('./uwu.png', function (error, file) {
            if (error)
               return;

            response.writeHead(200, { 'Content-Type': "image/png" });
            response.end(file);
         });
      } else if(request.url.includes('/styles.css')) {
         fs.readFile('./styles.css', function (error, file) {
            if (error)
               return;

            response.writeHead(200, { 'Content-Type': "text/css" });
            response.end(file);
         });
      } else {
         fs.readFile('./index.html', function (error, file) {
            if (error)
               return;

            response.writeHead(200, { 'Content-Type': "text/html" });
            response.end(file, "utf-8");
         });
      }
}).listen(3333);
