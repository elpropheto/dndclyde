
document.addEventListener('DOMContentLoaded', () => {
    const roll1 = document.getElementById('roll1');
    const roll2 = document.getElementById("roll2");
    const roll3 = document.getElementById("roll3");

    
    roll1.addEventListener('click', function(){
      const dicesToHide = document.querySelectorAll('#diceContainer img.dice-slot');
      let LastVisibleDiceIndex = -1;
      for (let i = 0; i < dicesToHide.length; i++){
        if (dicesToHide[i].style.display !== 'none'){
          LastVisibleDiceIndex = i;
        }
        if (LastVisibleDiceIndex !==-1){
          dicesToHide[LastVisibleDiceIndex].style.display = 'none';
          break;
        };
      };
    });

    roll2.addEventListener('click', function(){
      const faithToHide = document.querySelectorAll('#faithContainer img.faith-slot');
      let LastVisibleFaithIndex = -1;
      for (let i = 0; i < faithToHide.length; i++){
        if (faithToHide[i].style.display !== 'none'){
          LastVisibleFaithIndex = i;
        }
        if (LastVisibleFaithIndex !==-1){
          faithToHide[LastVisibleFaithIndex].style.display = 'none';
          break;
        };
      };
    });

    roll3.addEventListener('click', () =>{
       const usedDice = document.querySelectorAll('#diceContainer img.dice-slot');
       const usedFaith = document.querySelectorAll('#faithContainer img.faith-slot');
       const DiceIndex = document.getElementById("modyfikator");
       const FaithIndex = document.getElementById("act-of-faith");
       let AvailableDiceIndex = parseInt(DiceIndex.value);
       let AvailableFaithIndex = parseInt(FaithIndex.value);
       usedDice.forEach((image) =>{
        for (let i = 0; i < AvailableDiceIndex; i++){
          usedDice[i].style.display = 'inline-block';
        };
       });
       usedFaith.forEach((image) =>{
        for (let i = 0; i < AvailableFaithIndex; i++){
          usedFaith[i].style.display = 'inline-block';
        };
       });
    })
  });

  const diceSelector = document.getElementById("modyfikator");
  const diceImg = document.querySelectorAll("#diceContainer img.dice-slot");

  diceSelector.addEventListener("change", function () {
  const selectedValue = parseInt(diceSelector.value);

  diceImg.forEach((image, index) => {
    if (index < selectedValue) {
      image.style.display = "inline-block";
    } else {
      image.style.display = "none";
    }
  });
});

const faithSelector = document.getElementById("act-of-faith");
  const faithImg = document.querySelectorAll("#faithContainer img.faith-slot");

  faithSelector.addEventListener("change", function () {
  const selectedValue = parseInt(faithSelector.value);

  faithImg.forEach((image, index) => {
    if (index < selectedValue) {
      image.style.display = "inline-block";
    } else {
      image.style.display = "none";
    }
  });
});
// Spell Generator

var by_level = {
  "All": [],
  "0": [],
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": [],
  "8": [],
  "9": []
};

var spell_data;

function organizeSpellsByLevel(spell_data) {
  var by_level = { "All": [] };

  for (var spellName in spell_data) {
    if (spell_data.hasOwnProperty(spellName)) {
      var spell = spell_data[spellName];

      by_level["All"].push(spellName);

      if (spell.level) {
        by_level[spell.level] = by_level[spell.level] || [];
        by_level[spell.level].push(spellName);
      }
      else{
        console.log(`Zaklęcie "${spellName}" nie ma zdefiniowanego poziomu.`);
      }
    }
  }

  return by_level;
}

function getRandomSpellFromLevel(levelSpells) {
  const randomIndex = Math.floor(Math.random() * levelSpells.length);
  return levelSpells[randomIndex];
}

fetch('spells.json')
  .then(response => response.json())
  .then(data => {
    spell_data = data;
    const organizedSpells = organizeSpellsByLevel(spell_data);
    console.log(organizedSpells); // Wyświetlenie zorganizowanych zaklęć według poziomów
    const generate = document.getElementById('generate');

    generate.addEventListener('click', function(){

    const LevelsFromRoll = document.getElementById('levels-from');
    const LevelsToRoll = document.getElementById('levels-to');
    const LevelsFrom1 = LevelsFromRoll.value;
    const LevelsTo1 = LevelsToRoll.value;
    const LevelsFrom = parseInt(LevelsFrom1);
    const LevelsTo = parseInt(LevelsTo1);

    console.log(Number.isInteger(LevelsTo));
    console.log(LevelsFrom);
    console.log(LevelsTo);
    
    let spellsToChooseFrom = [];
    
    for (let level = LevelsFrom; level <= LevelsTo; level++){
      if (organizedSpells[level]){
        spellsToChooseFrom = spellsToChooseFrom.concat(organizedSpells[level]);
      }
    }
    const randomSpellName = getRandomSpellFromLevel(spellsToChooseFrom);
    const randomSpell = spell_data[randomSpellName];
    const spellDetails = `
    <strong>Nazwa:</strong> ${randomSpellName}<br>
    <strong>Casting Time:</strong> ${randomSpell.casting_time}<br>
    <strong>Components:</strong> ${randomSpell.components}<br>
    <strong>Description:</strong> ${randomSpell.description}<br>
    <strong>Duration:</strong> ${randomSpell.duration}<br>
    <strong>Level:</strong> ${randomSpell.level}<br>
    <strong>Range:</strong> ${randomSpell.range}
  `;
  
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = spellDetails;
  
    })
  })
  .catch(error => {
    console.error('Wystąpił błąd:', error);
  });

 



