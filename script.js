fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-menu").innerHTML = data;
    });


fetch("projects.json")
    .then(response => response.json())
    .then(projects => {
        const project_container = document.getElementById("project-card-container");
        projects.forEach(project =>{
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-details");
            projectCard.innerHTML =  
                `
                <h1 class=heading4> ${project.title} </h1>
            
                `
            const separator = document.createElement("div");
            separator.classList.add("separator");
            project_container.appendChild(projectCard);
            project_container.appendChild(separator);
            });
        });