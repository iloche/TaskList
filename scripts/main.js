// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

// ⭐ // // // // //  Déclaration de variables // // // // // // // // // /🍄

// 🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐🍄⭐

let addBtn = document.querySelector(".addBtn"),
    taskName = document.querySelector(".task-name"),
    date = document.querySelector(".date"),
    textarea = document.querySelector("textarea"),
    tubeList = document.querySelector(".tube-list"),
    tasksTube = [],
    taskDone = [],
    sortBtn = document.querySelector(".sortBtn"),
    doneList = document.querySelector(".done-list"),
    wrapper = document.querySelector(".wrapper")

// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

// ⭐ // // // // // // // // Fonctions // // // // // // // // // // // // /⭐

// 🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀⭐🎀 

function checkEmpty() {
    if (doneList.childElementCount === 0) {
        doneList.innerHTML = `No task done`;
    }
    if (tubeList.childElementCount === 0) {
        tubeList.innerHTML = `No task in the tube`;
    }
}
checkEmpty()

// Fonction pour afficher les tâches dans ma tubeList puis qui va les déplacer dans ma doneList 
function displayTasks() {
    // Suppression du contenu actuel de tubeList
    tubeList.innerHTML = "";

    // Parcours du tableau des tâches et création des éléments HTML correspondants
    tasksTube.forEach((task, index) => {
        // Création de la date formatée (convertit la date en une chaîne de caractères représentant la date au format local (ici "fr-FR"))
        let formattedDate = new Date(task.date).toLocaleDateString("fr-FR");
        tubeList.innerHTML += `
            <details data-index="${index}">
                <summary>
                    <span class="check">
                        <input type="checkbox">
                        <label>${task.name}</label>
                    </span>
                    <span class="dateCheck">${formattedDate}<span class="delete-task" title="Supprimer la tâche">🗑️</span></span>
                </summary>
                <p>${task.description}</p>
            </details>
        `;
    });
    checkEmpty()
}

function displayDoneTask(){
    taskDone.forEach((task) => {
        doneList.innerHTML += `
        <details>
            <summary>
                <span class="check">✓${task.name}</span><span class="delete-task" title="Supprimer la tâche">🗑️</span>
            </summary>
            <p>${task.description}</p>
        </details>
        `
    });
}

// Fonction de tri des tâches par date
function sortByDate() {
    // Utilisation de la méthode sort() pour trier les tâches
    tasksTube.sort((a, b) => {
        // Convertir les dates des tâches a et b en objets Date
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);

        // Comparaison des dates
        // Si dateA est avant dateB, renvoyer un nombre négatif (la tâche a vient avant la tâche b)
        // Si dateA est après dateB, renvoyer un nombre positif (la tâche b vient avant la tâche a)
        // Si les dates sont égales, renvoyer 0 (aucun changement d'ordre)
        return dateA - dateB;
    });
}    

// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️  

// ⭐ // // // // // // // Évenements // // // // // // // // // // // //⭐

// 🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️⭐🏵️

// Événement sur le bouton "Ajouter"
addBtn.addEventListener("click", () => {
    if(taskName.value.trim() !== "" && textarea.value.trim() !== ""){

        // Création d'un objet représentant la tâche à ajouter
        let taskObjet = {
            name : taskName.value,
            date: date.value,
            description: textarea.value
        };

        // Ajout de l'objet à tasksTube
        tasksTube.push(taskObjet);

        // Appel de la fonction pour afficher les tâches
        displayTasks();

        // Réinitialiser les champs de saisie
        taskName.value = ""
        date.value = ""
        textarea.value = ""

        } else {
            alert("Veuillez remplir tous les champs.")
        }
        // console.log(tasksTube);
        // console.log(taskDone);
});

// Événement sur le bouton de "Trier"
sortBtn.addEventListener("click", () => {
    sortByDate(); // Appel de la fonction de tri par date
    displayTasks(); // Réaffichage des tâches triées

    // Sauvegarder tasksTube dans le localStorage
    localStorage.setItem('tasksTube', JSON.stringify(tasksTube));
});

// Événement sur le conteneur wrapper pour gérer les actions sur les tâches
wrapper.addEventListener('click', (e) => {
    // Trouver l'élément parent <details> de l'élément cliqué
    let detailsElement = e.target.closest('details')

    // Vérifier si l'élément cliqué est une checkbox
    if (e.target.type === 'checkbox') {
        let index = e.target.closest("details").getAttribute('data-index');
        if(taskDone.length === 0){
        // Suppression du contenu actuel de doneList
                doneList.innerText = '';
        }
        
        taskDone.push(tasksTube[index])
        console.log(taskDone)
        // console.log(tasksTube)
        tasksTube.splice(index, 1)
        e.target.parentElement.parentElement.parentElement.remove()

        displayDoneTask()
        displayTasks()
        checkEmpty()
        // Sauvegarder tasksTube dans le localStorage
        localStorage.setItem('tasksTube', JSON.stringify(tasksTube));
        // Sauvegarder taskDone dans le localStorage
        localStorage.setItem('taskDone', JSON.stringify(taskDone));

        // Vérifier si le nombre de tâches terminées dépasse 5
        if (taskDone.length > 5) {
            // Supprimer la tâche la plus ancienne (la première dans le tableau taskDone)
            taskDone.shift();
            // Mettre à jour le localStorage avec les tâches terminées mises à jour
            localStorage.setItem('taskDone', JSON.stringify(taskDone));
            // Mettre à jour l'affichage des tâches terminées
            displayDoneTask();
        }
       
    }

    // Vérifier si l'élément cliqué a la classe "delete-task"
    if (e.target.classList.contains('delete-task')) {
        // Trouver l'élément <details> parent de l'icône de corbeille
        detailsElement = e.target.closest('details'),
        index = e.target.closest("details").getAttribute('data-index');
        // Supprimer l'élément <details> de l'affichage
        detailsElement.remove();
        // Supprimer la tâche de taskTubeTable
        tasksTube.splice(index, 1)
        taskDone.splice(index, 1)
        // console.log(tasksTube)
        // console.log(taskDone)
        checkEmpty()
    }
});

// Charger les tâches à partir du localStorage au chargement de la page
window.addEventListener('load', function() {
    // Vérifier si des tâches sont déjà stockées dans le localStorage
    if (localStorage.getItem('tasksTube')) {
        // Charger les tâches dans tasksTube uniquement si des données existent
        tasksTube = JSON.parse(localStorage.getItem('tasksTube'));
        // Mettre à jour la liste des tâches affichée
        displayTasks();

        // if (taskDone.length > 5) {
        //     // Supprimer la tâche la plus ancienne (la première dans le tableau taskDone)
        //     taskDone.shift();
        //     // Mettre à jour le localStorage avec les tâches terminées mises à jour
        //     localStorage.setItem('taskDone', JSON.stringify(taskDone));
        //     // Mettre à jour l'affichage des tâches terminées
        //     displayDoneTask();
        // }               
    }

    // Vérifier si des tâches terminées sont déjà stockées dans le localStorage
    if (localStorage.getItem('taskDone')) {
        // Charger les tâches terminées dans taskDone uniquement si des données existent
        taskDone = JSON.parse(localStorage.getItem('taskDone'));
    }
});

// Événement de validation à la touche "Enter"
textarea.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        addBtn.click()
    }
})