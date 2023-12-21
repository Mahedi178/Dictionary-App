//https://wordsapiv1.p.mashape.com/words/outweigh

const word = document.getElementById('word');
const btn = document.getElementById('btn');
const definition = document.querySelector('.definitions');
const synonym = document.querySelector('.synonyms');
const antonym = document.querySelector('.antonyms');
// console.log(word);
// console.log(btn);

// const URL_API = 'https://wordsapiv1.p.mashape.com/words/';
const URL_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

function definitionList(definitions) {
    const h2 = document.createElement('h2');
    h2.innerHTML = `Definitions`;
    definition.appendChild(h2);
    for (let i = 0; i < definitions.length; i++) {
        let list = document.createElement('li');
        list.innerHTML = definitions[i].definition;
        if (definitions[i]?.example) {
            const exam = document.createElement('li');
            exam.innerHTML = `Example: ${definitions[i].example}`;
            list.appendChild(exam);
        }
        definition.appendChild(list);
    }
}

function synonymList(synonyms) {
    const h2 = document.createElement('h2');
    if (synonyms.length === 0) {
        return;
    }
    h2.innerHTML = `Synonyms`;
    synonym.appendChild(h2);

    let list = '';
    for (let i = 0; i < synonyms.length; i++) {
        list = document.createElement('li');
        list.innerHTML = synonyms[i];
        synonym.appendChild(list);
    }
}

function antonymList(antonyms) {
    const h2 = document.createElement('h2');
    if (antonyms.length === 0) {
        return;
    }
    h2.innerHTML = `Antonyms`;
    antonym.appendChild(h2);

    let list = '';
    for (let i = 0; i < antonyms.length; i++) {
        list = document.createElement('li');
        list.innerHTML = antonyms[i];
        antonym.appendChild(list);
    }
}

function notFoundResult() {
    const h4 = document.createElement('h4');
    h4.innerHTML = `The word you are looking for is not found`;
    definition.appendChild(h4);
}

function clear() {
    definition.innerHTML = '';
    synonym.innerHTML = '';
    antonym.innerHTML = '';
}

btn.addEventListener('click', function () {
    clear();
    fetch(URL_API + word.value)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if (response[0] == undefined) {
                notFoundResult();
                return;
            }
            console.log(response[0]);
            const definitions = response[0].meanings[0].definitions;
            const synonyms = response[0].meanings[0].synonyms;
            const antonyms = response[0].meanings[0].antonyms;

            definitionList(definitions);
            synonymList(synonyms);
            antonymList(antonyms);
        })
        .catch(function (error) {
            console.log(error);
        });
});
