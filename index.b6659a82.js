const e={currentPage:1,minPage:1,maxPage:10};if("undefined"!=typeof window){let e=document.getElementById("root");e&&(window.addEventListener("hashchange",()=>(function(e){let o=e||document.getElementById("root");if(!o)throw Error("Root element not found");""===location.hash||"#prevPage"===location.hash||"#nextPage"===location.hash?(location.hash="",t(e)):location.hash.startsWith("#item")?n(e):(o.innerHTML="Error: Invalid route",console.error("Invalid hash:",location.hash))})(e)),t(e))}async function t(t){let n=t||document.getElementById("root");if(!n)throw Error("Root element not found");let a=e.currentPage,r=[],s=`
    <ul class="news-feed mx-auto p-4">
      {{newsFeed}}
    </ul>
    <button class="prev-btn mx-auto my-4 bg-blue-500 text-white px-4 py-2 rounded-md">Previous Page</button>
    <span class="page-info text-center my-4 text-sm text-gray-500 px-4 py-2">Page ${a} of ${e.maxPage}</span>
    <button class="next-btn mx-auto my-4 bg-blue-500 text-white px-4 py-2 rounded-md">Next Page</button>
  `;try{o(n,!0);let e=await fetch("https://api.hnpwa.com/v0/news/{page}.json".replace("{page}",a));(await e.json()).forEach(e=>{r.push(`<li class="item my-2 p-2 rounded-md">
          <a href="#item=${e.id}">
            ${e.title} (${e.comments_count})
          </a>
        </li>`)}),n.innerHTML=s.replace("{{newsFeed}}",r.join(""))}catch(e){console.error("Error:",e),n.innerHTML=`Error loading news feed: ${e.message||"Unknown error"}`}let l=n.querySelector(".prev-btn"),c=n.querySelector(".next-btn");a>e.minPage?l.addEventListener("click",()=>{e.currentPage=a-1,location.hash="#prevPage"}):l.remove(),a<e.maxPage?c.addEventListener("click",()=>{e.currentPage=a+1,location.hash="#nextPage"}):c.remove()}async function n(e){let t=e||document.getElementById("root");if(!t)throw Error("Root element not found");let n=location.hash.startsWith("#item=")?location.hash.substring(6):null;if(!n)throw Error("Invalid news ID format");let a=`
    <div class="container mx-auto p-4 max-w-4xl">
      <button class="back-btn bg-blue-500 text-white px-4 py-2 rounded-md mb-4">\u{2190} Back to News</button>
      <h1 class="text-2xl font-bold mb-4">{{title}}</h1>
      {{url}}
      <h2 class="text-xl font-bold mb-4">Comments:</h2>
      <ul class="comments-container">
        {{comments}}
      </ul>
    </div>
  `;try{o(t,!0);let e=await fetch("https://api.hnpwa.com/v0/item/{id}.json".replace("{id}",n)),r=await e.json();a=(a=a.replace("{{title}}",r.title)).replace("{{url}}",r.url?`<p class="mb-4 text-m text-gray-500"><a href="${r.url}" target="_blank">Visit Story</a></p>`:""),t.innerHTML=a.replace("{{comments}}",r.comments.length>0?function e(t,n=0){let o=[];return t.forEach(t=>{o.push(`
      <div style="padding-left: ${20*n}px;" class="comment my-6 bg-gray-50 p-2 rounded-lg">
       <div class="text-sm text-gray-500 mb-2 flex items-center gap-2">
            <span class="font-medium">${t.user||"Anonymous"}</span>
            <span class="text-gray-300">\u{2022}</span>
            <span>${new Date(1e3*t.time).toLocaleString()}</span>
          </div>
          <div class="prose prose-sm">
            ${t.content}
          </div> 
      </div>
    `),t.comments.length>0&&o.push(e(t.comments,n+1))}),o.join("")}(r.comments):'<p class="text-m text-gray-500">No comments yet</p>')}catch(e){console.error("Error:",e),t.innerHTML=`Error loading content: ${e.message||"Unknown error"}`}t.querySelector(".back-btn").addEventListener("click",()=>{location.hash=""})}function o(e,t){t&&(e.innerHTML="Loading...")}
//# sourceMappingURL=index.b6659a82.js.map
