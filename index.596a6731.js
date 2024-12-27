async function e(t,n){let o=t||document.getElementById("root");if(!o)throw Error("Root element not found");let r=document.createElement("ul");window.addEventListener("hashchange",async()=>{let t=location.hash.substring(1),r=document.createElement("div");try{o.innerHTML="Loading...";let a=await fetch("https://hacker-news.firebaseio.com/v0/item/{id}.json".replace("{id}",t)),i=await a.json(),c=document.createElement("button");c.innerHTML="← Back to News",c.addEventListener("click",()=>{location.hash="",e(o,n)});let l=`
        Title: ${i.title}
        URL Content: ${i.url?i.url:"No URL"}
        Comments: ${i.comments.map(e=>e.content).join("\n")}
      `,d=await fetch("https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6b",{method:"POST",headers:{Authorization:"Bearer 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","Content-Type":"application/json"},body:JSON.stringify({inputs:l,parameters:{max_length:150,min_length:30}})}),s=(await d.json())[0].summary_text;r.innerHTML=`
        <h2>${i.title}</h2>
        <p><strong>Summary:</strong></p>
        <p>${s}</p>
        <p><strong>Original URL:</strong> <a href="${i.url}" target="_blank">${i.url}</a></p>
        <p><strong>Comments:</strong> ${i.comments_count}</p>
      `,o.innerHTML="",o.appendChild(c),o.appendChild(r)}catch(e){console.error("Error:",e),o.innerHTML="Error loading content"}});try{o.innerHTML="Loading...";let e=await fetch("https://api.hnpwa.com/v0/news/{page}.json".replace("{page}",n));(await e.json()).forEach(e=>{let t=document.createElement("li"),n=document.createElement("a");n.href=`#${e.id}`,n.innerHTML=`${e.title} (${e.comments_count})`,t.appendChild(n),r.appendChild(t)}),o.innerHTML="",o.appendChild(r)}catch(e){o.innerHTML="Error loading news feed",console.error("Error:",e)}if(n>1){let t=document.createElement("button");t.innerHTML="Previous Page",t.addEventListener("click",()=>{e(o,--n)}),o.appendChild(t)}if(n<10){let t=document.createElement("button");t.innerHTML="Next Page",t.addEventListener("click",()=>{e(o,++n)}),o.appendChild(t)}}if("undefined"!=typeof window){let t=document.getElementById("root");t&&e(t,1)}
//# sourceMappingURL=index.596a6731.js.map
