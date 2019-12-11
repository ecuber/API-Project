/*
    NOTE: This file requires JQuery; please import it from whenever calling this script.
    Use this script tag:
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 */

/**
 * Returns an object with the attributes of the desired Pokemon.
 * @param pokemon - String, the name or ID of the Pokemon.
 */


function getPokemon(pokemon) {
    $.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`, (data, status) => {
        // console.log(object);
        // console.log(status);
        if (status === "success") {
            console.log(data.name);
            let results = {
                name: data.name,
                type: data.type.name,
                sprites: data.sprites
            };
            console.log(results);
        } else {
            throw newError(pokemon);
        }
    });
}

function newError(id) {
    return new Error(`No Pokemon with name/ID ${id} found.`)
}

console.log(getPokemon("pikachu"));
