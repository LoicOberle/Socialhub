

updateTheme()

Vue.createApp({
  data() {
    return {
      posts: fake_posts,
      //posts:[],
      navOpen: false
    }
  },
  methods:{
    refresh:async function(){
      document.getElementById("loadingElement").classList.toggle("dot-elastic")
    
      let vm=this
      //this.posts=emptyArray(this.posts)
      this.posts=[]

      //Getting Twitter Posts
      if (localStorage.getItem("twitter") != null && localStorage.getItem("twitter") != "") {
     
        await fetch("/twitter/timeline?" + "token=" + localStorage.getItem("twitter") + "&secret=" + localStorage.getItem("twitterSecret"), {
          method: "get"
    
        }).then((res) => {
         
          if(res.status<400){
            res.json().then((data) => {
             
            
              let newPosts=makeTwitterPosts(data)
            
              vm.posts=vm.posts.concat(newPosts)
              
              vm.sortPosts()
            
            })
          }else{
            res.json().then((data) => {
             
              displayErrorMessage(data.message)
            })
            
          }
          
        },(err)=>{
        
          displayErrorMessage(err)
        })
      }
      
       //Getting Reddit Posts
       if (localStorage.getItem("reddit") != null && localStorage.getItem("reddit") != "") {
     
        await fetch("/reddit/timeline?" + "token=" + localStorage.getItem("reddit"), {
          method: "get"
    
        }).then((res) => {
         
          if(res.status<400){
            res.json().then((data) => {
             
              let newPosts=makeRedditPosts(data)
           
              vm.posts=vm.posts.concat(newPosts)
             vm.sortPosts()
             
            })
          }else{
            res.json().then((data) => {
          
              displayErrorMessage(data.message)
            })
            
          }
          
        },(err)=>{
       
          displayErrorMessage(err)
        })
      }
      //Getting Youtube Posts
      if (localStorage.getItem("youtube") != null && localStorage.getItem("youtube") != "") {
      
        await fetch("/youtube/timeline?" + "token=" + localStorage.getItem("youtube"), {
          method: "get"
    
        }).then((res) => {
         
          if(res.status<400){
            res.json().then((data) => {
             
            })
          }else{
            res.json().then((data) => {
           
              displayErrorMessage(data.message)
            })
            
          }
          
        },(err)=>{
         
          displayErrorMessage(err)
        })
      }
    
      document.getElementById("loadingElement").classList.toggle("dot-elastic")
     
      
    },
    sortPosts:function(){
      this.posts.sort((a,b)=>{
        let unixA=Math.floor(new Date(a.date).getTime() / 1000)
        let unixB=Math.floor(new Date(b.date).getTime() / 1000)
        
     return unixB-unixA
      })
    }
   
    
    //Getting Reddit posts
  },
  mounted:function() {
    window.addEventListener('load', () => {
     // ScrollReveal().reveal('.post', { delay: 1000000 });
      //console.log("loaded");
 })
  },
}).mount('#app')


document.getElementById("optionButton").addEventListener("click", (e) => {
  e.preventDefault()
  showOptionsMenu()
})
document.getElementById("aboutButton").addEventListener("click", (e) => {
  e.preventDefault()
  showAboutMenu()
})

document.getElementById("accountButton").addEventListener("click", (e) => {
  e.preventDefault()
  showAccountMenu()
})




function toggleTheme() {

  if (event.target.checked) {
    localStorage.setItem("theme", "day")
  } else {
    localStorage.setItem("theme", "night")
  }
  updateTheme()
}



function updateTheme() {
  if (localStorage.getItem("theme") == "day") {
    document.getElementById("css").href = "css/style.css"
  } else {
    document.getElementById("css").href = "css/style_dark.css"
  }


}

function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("socialWebsite");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("socialBar_item");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(tablinks[i].id, "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += ' '+evt.currentTarget.id;
}


function emptyArray(arr){
  while(arr.length>0){
    arr.pop()
  }
  return arr
}

function combineArrays(source,arr){
  arr.forEach(element => {
    source.push(element)
  });
  return source
}
//showAccountMenu()