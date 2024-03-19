let addBtn = document.querySelector(".addBtn"),
    taskName = document.querySelector(".task-name"),
    date = document.querySelector(".date"),
    textarea = document.querySelector("textarea"),
    tubeList = document.querySelector(".tube-list")

addBtn.addEventListener("click", () => {
    tubeList.innerHTML = ``
    tubeList.innerHTML += `
    <details>
        <summary><span class="check"><input type="checkbox">${taskName.value}</span><span>${date.value}</span></summary>
        ${textarea.value}
    </details>
    
    `
})