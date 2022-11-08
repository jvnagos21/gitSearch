const form = document.getElementById("form")
const input = document.getElementById("input_user")
const button = document.getElementById("button")

form.addEventListener('submit', async function(event){
    event.preventDefault()
    let value = input.value 
    const response = await fetch("https://api.github.com/users/" + value).then((result) => result.json())
    if (response.message == "Not Found"){
        document.querySelector(".userNotFound").style.display = "flex"
        button.innerText = "Ver perfil do github"
        button.disabled = true
    }else{
        localStorage.setItem("userSelected", value)
        window.location.replace("../../pages/profile/index.html")
    }

})

const div = document.createElement("button")

button.addEventListener("click", ()=>{
    button.innerHTML = ""
    button.append(div)
    div.classList.add("button--loading")

})

button.disabled = true 

input.addEventListener("keyup", input =>{
    if (input.target.value == ""){
        button.disabled = true  
    }else{
        button.disabled = false 
    }
})