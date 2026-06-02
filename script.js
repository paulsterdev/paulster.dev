fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-menu").innerHTML = data;
    });


fetch("projects.json")
    .then(response => response.json())
    .then(projects => {
        const projectContainer = document.getElementById("project-card-container");
        projects.forEach(project =>{
            const linkListHTML = [];
            let linkDisplayHTML = "";

            if (project.links.length > 1)
            {
                project.links.forEach(link =>{
                linkListHTML.push(`<a href=${link.url}> ${link.title}</a>`)
                })
                linkDisplayHTML =
                `
                <p class=heading4> Links: ${linkListHTML.join(", ")}</p>
                `;
            }
            else
            {
                linkDisplayHTML = 
                `
                <p class=heading4><a href=${project.links[0].url}> ${project.links[0].title}</a></p>
                `;
            }

            const imagesHTML = 
            `
                <div> 
                ${project.images.map(image => 
                    `
                    <img src=${image}>
                    `
                ).join("")}
                </div>
            `

            console.log(project.images);
            console.log(typeof project.images);
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
            const projectDetails = document.createElement("div");
            projectDetails.classList.add("project-details");
            projectDetails.id = project.title;
            console.log(project.links);
            console.log(project.links.length);
            projectDetails.innerHTML = 
            `<h3 class="heading2">${project.title}</h3>
            <h4 class=heading3>${project.description}</h4>
            ${linkDisplayHTML}
            ${imagesHTML}
            <p class=body-style> STACK: ${project.stack.join(", ")}</p>
            <p class=body-style> Tags: ${project.tags.join(", ")}</p>
            `;
            const separator = document.createElement("div");
            separator.classList.add("separator");
            projectContainer.appendChild(projectCard);
            projectCard.appendChild(projectDetails);
            projectContainer.appendChild(separator);
            });
        });