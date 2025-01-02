const e={currentPage:1,minPage:1,maxPage:10};async function n(n){let t=n||document.getElementById("root");if(!t)throw Error("Root element not found");let o=e.currentPage,r=document.createElement("ul");try{t.innerHTML="Loading...";let e=await fetch("https://api.hnpwa.com/v0/news/{page}.json".replace("{page}",o));(await e.json()).forEach(e=>{let n=document.createElement("div");n.innerHTML=`
        <li>
          <a href="#item=${e.id}">
            ${e.title} (${e.comments_count})
          </a>
        </li>
      `,r.appendChild(n.firstElementChild)}),t.innerHTML="",t.appendChild(r)}catch(e){t.innerHTML="Error loading news feed",console.error("Error:",e)}if(o>e.minPage){let n=document.createElement("button");n.innerHTML="Previous Page",n.addEventListener("click",()=>{e.currentPage=o-1,location.hash=""}),t.appendChild(n)}if(o<e.maxPage){let n=document.createElement("button");n.innerHTML="Next Page",n.addEventListener("click",()=>{e.currentPage=o+1,location.hash=""}),t.appendChild(n)}}async function t(e){let n=e||document.getElementById("root");if(!n)throw Error("Root element not found");let t=location.hash.substring(5),o=document.createElement("div");try{n.innerHTML="Loading...";let e=await fetch("https://api.hnpwa.com/v0/item/{id}.json".replace("{id}",t)),r=await e.json(),a=document.createElement("button");a.innerHTML="← Back to News",a.addEventListener("click",()=>{location.hash=""}),o.innerHTML=`
      Title: ${r.title}
      URL Content: ${r.url?r.url:"No URL"}
      Comments: ${r.comments?r.comments.map(e=>e.content).join("\n"):"No comments"}
    `,n.innerHTML="",n.appendChild(a),n.appendChild(o)}catch(e){console.error("Error:",e),n.innerHTML="Error loading content"}}"undefined"!=typeof window&&document.getElementById("root")&&window.addEventListener("hashchange",function(e){let o=e||document.getElementById("root");if(!o)throw Error("Root element not found");""===location.hash?n(e):-1!==location.hash.indexOf("#item")?t(e):(o.innerHTML="Error: Invalid route",console.error("Invalid hash:",location.hash))});
//# sourceMappingURL=index.60403d76.js.map
