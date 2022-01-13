//Create the data table
async function workWithUserData() {
    const fetchedUserData = await fetch('/userData')
    const tmpdata = await fetchedUserData.json()
    const userData = tmpdata

    //get DOM table to fill with user data
    const table = document.getElementById("data_user_container")
    
    //Define table main elements
    const thead = document.createElement("thead")
    const tbody = document.createElement("tbody")
    const trHead = document.createElement("tr")

    //create the header elements
    const th = document.createElement("th")
    th.innerText = 'modifier'
    trHead.append(th)
    //get headers to append them in the table header
    Object.entries(userData[0]).forEach(element => {
        const th = document.createElement("th")
        th.innerText = `${element[0]}`
        trHead.append(th)
    })

    //Loop in the given data
    userData.forEach(obj => {
        var infoCounter = 0
        const trBody = document.createElement("tr")

        //Create all the componements to the table
        const modifiertd = document.createElement("td")
        const imageAsButton = document.createElement("img")
        imageAsButton.className = "imgButton"
        imageAsButton.src = "../style/media/scalable/modifier.svg"
        const confirmButton = document.createElement('img')
        confirmButton.src = '../style/media/confirm.png'
        confirmButton.classList.add('confirm')
        const cancelButton = document.createElement('img')
        cancelButton.src = '../style/media/close.png'
        cancelButton.classList.add('cancel')

        confirmButton.hidden = true
        cancelButton.hidden = true 

        //append firt components in the elements of the table
        modifiertd.append(imageAsButton)
        modifiertd.append(confirmButton)
        modifiertd.append(cancelButton)
        trBody.append(modifiertd)

        //append infos to the cells of the table
        Object.entries(obj).forEach(element => {
            infoCounter += 1
            const td = document.createElement("td")
            if (infoCounter > 4) {
                td.className = "smallInfo"
            }
            td.innerText = `${element[1]}`
            trBody.append(td)
        })
        tbody.append(trBody)
    })

    thead.append(trHead)
    table.append(thead)
    table.append(tbody)

    //make the table sortable
    $('#data_user_container').tablesorter()

    imgButtonWork()
}

//Function to interact with the edit button and edit the user in the wanted line
function imgButtonWork() {
    const table = document.getElementById("data_user_container")
    const popup = document.getElementsByClassName("container_popup")
    const toBlur = document.getElementById('data_user_container')

    document.addEventListener('click',function(e){

        const row = getElementRow(e)
        const imgButton = row.childNodes[0].childNodes[0]
        const confirmButton = row.childNodes[0].childNodes[1]
        const cancelButton = row.childNodes[0].childNodes[2]

        //Onclick Edit Button
        if (e.target && e.target.className == 'imgButton'){
            //clear all yellow lines and editing fields
            clearAllEditFields(e)
            clearAllEditClasses(e)
            hiddeAllEditConfirmButtons(e)

            for (let i=1; i < row.childNodes.length; i++) {
                row.childNodes[i].classList.add('edit')
            }
            imgButton.hidden = true
            confirmButton.hidden = false
            cancelButton.hidden = false

            performEditingTasks(e)

        //Onclick confirm Button
        } else if (e.target && e.target.classList.contains('confirm')) {
            for (let i=1; i<row.childNodes.length; i++) {
                row.childNodes[i].classList.remove('edit')
            }

            confirmButton.hidden = true
            cancelButton.hidden = true   
            imgButton.hidden = false

            toBlur.classList.add('toBlur')
            popup[0].classList.toggle('fadeInAnimation')
            popup[0].classList.remove('container_popup_hidden')

            /* send form infos */
            

        //Onclick cancel button
        } else if (e.target && e.target.classList.contains('cancel')) {

            clearAllEditFields(e)

            for (let i=1; i<row.childNodes.length; i++) {
                row.childNodes[i].classList.remove('edit')
            }

            confirmButton.hidden = true
            cancelButton.hidden = true   
            imgButton.hidden = false

        } else if (e.target && e.target.classList.contains('popup_button')) {
            popup[0].classList.add('container_popup_hidden')
            popup[0].classList.toggle('fadeInAnimation')
            toBlur.classList.remove('toBlur')

        }
    })
}

/* ------------------Utility functions to work on the table to edit, confirm and cancel edit -----------------*/
//The name of the functions are pretty straight forward

function clearAllEditClasses(e) {
    const table = getElementRow(e).parentNode
    const tableRows = table.childNodes
    
    for (let i=0; i<tableRows.length; i++) {
        for (let i2=0; i2<tableRows[i].childNodes.length; i2++) {
            if (tableRows[i].childNodes[i2].classList.contains('edit')) {
                tableRows[i].childNodes[i2].classList.remove('edit')
            }
        }
    }
}

function hiddeAllEditConfirmButtons(e) {
    const table = getElementRow(e).parentNode
    const tableRows = table.childNodes
    
    for (let i=0; i<tableRows.length; i++) {
        for (let i2=0; i2<tableRows[i].childNodes.length; i2++) {
            const isImgBoolean = tableRows[i].childNodes[i2].childNodes[0].localName === 'img'
            if (isImgBoolean) {
                const containsImgButtonBoolean = tableRows[i].childNodes[i2].childNodes[0].classList.contains('imgButton')
                if(containsImgButtonBoolean) {
                    const imgButton = tableRows[i].childNodes[i2].childNodes[0]
                    const confirmButton = tableRows[i].childNodes[i2].childNodes[1]
                    const cancelButton= tableRows[i].childNodes[i2].childNodes[2]

                    confirmButton.hidden = true
                    cancelButton.hidden = true   
                    imgButton.hidden = false
                }
            }
        }
    }
}

function clearAllEditFields(e) {
    const inputList = document.querySelectorAll("td input")
    const selectorList = document.querySelectorAll("select")
    const test = document.querySelectorAll("span")

    if (inputList.length > 0) {
        for (var input of inputList) {
            if (input.classList.contains("passHolder")) {
                const tmp_parent = input.parentNode
                tmp_parent.removeChild(input)
                if (tmp_parent.childNodes[1] === undefined) {
                    const tmp_text = tmp_parent.childNodes[0].innerText
                    tmp_parent.innerText = tmp_text
                }

            } else {
                const tmp_text = input.placeholder
                input.parentNode.innerText = tmp_text

            }
        }
    }
    if (selectorList.length > 0) {
        for (var selector of selectorList) {
            const tmp_text = selector.childNodes[0].innerHTML
            selector.parentNode.innerText = tmp_text

        }
    }
}

function performEditingTasks(e) {
    const row = getElementRow(e)
    const elements = row.childNodes
    const powerElement = document.createElement("select")
    const optionRegular = document.createElement("option")
    const optionAdmin = document.createElement("option")
    const modifyPassword = document.createElement("input")
    const modifyPasswordConfirm = document.createElement("input")
    const passwordHashDisplay = document.createElement("div")

    //parameters of powerElement
    powerElement.name = "power"
    powerElement.id = "power"
    optionRegular.value = "regular"
    optionRegular.innerText = "Normal"
    optionAdmin.value = "admin"
    optionAdmin.innerText = "Administrateur"
    //modify password
    modifyPassword.className = "modifyPassword passHolder"
    modifyPasswordConfirm.className = "modifyPasswordConfirm passHolder"
    modifyPassword.placeholder = "Nouveau mot de passe"
    modifyPasswordConfirm.placeholder = "Confirmer le nouveau mot de passe"

    //Loop through lines to be able to modify the infos
    for (let i = 1; i < elements.length; i++) {
        if (i<4) {
            const newField = document.createElement("input")
            newField.placeholder = `${elements[i].innerText}`
            elements[i].innerText = ""
            elements[i].appendChild(newField)

        } else if (i===4) {
            if (elements[i].innerText == "Administrateur") {
                powerElement.append(optionAdmin)
                powerElement.append(optionRegular)

            } else {
                powerElement.append(optionRegular)
                powerElement.append(optionAdmin)
            }
            
            elements[i].innerText = ""
            elements[i].append(powerElement)

        } else if (i===5) {
            const tmp_text = elements[i].innerText
            elements[i].innerText = ""
            passwordHashDisplay.innerText = tmp_text
            
            elements[i].append(passwordHashDisplay)
            elements[i].append(modifyPassword)
            elements[i].append(modifyPasswordConfirm)

        }
    }
}

function getElementRow(e) {
    return e.target.parentNode.parentNode
}

function getElementFromElementRow(e, i) {
    return e.target.parentNode.parentNode.childNodes[i].innerText
}

workWithUserData()