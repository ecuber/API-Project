/*
    NOTE: This file requires JQuery; please import it from whenever calling this script.
    Use this script tag:
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 */

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
 * Returns an object with the attributes of the Pokemon entered in the search box.
 */
function getPokemon() {
    const pokemon = $("#searchBox").text();
    $.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`, (data, status) => {
        // console.log(status);
        if (status === "success") {
            // console.log(data.name);
            return {
                name: data.name,
                types: extract("type", data.types),
                abilities: extract("ability", data.abilities),
                sprites: data.sprites
            };
        } else {
            throw newError(pokemon);
        }
    });
}

function newError(id) {
    return new Error(`No Pokemon with name/ID ${id} found.`)
}
