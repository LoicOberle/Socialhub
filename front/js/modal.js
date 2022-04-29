function displayErrorMessage(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    })
  }
  function showAccountMenu() {
    let buttonTwitter=""
    if((localStorage.getItem("twitter") != null && localStorage.getItem("twitter") != "")){
      buttonTwitter=`<button  onclick="twitterLogout()">Log out</button>`
    }else{
      buttonTwitter=`<button onclick="openTwitterLogin()">Log in Twitter</button>`
    }
    let buttonReddit=""
    if((localStorage.getItem("reddit") != null && localStorage.getItem("reddit") != "")){
      buttonReddit=`<button  onclick="redditLogout()">Log out</button>`
    }else{
      buttonReddit=`<button onclick="openRedditLogin()">Log in Reddit</button>`
    }
    let buttonYoutube=""
    if((localStorage.getItem("youtube") != null && localStorage.getItem("youtube") != "")){
      buttonYoutube=`<button  onclick="youtubeLogout()">Log out</button>`
    }else{
      buttonYoutube=`<button onclick="openYoutubeLogin()">Log in Youtube</button>`
    }
    Swal.fire({
      title: 'Accounts',
      html: `
            <div class="socialBar">
    <button class="socialBar_item twitter" onclick="openTab(event,'twitterTab')" id='twitter'><img class="socialIcon" src="assets/twitter.svg"></button>
    <button class="socialBar_item " onclick="openTab(event,'redditTab')" id="reddit"><img class="socialIcon" src="assets/reddit.svg"></button>
    <button class="socialBar_item  " onclick="openTab(event,'youtubeTab')" id="youtube"><img class="socialIcon" src="assets/youtube.svg"></button>
    <button class="socialBar_item " onclick="openTab(event,'instagramTab')" id="instagram"><img class="socialIcon" src="assets/instagram.svg"></button>
   
  </div>
            <div id="twitterTab" class="socialWebsite">
            <h2>WIP</h2>
            ${buttonTwitter}
          </div>
          
          <div id="redditTab" class="socialWebsite" style="display:none">
            <h2>WIP</h2>
            ${buttonReddit}
          </div>
          <div id="youtubeTab" class="socialWebsite" style="display:none">
            <h2>WIP</h2>
            ${buttonYoutube}
          </div>
          
          <div id="instagramTab" class="socialWebsite" style="display:none">
            <h2>WIP</h2>
          
          </div>
          
  
  
            `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      showConfirmButton:false
    })
  }
  
  function showAboutMenu() {
    Swal.fire({
      title: 'About Socialhub',
      text: 'Description in progress !',
      showCloseButton: true,
    })
  }
  
  function showOptionsMenu() {
    let checkBoxVar = ""
    if (localStorage.getItem("theme") == "day") {
      checkBoxVar = "checked"
    } else {
      checkBoxVar = "unchecked"
    }
    Swal.fire({
      title: 'Setting',
      html: `<div>
            <p>Day/Night theme:<input id="themeCheckbox" type="checkbox" class="toggle" ${checkBoxVar} onchange='toggleTheme()'></p>
            </div>
            `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
    })
  }