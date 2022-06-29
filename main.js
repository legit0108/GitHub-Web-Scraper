const url = "https://github.com/topics";

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const topics = path.join(__dirname,"topics");
const extractTopic = require("./reposPage");

dirCreator(topics);

request(url,cb);
function cb(err,response,html){
    if(err){
        console.log("ERROR");
    }else{
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html);
    let topicsArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i =0;i<topicsArr.length;i++){
        let topicName = $(topicsArr[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1").text().trim();
        let repo = path.join(topics,topicName);
        console.log(repo);
        dirCreator(repo);
        let link = $(topicsArr[i]).attr("href");
        let fullLink = "https://github.com/"+link;
        extractTopic(topicName,fullLink,repo);
    }
}

function dirCreator(filePath){
    if(fs.existsSync(filePath)==false){
        fs.mkdirSync(filePath);
    }
}

