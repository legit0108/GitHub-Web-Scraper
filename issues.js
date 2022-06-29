const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function finalExtract(topicName,repoName,link,filePath){
    request(link,function(err,response,html){
        if(err){
            console.log("ERROR");
        }else{
            getAllIssues(topicName,repoName,html,filePath);
        }
    })
}

function getAllIssues(topicName , repoName , html,filePath){
    let $ = cheerio.load(html);
    let issues = $(".d-block.d-md-none.position-absolute.top-0.bottom-0.left-0.right-0");
    let arr = [];
    for(i=0;i<issues.length;i++){
        let link = $(issues[i]).attr("href");
        let fullLink = `https://github.com/${link}`;
        arr.push(fullLink);
    }
    let text = JSON.stringify(arr);
    let pdfDoc = new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath))
    pdfDoc.text(text);
    pdfDoc.end();
}

module.exports = finalExtract;

