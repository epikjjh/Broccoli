let e=1;async function t(e){let n=e||document.getElementById("root");if(!n)throw Error("Root element not found");let o=location.hash.substring(),r=document.createElement("ul");try{n.innerHTML="Loading...";let e=await fetch("https://api.hnpwa.com/v0/news/{page}.json".replace("{page}",o));(await e.json()).forEach(e=>{let t=document.createElement("div");t.innerHTML=`
        <li>
          <a href="#item=${e.id}">
            ${e.title} (${e.comments_count})
          </a>
        </li>
      `,r.appendChild(t.firstElementChild)}),n.innerHTML="",n.appendChild(r)}catch(e){n.innerHTML="Error loading news feed",console.error("Error:",e)}if(o>1){let e=document.createElement("button");e.innerHTML="Previous Page",e.addEventListener("click",()=>{t(n,o-1)}),n.appendChild(e)}if(o<10){let e=document.createElement("button");e.innerHTML="Next Page",e.addEventListener("click",()=>{t(n,o+1)}),n.appendChild(e)}}async function n(e,t,n){let o=e||document.getElementById("root");if(!o)throw Error("Root element not found");let r=document.createElement("div");try{o.innerHTML="Loading...";let e=await fetch("https://api.hnpwa.com/v0/item/{id}.json".replace("{id}",n)),t=await e.json(),i=document.createElement("button");i.innerHTML="← Back to News",i.addEventListener("click",()=>{location.hash=""});let a=`
      Title: ${t.title}
      URL Content: ${t.url?t.url:"No URL"}
      Comments: ${t.comments?t.comments.map(e=>e.content).join("\n"):"No comments"}
    `;console.log(a);let l=(await summarizeText(a))[0].summary_text;r.innerHTML=`
      <h2>${t.title}</h2>
      <p><strong>Summary:</strong></p>
      <p>${l}</p>
      <p><strong>Original URL:</strong> <a href="${t.url}" target="_blank">${t.url}</a></p>
      <p><strong>Comments:</strong> ${t.comments_count||0}</p>
    `,o.innerHTML="",o.appendChild(i),o.appendChild(r)}catch(e){console.error("Error:",e),o.innerHTML="Error loading content"}}"undefined"!=typeof window&&document.getElementById("root")&&window.addEventListener("hashchange",function(o){if(!(o||document.getElementById("root")))throw Error("Root element not found");if(e=1,""===location.hash)t(o,e);else{let t=location.hash.substring(1);n(o,e,t)}});
//# sourceMappingURL=index.c9245fac.js.map
