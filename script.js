fetch("/header.html")
    .then(response => response.text())
    .then(headerHTML => {
        document.getElementById("header-menu").innerHTML = headerHTML;
    });

fetch("/footer.html")
    .then(response => response.text())
    .then(footerHTML => {
        document.getElementById("footer").innerHTML = footerHTML;
    });


if (document.getElementById("project-card-container"))
    {
    fetch("/datasets/projects.json")
        .then(response => response.json())
        .then(projects => {
            const projectContainer = document.getElementById("project-card-container");
            projects.forEach(project =>{
                const linkListHTML = [];
                let linkDisplayHTML = "";
                console.log(project.links)
                if (project.links.length > 1)
                {
                    project.links.forEach(link =>{
                    linkListHTML.push(`<a href=${link.url}> ${link.title}</a>`)
                    })
                    linkDisplayHTML =
                    `
                    <p class="heading4 p-style-alt"> Links: ${linkListHTML.join(", ")}</p>
                    `;
                }
                else
                {
                    linkDisplayHTML = 
                    `
                    <p class="heading4 p-style-alt"><a href=${project.links[0].url}> ${project.links[0].title}</a></p>
                    `;
                }


                let imagesHTML = ``;

                if (project.images.length > 1)
                {
                    imagesHTML = 
                `
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
                `
                }
                else
                {
                    imagesHTML = 
                `
                        <button class=" slide-control-button button-styling" style="visibility: hidden;">
                        <i class="fa-solid fa-angle-left fa-3x" style="color: transparent"></i> 
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
                        <button class="button-styling" style="visibility: hidden;">
                        <i class="fa-solid fa-angle-right fa-3x next-icon" style="color: transparent"></i>
                        </button>
                    `
                }

                

            
                const projectCard = document.createElement("div");
                projectCard.classList.add("project-card");
                const projectDetails = document.createElement("div");
                projectDetails.id = project.name.replaceAll(" ","-");
                projectDetails.classList.add("project-details");

                projectDetails.innerHTML = 
                `<h3 class="project-title">${project.name}</h3>
                <h4 class=heading3>${project.description}</h4>
                ${linkDisplayHTML}
                <p class="body-style-alt p-style-alt"> STACK: ${project.stack.join(", ")}</p>
                <p class=body-style-alt p-style-alt"> Tags: ${project.tags.join(", ")}</p>
                `;
                const projectImages = document.createElement("div");
                projectImages.classList.add("carousel-container")
                projectImages.innerHTML =
                `
                ${imagesHTML}
                `;
                

                
                projectContainer.appendChild(projectCard);
                projectCard.appendChild(projectDetails);
                projectCard.appendChild(projectImages);

                if (projects.legnth > 1)
                {
                    const separator = document.createElement("div");
                    separator.classList.add("separator");
                    projectContainer.appendChild(separator);
                }
                

                const carouselContainer = projectCard.querySelector('.carousel-container');
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


if (document.getElementById("writing-cards-container"))
{
    fetch("/datasets/writings.json")
    .then(response =>response.json())
    .then(writings=> 
    {
        const writingsContainer = document.getElementById("writing-cards-container");
        
        if (writings.length >0)
        {
            writings.forEach(writing =>
            {
                const writingLink = writing.link;
                const writingDetails = document.createElement("div");
                writingDetails.classList.add("essay-card");
                const separator = document.createElement("div");
                separator.classList.add("separator");

                writingDetails.innerHTML = 
                `
                    <a href=${writing.link}>
                        <h3 class="essay-link">${writing.title}</h3>
                    </a>
                    <h4 class=body-style>${writing.date}</h4>
                `;

                writingsContainer.appendChild(writingDetails);
                if (writings.length > 1)
                {
                    writingsContainer.appendChild(separator);
                }
                
            }

        )
        }
        else
        {
            const writingDetails = document.createElement("div");
            writingDetails.classList.add("essay-card");
            writingDetails.innerHTML =
            `
                <h3 class="body-style"> (Nothing here yet)</h3>
            `
            writingsContainer.appendChild(writingDetails);
        }

        
    })
}


if (document.getElementById("research-cards-container"))
{
    fetch("/datasets/research.json")
    .then(response =>response.json())
    .then(research=> 
    {
        const writingsContainer = document.getElementById("research-cards-container");
        
        if (research.length >0)
        {
            research.forEach(researchEssay =>
            {
                const writingDetails = document.createElement("div");
                writingDetails.classList.add("essay-card");
                const writingLink = researchEssay.link;
                const separator = document.createElement("div");
                separator.classList.add("separator");
                writingDetails.innerHTML = 
                `
                    <a href=${researchEssay.link}>
                        <h3 class="essay-link">${researchEssay.title}</h3>
                    </a>
                    <h4 class="body-style">${researchEssay.date}</h4>
                `;

                writingsContainer.appendChild(writingDetails);
                if (research.legnth > 1)
                {
                    writingsContainer.appendChild(separator);
                }
                
            }
        )
        }
        else
        {
            const writingDetails = document.createElement("div");
            writingDetails.classList.add("essay-card");
            writingDetails.innerHTML =
            `
                <h3 class="body-style"> (Nothing here yet)</h3>
            `
            writingsContainer.appendChild(writingDetails);
        }

        
    })
}