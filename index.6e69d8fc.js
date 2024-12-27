let e;async function n(t,o){let r=t||document.getElementById("root");if(!r)throw Error("Root element not found");let i=document.createElement("ul");window.addEventListener("hashchange",async()=>{let t=location.hash.substring(1),i=document.createElement("div");try{r.innerHTML="Loading...";let a=await fetch("https://hacker-news.firebaseio.com/v0/item/{id}.json".replace("{id}",t)),c=await a.json(),l=document.createElement("button");l.innerHTML="← Back to News",l.addEventListener("click",()=>{location.hash="",n(r,o)});let d=`
        Title: ${c.title}
        URL Content: ${c.url?c.url:"No URL"}
        Comments: ${c.comments?c.comments.map(e=>e.content).join("\n"):"No comments"}
      `,m=(await e(d,{max_length:150,min_length:30}))[0].summary_text;i.innerHTML=`
        <h2>${c.title}</h2>
        <p><strong>Summary:</strong></p>
        <p>${m}</p>
        <p><strong>Original URL:</strong> <a href="${c.url}" target="_blank">${c.url}</a></p>
        <p><strong>Comments:</strong> ${c.comments_count||0}</p>
      `,r.innerHTML="",r.appendChild(l),r.appendChild(i)}catch(e){console.error("Error:",e),r.innerHTML="Error loading content"}});try{r.innerHTML="Loading...";let e=await fetch("https://api.hnpwa.com/v0/news/{page}.json".replace("{page}",o));(await e.json()).forEach(e=>{let n=document.createElement("li"),t=document.createElement("a");t.href=`#${e.id}`,t.innerHTML=`${e.title} (${e.comments_count})`,n.appendChild(t),i.appendChild(n)}),r.innerHTML="",r.appendChild(i)}catch(e){r.innerHTML="Error loading news feed",console.error("Error:",e)}if(o>1){let e=document.createElement("button");e.innerHTML="Previous Page",e.addEventListener("click",()=>{n(r,--o)}),r.appendChild(e)}if(o<10){let e=document.createElement("button");e.innerHTML="Next Page",e.addEventListener("click",()=>{n(r,++o)}),r.appendChild(e)}}if(async function(){try{e=await pipeline("summarization","Xenova/distilbart-cnn-6-6")}catch(e){console.error("Failed to initialize summarizer:",e)}}(),"undefined"!=typeof window){let e=document.getElementById("root");e&&n(e,1)}
//# sourceMappingURL=index.6e69d8fc.js.map
