function openRedditLogin() {
    window.location="https://127.0.0.1:5000/reddit/login"
}

function makeRedditPosts(posts) {
    let ar = []
    if (posts.length > 0)
        posts.forEach(post => {
            ar.push(new Post("reddit",post.author,post.subreddit,post.sr_detail.community_icon,new Date(post.created_utc*1000),`<p>${post.title}</p><img src=${post.thumbnail}>`,"https://www.reddit.com"+post.permalink))
        });
    return ar
}
function redditLogout(){
    localStorage.setItem("reddit","")
    window.location.reload()
  }