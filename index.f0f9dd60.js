const e={currentPage:1,minPage:1,maxPage:10};if("undefined"!=typeof window){let e=document.getElementById("root");e&&(window.addEventListener("hashchange",()=>(function(e){let o=e||document.getElementById("root");if(!o)throw Error("Root element not found");""===location.hash||"#prevPage"===location.hash||"#nextPage"===location.hash?(location.hash="",t(e)):location.hash.startsWith("#item")?n(e):(o.innerHTML="Error: Invalid route",console.error("Invalid hash:",location.hash))})(e)),t(e))}async function t(t){let n=t||document.getElementById("root");if(!n)throw Error("Root element not found");let a=e.currentPage,r=document.createElement("ul");try{o(n,!0);let e=await fetch("https://api.hnpwa.com/v0/news/{page}.json".replace("{page}",a));(await e.json()).forEach(e=>{let t=document.createElement("div");t.innerHTML=`
        <li>
          <a href="#item=${e.id}">
            ${e.title} (${e.comments_count})
          </a>
        </li>
      `,r.appendChild(t.firstElementChild)}),n.innerHTML="",n.appendChild(r)}catch(e){n.innerHTML="Error loading news feed",console.error("Error:",e)}finally{o(n,!1)}if(a>e.minPage){let t=document.createElement("button");t.innerHTML="Previous Page",t.addEventListener("click",()=>{e.currentPage=a-1,location.hash="#prevPage"}),n.appendChild(t)}let i=document.createElement("span");if(i.innerHTML=` Page ${a} of ${e.maxPage} `,n.appendChild(i),a<e.maxPage){let t=document.createElement("button");t.innerHTML="Next Page",t.addEventListener("click",()=>{e.currentPage=a+1,location.hash="#nextPage"}),n.appendChild(t)}}async function n(e){let t=e||document.getElementById("root");if(!t)throw Error("Root element not found");let n=location.hash.startsWith("#item=")?location.hash.substring(6):null;if(!n)throw Error("Invalid news ID format");let a=document.createElement("div");try{o(t,!0);let e=await fetch("https://api.hnpwa.com/v0/item/{id}.json".replace("{id}",n)),r=await e.json(),i=document.createElement("button");i.innerHTML="← Back to News",i.addEventListener("click",()=>{location.hash=""}),a.innerHTML=`
      <h1>${r.title}</h1>
      ${r.url?`<p><a href="${r.url}" target="_blank">Visit Story</a></p>`:""}
      <h2>Comments:</h2>
      ${r.comments.length>0?`<ul>${r.comments.map(e=>`<li>${e.content}</li>`).join("")}</ul>`:"<p>No comments yet</p>"}
    `,t.innerHTML="",t.appendChild(i),t.appendChild(a)}catch(e){console.error("Error:",e),t.innerHTML=`Error loading content: ${e.message||"Unknown error"}`}finally{o(t,!1)}}function o(e,t){t&&(e.innerHTML="Loading...")}
//# sourceMappingURL=index.f0f9dd60.js.map
