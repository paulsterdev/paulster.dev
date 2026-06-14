fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-menu").innerHTML = data;
    });


if (document.getElementById("project-card-container"))
    {
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
                    <div class="carousel-container">
                        <button class="slide-control-button previous-button button-styling">
                        <i class="fa-solid fa-angle-left fa-3x"></i> 
                        </button>
                        <div class="carousel-track">
                            ${project.images.map(image => 
                                `
                                <div class="carousel-slide-container">
                                <img src=${image} alt="A showcase image for my ${project.name}" class="carousel-slide">
                                </div>
                                `
                            ).join("")}
                        </div>
                        <button class="slide-control-button next-button button-styling">
                        <i class="fa-solid fa-angle-right fa-3x next-icon"></i>
                        </button>
                    </div>
                `

            
                const projectCard = document.createElement("div");
                projectCard.classList.add("project-card");
                const projectDetails = document.createElement("div");
                projectDetails.id = project.name.replaceAll(" ","-");
                projectDetails.classList.add("project-details");

                projectDetails.innerHTML = 
                `<h3 class="heading2">${project.name}</h3>
                <h4 class=heading3>${project.description}</h4>
                ${linkDisplayHTML}
                <p class=body-style> STACK: ${project.stack.join(", ")}</p>
                <p class=body-style> Tags: ${project.tags.join(", ")}</p>
                `;
                const projectImages = document.createElement("div");
                projectImages.innerHTML =
                `
                ${imagesHTML}
                `;
                

                const separator = document.createElement("div");
                separator.classList.add("separator");
                projectContainer.appendChild(projectCard);
                projectCard.appendChild(projectDetails);
                projectCard.appendChild(projectImages);
                projectContainer.appendChild(separator);

                const carouselContainer = projectImages.querySelector('.carousel-container');
                const track = carouselContainer.querySelector('.carousel-track');
                const previousButton = carouselContainer.querySelector('.previous-button');
                const nextButton = carouselContainer.querySelector('.next-button');

                const slideContainers = track.querySelectorAll('.carousel-slide-container');
                let currentSlide = 0;
                const slideCount = slideContainers.length;

                nextButton.addEventListener("click", () => {

                    currentSlide++;

                    if (currentSlide >= slideCount){
                        currentSlide = 0;
                        track.scrollTo({left: 0, behavior:"smooth"});
                    }
                    else
                    {
                        track.scrollBy({left: track.clientWidth, behavior:"smooth"})
                    }
                });
                
                previousButton.addEventListener("click", () => {track.scrollBy({left: -track.clientWidth, behavior: "smooth"})});

                });
            });
        }