async function getData() {
    let reponse = await fetch('../../Backend/main.json')
    let data = await reponse.json()
    return data
}
async function start() {
    let data = await getData()
    read(data, "all")
}
start()


let cards = document.getElementById("cards")
async function read(data) {
    cards.innerHTML = ""
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
        for (let x = 0; x < data[keys[i]].length; x++) {
            let div = document.createElement("div")
            let idParent = `parent${data[keys[i]][x].id}`
            let pricesTaill = data[keys[i]][x].pricesTaill != undefined ? Object.keys(data[keys[i]][x].pricesTaill) : "No"
            if (pricesTaill != "No") {
                let idDiv = ""
                for (let y = 0; y < pricesTaill.length; y++) {
                    idDiv = `${data[keys[i]][x].id}`
                    div.id = `div${idDiv}`
                    div.innerHTML += `<button ${y === 0 ? `class="active"` : ""} onclick="classAndActive('${div.id}' , this , '${keys[i]}'  , ${data[keys[i]][x].id} , '${pricesTaill[y]}', '${idParent}')">${pricesTaill[y]}</button>`

                }

            }
            cards.innerHTML += `
                <div class="product-info" id='${idParent}'>
                    <h3>${data[keys[i]][x].name} ${pricesTaill != "No" ? `(${pricesTaill[0]})` : ""}</h3>
                    ${data[keys[i]][x].description != undefined ? `<p>${data[keys[i]][x].description} </p>` : ""}
                    <span class="price">${pricesTaill === "No" ? data[keys[i]][x].price : data[keys[i]][x].pricesTaill[pricesTaill[0]]}DH</span>
                    ${pricesTaill != "No" ? `<div class="Taill"  id="${div.id}">${div.innerHTML}</div>` : ""}
                    <button onclick="commender(${data[keys[i]][x].id} , '${keys[i]}' , ${pricesTaill != "No" ? `'${pricesTaill[0]}'` : undefined })">Commander</button>
                </div>
            `
        }
    }
}



let categorie = document.getElementById("categorie")
categorie.onchange = async () => {
    let data = await getData()
    let dataCaty = data[categorie.value]
    if (categorie.value != "all") {
        let object = { [categorie.value]: dataCaty }
        read(object)
    } else {
        read(data)
    }

}
async function debutSearch() {
    let search = document.getElementById("search")
    let motsCle = search.value
    let data = await getData()
    let keys = Object.keys(data)
    let searchtrove = false
    let disTrove = false
    let object = {

    }
    for (let i = 0; i < keys.length; i++) {
        for (let x = 0; x < data[keys[i]].length; x++) {
            disTrove = data[keys[i]][x].description != undefined
            if (data[keys[i]][x].name.toLowerCase().includes(motsCle.toLowerCase())) {
                searchtrove = true
                if (object[keys[i]] === undefined) {
                    object[keys[i]] = []
                }
                object[keys[i]].push(data[keys[i]][x])
            } else if (disTrove) {
                if (data[keys[i]][x].description.toLowerCase().includes(motsCle.toLowerCase())) {
                    searchtrove = true
                    if (object[keys[i]] === undefined) {
                        object[keys[i]] = []
                    }
                    object[keys[i]].push(data[keys[i]][x])
                }
            }
        }
    }
    read(object)
    if (!searchtrove) {
        cards.innerHTML = '<p class="no-product">Aucun plat trouvé</p>'
    }
}
