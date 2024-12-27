async function e(t,n){let o=t||document.getElementById("root");if(!o)throw Error("Root element not found");let r=document.createElement("ul");window.addEventListener("hashchange",async()=>{let t=location.hash.substring(1),r=document.createElement("div");try{o.innerHTML="Loading...";let a=await fetch("https://hacker-news.firebaseio.com/v0/item/{id}.json".replace("{id}",t)),i=await a.json(),c=document.createElement("button");c.innerHTML="← Back to News",c.addEventListener("click",()=>{location.hash="",e(o,n)});let s=`
        Title: ${i.title}
        URL Content: ${i.url?i.url:"No URL"}
        Comments: ${i.comments.map(e=>e.content).join("\n")}
      `,l=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer your-api-key"},body:JSON.stringify({model:"gpt-4o",messages:[{role:"user",content:`Please summarize this Hacker News post and its comments concisely:
${s}`}]})}),d=(await l.json()).choices[0].message.content;r.innerHTML=`
        <h2>${i.title}</h2>
        <p><strong>Summary:</strong></p>
        <p>${d}</p>
        <p><strong>Original URL:</strong> <a href="${i.url}" target="_blank">${i.url}</a></p>
        <p><strong>Comments:</strong> ${i.comments_count}</p>
      `,o.innerHTML="",o.appendChild(c),o.appendChild(r)}catch(e){console.error("Error:",e),o.innerHTML="Error loading content"}});try{o.innerHTML="Loading...";let e=await fetch("https://api.hnpwa.com/v0/news/{page}.json".replace("{page}",n));(await e.json()).forEach(e=>{let t=document.createElement("li"),n=document.createElement("a");n.href=`#${e.id}`,n.innerHTML=`${e.title} (${e.comments_count})`,t.appendChild(n),r.appendChild(t)}),o.innerHTML="",o.appendChild(r)}catch(e){o.innerHTML="Error loading news feed",console.error("Error:",e)}if(n>1){let t=document.createElement("button");t.innerHTML="Previous Page",t.addEventListener("click",()=>{e(o,--n)}),o.appendChild(t)}if(n<10){let t=document.createElement("button");t.innerHTML="Next Page",t.addEventListener("click",()=>{e(o,++n)}),o.appendChild(t)}}if("undefined"!=typeof window){let t=document.getElementById("root");t&&e(t,1)}
//# sourceMappingURL=index.f607cb53.js.map
