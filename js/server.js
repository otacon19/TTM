const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = /*5501 || */8052;

app.use(express.json());
app.use(cors());

app.post('/save-name', (req, res) => {

    const name = req.body.name;
    if (!name) {
        return res.status(400).send('Username is required');
    }
    
    const filePath = path.join(__dirname, 'matrices.txt');
    fs.appendFile(filePath, name, (err) => {
        if (err) {
            console.error('Error saving the username:', err);
            return res.status(500).send('Error saving the username');
        }
        console.log('Username saved successfully:', filePath);
        res.send('Username saved successfully');
    });
});

app.post('/save-matrixL', (req, res) => {

    const matrix = req.body.L;
    if (!matrix) {
        return res.status(400).send('Matrix L is required');
    }

    const matrixText = '\n' + "=========================" + '\n' + matrix.map(row => row.join(' ')).join(';') + '\n';
    
    const filePath = path.join(__dirname, 'matrices.txt');
    fs.appendFile(filePath, matrixText, (err) => {
        if (err) {
            console.error('Error saving the matrix L:', err);
            return res.status(500).send('Error saving the matrix L');
        }
        console.log('Matrix L saved successfully:', filePath);
        res.send('Matrix L saved successfully');
    });
});

app.post('/save-matrixFPR', (req, res) => {
    
    const matrix = req.body.matrixFPR;
    if (!matrix) {
        return res.status(400).send('Matrix is required');
    }

    const matrixText = matrix.map(row => row.join(',')).join(';') + '\n';
    const filePath = path.join(__dirname, 'matrices.txt');

    fs.appendFile(filePath, matrixText, (err) => {
        if (err) {
            console.error('Error saving the matrix:', err);
            return res.status(500).send('Error saving the matrix');
        }
        console.log('Matrix saved successfully:', filePath);
        res.send('Matrix saved successfully');
    });
});

app.post('/save-scores', (req, res) => {
    const { user_name, scoresTTM, degree } = req.body;
    
    if (!user_name || !scoresTTM || !degree) {
        return res.status(400).send('Error');
    }

    const filePath = path.join(__dirname, 'matrices.txt');
    const fileContent = `${user_name};${JSON.stringify(scoresTTM)};${degree}\n`;

    fs.appendFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error saving information:', err);
            return res.status(500).send('Error saving information');
        }
        console.log('Information 2 saved successfully:', filePath);
        res.send('Information 2 saved successfully');
    });
});

const hostname = /*/'localhost'*/'0.0.0.0'; 
app.listen(PORT, hostname, () => {
    console.log(`Server is running on http://${hostname}:${PORT}`);
});
