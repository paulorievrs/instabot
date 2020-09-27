const Instagram = require('instagram-web-api');
const username = "paulorievrs";
const password = "3202bol0";


const client = new Instagram({ username, password })
let next = true;
let end_cursor = null;

;(async () => {
    while(next) {

        await client.login()
        const profile = await client.getProfile()
        const searchedProfile = await client.getUserByUsername({ username: 'paulorievrs' })
        const searchedId = searchedProfile.id;
        const followsCount = searchedProfile.edge_follow.count;
        const followedByCount = searchedProfile.edge_followed_by.count;
        const followers = await client.getFollowers({ userId: searchedId, first: followedByCount, after: end_cursor })
        next = followers.page_info.has_next_page;
        end_cursor = followers.page_info.end_cursor;
        followers.data.forEach(element => {
            console.log(element.id);
        });
    }


})()