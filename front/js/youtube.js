function youtubeLogout(){
    localStorage.setItem("youtube","")
    window.location.reload()
  }
  function openYoutubeLogin() {
    window.location = "https://127.0.0.1:5000/youtube/login"
    //window.location="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=OXdZbUFYSHFjcnlhQWhLZ3VacnI6MTpjaQ&redirect_uri=https://127.0.0.1:5000/twitter/callback&scope=tweet.read%20users.read%20follows.read+follows.write%20offline.access&state=state&code_challenge=test&code_challenge_method=plain"
  }


  function makeYoutubePosts(posts) {
    let ar = []
    if(posts.length>0)
    posts.forEach(post => {
      ar.push({
        type: "youtube",
        author: post.user.name,
        content: post.full_text,
        date: post.created_at,
        profile_pic: post.user.profile_image_url
      })
    });
    return ar
  }
  