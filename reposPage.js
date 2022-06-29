const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const finalExtract = require("./issues");

function extractTopic(topicName,link,repo){
    request(link,function(err,response,html){
        if(err){
            console.log("ERROR");
        }else{
            extractLink(topicName,html,repo);
        }
    })
}


function extractLink(topicName,html,repo){
    let $ = cheerio.load(html);
    let repos = $(".border.rounded.color-shadow-small.color-bg-subtle.my-4");
    for(let i =0;i<8;i++){
        let repoName = $(repos[i]).find(".text-bold.wb-break-word").text().trim();
        let fileName = `${repoName}.pdf`;
        let filePath = path.join(repo,fileName);
        let link = $(repos[i]).find(".text-bold.wb-break-word").attr("href");
        let fullLink = `https://github.com/${link}/issues`;
        finalExtract(topicName,repoName,fullLink,filePath);
    }
}

module.exports = extractTopic;