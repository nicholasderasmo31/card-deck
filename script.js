async function getPokemonData() {
    const response = await fetch('poke.json');
    const data = await response.json();
    console.log(data);

    const pokemonData = data.pokemon;

    for (let i = 0; i < pokemonData.length; i++) {
        const p = new PokemonCard(
            pokemonData[i].name,
            pokemonData[i].type,
            pokemonData[i].hp,
            pokemonData[i].bestMove,
            pokemonData[i].image,
        );
        p.updateCard();
    }
}

getPokemonData();


class PokemonCard {
    constructor(name, type, hp, bestMove, image) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.bestMove = bestMove;
        this.image = image;

        //outer card
        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('card');

        //front face 
        this.front = document.createElement('div');
        this.front.classList.add('card-face', 'card-front');



        this.imageElement = document.createElement('img');
        this.imageElement.src = this.image;
        this.imageElement.alt = this.name;

        this.nameElement = document.createElement('h2');
        this.typeElement = document.createElement('p');
        this.hpElement = document.createElement('p');
        this.moveElement = document.createElement('p');

        
        this.front.appendChild(this.imageElement);
        this.front.appendChild(this.nameElement);
        this.front.appendChild(this.typeElement);
        this.front.appendChild(this.hpElement);
        this.front.appendChild(this.moveElement);







        //back face
        this.back = document.createElement('div');
        this.back.classList.add('card-face', 'card-back');

        const backLabel = document.createElement('p');
        backLabel.innerText = 'Pokemon';
        this.back.appendChild(backLabel);

        //both faces go into this card
        this.cardElement.appendChild(this.front);
        this.cardElement.appendChild(this.back);


        const that = this;
        this.onClick = function () {
            that.flip();

        };
        this.cardElement.addEventListener('click', this.onClick);

        document.getElementById('deck').appendChild(this.cardElement);

    }


    updateCard() {
        this.nameElement.innerText = this.name;
        this.typeElement.innerText = 'Type:' + this.type;
        this.hpElement.innerText = 'HP:' + this.hp;
        this.moveElement.innerText = 'Best move:' + this.bestMove;
    }

    flip() {
        this.cardElement.classList.toggle('flipped');
    }
}





