function populateUFs() {
    const ufSelect = document 
        .querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json()) // funcão anonima retornando um valor.
    .then( states => {

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect =  document.querySelector("[name=city]")
    const stateInput =  document.querySelector("[name=state]")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
        //clear select
        citySelect.innerHTML = ''
        //disabled select
        citySelect.disabled = false

    fetch(url)
    .then( res => res.json()) 
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.name}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens De Coleta

//get all <li>
const itensToCollect = document.querySelectorAll(".itens-grid li")
for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem(event){
    const itemLi = event.target
    
    // add or remove class with js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
    // Verificar se existem itens selecionados, se sim
    // pegar os items selecionados
    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item === itemId
        return itemFound
    })

    //se ja estiver selecionado, tirar seleção
    if( alreadySelected >= 0 ) {
        const filteredItens = selectedItens.filter( (item) =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItens = filteredItens
    } else {
        // se não estiver selecionado, adicionar a seleção
        selectedItens.push(itemId)
    }

    // atualizar o input hidden com os itens selecionado
    collectedItens.value = selectedItens
}
