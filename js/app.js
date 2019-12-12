/*
    NOTE: This file requires JQuery; please import it from whenever calling this script.
    Use this script tag:
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 */

function extractTypes(typeList) {
    let newList = [];
    for (let i = 0; i < typeList.length; i++) {
        newList.push(typeList[i].type.name);
    }
    return newList;
}

/**
 * Returns an object with the attriutes of the desired Pokemon.
 * @param pokemon - String, the name or ID of the Pokemon.
 */
function getPokemon(pokemon) {
    $.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`, (data, status) => {
        console.log(status);
        if (status === "success") {
            console.log(data.name);
            return {
                name: data.name,
                types: extractTypes(data.types),
                sprites: data.sprites
            };
        } else {
            throw newError(pokemon);
        }
    }).then(r => {
        // TODO: figure out what to do with this promise-- anything?
    });
}

function newError(id) {
    return new Error(`No Pokemon with name/ID ${id} found.`)
}

// console.log(getPokemon("bulbasaur"));