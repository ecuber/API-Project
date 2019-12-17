/*
    NOTE: This file requires JQuery; please import it from whenever calling this script.
    Use this script tag:
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="../js/app.js"></script>
 */

let currentPokemon;

/**
 * Extracts the type/ability names from an array in the original format from the JSON object.
 * @param attribute - "ability" or "type" to be extracted
 * @param arr - Original array
 * @returns {[]}
 */
function extract(attribute, arr) {
    let newList = [];
    for (let i = 0; i < arr.length; i++) {
        newList.push(arr[i][attribute].name);
    }
    return newList;
}

/**
 * Displays the data about the pokemon from the currentPokemon object..
 */
function displayPokemon() {
    // console.log(currentPokemon);
    $('#pokemon-display').html(
        `<h1 class ="pokemon-name">${currentPokemon.name.charAt(0).toUpperCase()}${currentPokemon.name.substring(1)}</h1>
        <div class="flexrow">
            <img class="sprite" src="${currentPokemon.sprites.front_default}" height="300px">
            <ul class="pokemon-stats">
                <li class="pokemon-stats">Types: ${currentPokemon.types.join(", ")}</li>
                <li>Abilities: ${currentPokemon.abilities.join(", ")}</li>
            </ul>
        </div>
        `);

}

/**
 * Makes a request to the PokeAPI with the pokemon from the search bar, and displays it.
 */
function loadPokemon() {
    let $errDiv = $("#error");
    if (!$errDiv.hasClass("invisble")) {
        $errDiv.addClass("invisible")
    }
    const pokemon = $(".searchTerm").val().trim().toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
    let obj;
    $.get(url, (data, status) => {
        if (status === "success") {
            obj = {
                name: data.name,
                types: extract("type", data.types),
                abilities: extract("ability", data.abilities),
                sprites: data.sprites
            };
            currentPokemon = obj;
            displayPokemon();
        }
    }).fail(() => {
        oopsies(pokemon);
    });

}

function toggleError() {
    let div = $("#error");
    div.hasClass("invisible") ? div.removeClass("invisible") : div.addClass("invisible");
}

function oopsies(pokemon) {
    toggleError();
    throw new Error(`Couldn't find Pokemon with name/id: "${pokemon}"`);
}

/**
 * Click Event handler for searchButton
 */
$(".searchButton").on("click", () => {
    loadPokemon();
});


