async function workWithData() { // Asyncronous function to work with the fetched data

    const response = await fetch('/data')
    const tempdata = await response.json()
    const data = JSON.parse(tempdata)

    /* define table headers 
    This way you can modify the headers*/

    /* -----------------
        /!\ IMPORTANT /!\
     ------------------
     Please respect the upper or lowercase of the table content lists*/

    const headers = ["NOM", "Prénom", "Sexe", "Âge", "Taille", "Poids"]
    const date_headers = ["Jour", "Mois", "Année", "Heure"]

    const notations = ["NOM", "PRENOM", "SEXE", "AGE", "TAILLE", "POIDS", "DATE_DERNIER_PRELEVEMENT"]
    const date_notations = ["JOUR", "MOIS", "ANNEE", "HEURE"]

    const container = document.getElementById('data_med_container')
    const head = document.createElement('thead')
    const body = document.createElement('tbody')
    const tbHEADERS = document.createElement('tr')

    //Loop inter the list to generate headers in the table

    notations.forEach(element => {
        //detect date element of the headers
        if (element === "DATE_DERNIER_PRELEVEMENT") {
            //loops into the date elements
            date_notations.forEach(dateElement => {
                const currentDateColumn = document.createElement('th')
                currentDateColumn.innerText = date_headers[date_notations.indexOf(dateElement)]
                //puts the header list into the table header
                tbHEADERS.append(currentDateColumn)
            })

        } else {
            const currentColumn = document.createElement('th')
            currentColumn.innerText = headers[notations.indexOf(element)]
            //puts the header list into the table header
            tbHEADERS.append(currentColumn)
        }
    })

    //append headers row into the thead
    head.append(tbHEADERS)

    //loop into the Data to append data into the table
    data.forEach(obj => {
        const currentRow = document.createElement("tr")
        
        //loop into each object of the data json
        Object.entries(obj).forEach(innerElement => {
            //detect date element of the object
            if (innerElement[0] === "DATE_DERNIER_PRELEVEMENT") {
                //loops into the date elements
                Object.entries(innerElement[1]).forEach(dateElement => {
                    const currentDateColumn = document.createElement("td")
                    currentDateColumn.innerText = `${dateElement[1]}`
                    currentRow.append(currentDateColumn)
                })

            } else {
                const currentColumn = document.createElement("td")
                currentColumn.innerText = `${innerElement[1]}`
                currentRow.append(currentColumn)
            }

            body.append(currentRow)

        })

        //Put all the headers and infos to the main container
        container.append(head)
        container.append(body)

    })

    $('#data_med_container').tablesorter()

}

workWithData()
//------------------

document.addEventListener('click', e => {
    const isDropDownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropDownButton && e.target.closest("[data-dropdown]") != null) return

    let currentDropdown
    if  (isDropDownButton) {
        currentDropdown = e.target.closest("[data-dropdown]")
        currentDropdown.classList.toggle('active')
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove('active')
    })
})