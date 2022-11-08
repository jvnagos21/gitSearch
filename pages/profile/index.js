async function UserRender(){
    const currentUser = localStorage.getItem("userSelected")
    const button = document.querySelector(".button_return")

const dataProfile = []
let dataRepo = []
const user = await fetch("https://api.github.com/users/" + currentUser)
    .then((result) => result.json())
    .then((data)=> {
        dataProfile.push(data)
        console.log(data)
    })
const repo = await fetch(`https://api.github.com/users/${currentUser}/repos`)
        .then((result)=> result.json())
        .then((data)=> {
            dataRepo = data
            console.log(data)
        })

function UserData(objeto) {
        let container = document.querySelector(".user_container")
        let img = document.createElement("img")
        let name = document.createElement("h3")
        let bio = document.createElement("p")
        let name_container = document.createElement("div")
        name_container.classList = "name_container"
        img.src = objeto.avatar_url
        name.innerText = objeto.name
        bio.innerText = objeto.bio 
        name_container.append(name, bio)
        container.append(img, name_container)
}
function render(array, data) {
    array.forEach(element => {
        data(element)
    });
}
render(dataProfile, UserData)

function repoData(objeto){
    let container = document.getElementById("repo_container")
    let li = document.createElement("li")
    let name = document.createElement("h3")
    let description = document.createElement("p")
    let button_main = document.createElement("button")
    button_main.classList = "button_main"
    let div_button = document.createElement("div")
    div_button.classList = "div_button"
    name.innerText = objeto.name
    description.innerText = objeto.description 
    button_main.innerText = "Repository"
    button_main.addEventListener('click', ()=>{
        window.open(objeto.html_url, '_blank').focus()
    })
    container.append(li)
    div_button.append(button_main)
    li.append(name, description, div_button)
}

function callback() {
    console.log(dataRepo)
    render(dataRepo, repoData)
}
callback()
button.addEventListener('click', function(event){
    event.preventDefault()
    localStorage.removeItem("userSelected")
    window.location.replace("../../index.html")
})

}

UserRender()
