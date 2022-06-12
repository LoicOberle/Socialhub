

function makeTwitterPosts(posts) {
    let ar = []
    if(posts.length>0)
    posts.forEach(post => {
      ar.push(new Post("twitter",post.user.name,"@"+post.user.screen_name,post.user.profile_image_url,new Date(post.created_at),post.full_text,"https://twitter.com/"+post.user.screen_name+"/status/"+post.id_str))
    });
    return ar
  }
  
  
  function twitterLogout(){
    localStorage.setItem("twitter","")
    window.location.reload()
  }
  function openTwitterLogin() {
    console.log("Reddit: "+localStorage.getItem("reddit"));
    window.location = "http://127.0.0.1:5000/twitter/login"
    //window.location="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=OXdZbUFYSHFjcnlhQWhLZ3VacnI6MTpjaQ&redirect_uri=https://127.0.0.1:5000/twitter/callback&scope=tweet.read%20users.read%20follows.read+follows.write%20offline.access&state=state&code_challenge=test&code_challenge_method=plain"
  }
    