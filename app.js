const express = require('express');
var bodyParser = require('body-parser');
const { exec } = require("child_process");
const { spawn } = require('child_process');

const app = express();

const PORT=3000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let port=3000 ;
let dbport=3300 ;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});





function executeShellCommand(command, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        callback(stdout);
    });
}
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const siteName=generateString(5) ;
console.log(siteName);

app.post('/cmdrun', async (req, res) => {
    console.log(req.body.cmd) ;
    let cmd=req.body.cmd ;

    console.log(cmd);
    // let siteName='"'+cmd+'"' ;
    port=port + 1 ;
    dbport=dbport+1 ;

    try {
        const cmdspawn = spawn('sh',['-c',`cd dockers && ./script.sh ${siteName} ${port} ${dbport}`]);

        cmdspawn.stdout.on('data', (data) => {
            console.log(`spawn output: ${data}`);
        });

        cmdspawn.stderr.on('data', (data) => {
            console.error(`spawn error: ${data}`);
            console.log(`${data}`==="abc") ;
            console.log(`${data}`=="abc\n") ;

        });
        resp={"outp":port } ;
        res.send(resp);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error starting service' });
    }

}) ;


app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});
