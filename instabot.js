const Instagram = require('instagram-web-api');

const fs = require('fs');
const CronJob = require('cron').CronJob
const get = require('simple-get')
const http = require('http');
const https = require('https');
let moment = require('moment');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const CronJob = require('cron').CronJob


module.exports = {

    async getFollowings() {
        let next = true;
        let end_cursor = null;
        while (next) {

            await client.login()
            const profile = await client.getProfile()
            const searchedProfile = await client.getUserByUsername({username: 'paulorievrs'})
            const searchedId = searchedProfile.id;
            const followsCount = searchedProfile.edge_follow.count;
            const followedByCount = searchedProfile.edge_followed_by.count;
            const followers = await client.getFollowings({
                userId: searchedId,
                first: followedByCount,
                after: end_cursor
            })
            next = followers.page_info.has_next_page;
            end_cursor = followers.page_info.end_cursor;
            followers.data.forEach(element => {
                console.log(element.id);
            });
        }
    },

    async getFollowers() {
        let next = true;
        let end_cursor = null;
        while (next) {

            await client.login()
            const profile = await client.getProfile()
            const searchedProfile = await client.getUserByUsername({username: 'paulorievrs'})
            const searchedId = searchedProfile.id;
            const followsCount = searchedProfile.edge_follow.count;
            const followedByCount = searchedProfile.edge_followed_by.count;
            const followers = await client.getFollowers({
                userId: searchedId,
                first: followedByCount,
                after: end_cursor
            })
            next = followers.page_info.has_next_page;
            end_cursor = followers.page_info.end_cursor;
            followers.data.forEach(element => {
                console.log(element.id);
            });
        }
    },

    async followByTxt() {
        let i = 0;
        const x =  fs.readFileSync('./equalId.txt', 'utf8');
        const ids = (x.split("\n"));
        await client.login();

        ids.forEach(x => {
            try {
                client.follow({ userId: x }).catch(console.log("Deu erro em : ", x));
                console.log("Foi seguido: ", x);
            } catch (e) {
                console.log("Não foi seguido: ", x);
                sleep(60000);
            }
            i++;
            if(i === 3) {
                sleep(60000);
                i = 0;
            }
        })
    },

    async postComment(url) {
        let url2 = "http://api.instagram.com/oembed?url=" + url;
        let i = 0;
        const x =  fs.readFileSync('./equal.txt', 'utf8');
        const igs = (x.split("\n"));
        let next = true;
        let uno = 0;
        let dos = 0;
        let tres = 0;
        await get.concat(url2, async function (err, res, data) {
            if (err) throw err
            let buf = Buffer.from(data).toString('utf-8');
            let mediaId = (JSON.parse(buf).media_id);
            await client.login();

            while(next) {
                uno = Math.floor(Math.random() * igs.length);

                do {
                    dos = Math.floor(Math.random() * igs.length);

                } while (dos === uno);

                do {
                    tres = Math.floor(Math.random() * igs.length);
                } while (tres === uno || tres === dos)

                await client.addComment({ mediaId: mediaId, text: "@" + igs[uno] + " " + "@" + igs[dos] + " @" + igs[tres] });

                console.log("Postado: [ " + moment().format('hh:mm:ss') + " ]");
                await sleep(60000);


            }
        })

    },

    async postOnDate(time, date, link, description, username, password) {
        console.clear();

        //https://i.imgur.com/04oqVqF.jpg
        await postCron(time, date);
        console.log(" - Postagem agendada -\nDia: " + date + "\nHora: " + time + "\nLink da imagem: " + link + "\nCom a descrição de: " + description);


        const client = new Instagram({ username, password });
        await client.login();
        const photo = link;
        await client.uploadPhoto({ photo, caption: description, post: 'feed' })

    },

    async postCron(time, date) {
        const CronJob = require('cron').CronJob
        const job = new CronJob('* * * * * *', () => {
            console.log('tarefa agendada')
        }, null, true, 'America/Sao_Paulo')
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function httpGet(theUrl)  {
    let id = "";
    let url = "http://api.instagram.com/oembed?url=" + theUrl;
    console.log(url);
    // var xmlHttp = new XMLHttpRequest();
    //
    // await xmlHttp.open( "GET", url, true ); // false for synchronous request
    //
    //
    // xmlHttp.send( null );
    // // console.log(JSON.parse(xmlHttp.responseText).media_id);
    // console.log(xmlHttp);




}

