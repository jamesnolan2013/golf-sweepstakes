const PARTICIPANTS = {
    'James Nolan': ['5539', '9037', '569'],                      // Fleetwood, Fitzpatrick, Rose
    'Joe O\'Sullivan': ['5409', '5467', '9478'],                 // Henley, Spieth, Scheffler
    'Cillian Kelly-Murtagh': ['5539', '388', '11378'],          // Fleetwood, Scott, MacIntyre
    'Ben Mullin': ['9658', '9780', '9478'],                     // Pendrith, Rahm, Scheffler
    'Evan Cullen': ['6798', '4587', '4848'],                    // Koepka, Lowry, Thomas
    'Cian Maher': ['9938', '11378', '5539'],                    // Burns, MacIntyre, Fleetwood
    'Sean Kane': ['9478', '4375972', '7081'],                   // Scheffler, Aberg, Si Woo Kim
    'Peter Gannon': ['388', '5539', '5553'],                   // Scott, Fleetwood, Hatton
    'Ruairí MacMathúna': ['4364873', '569', '9126'],           // Hovland, Rose, Conners
    'Cian Leahy': ['9780', '4587', '4404992'],                  // Rahm, Lowry, Griffin
    'Darragh Cullen': ['5539', '569', '6007'],                  // Fleetwood, Rose, Cantlay
    'David Keegan': ['4348444', '3470', '10140'],               // McKibbon, McIlroy, Schauffele
    'Kevin Kirwan': ['11378', '5553', '9938'],                  // MacIntyre, Hatton, Burns
    'Kyle Brennan': ['10140', '9780', '4251'],                  // Schauffele, Rahm, Fox
    'Seamus Boyle': ['5539', '569', '4513'],                    // Fleetwood, Rose, Bradley
    'Peter Byrne': ['5553', '5579', '5539']                      // Hatton, Reed, Fleetwood
};


const displayElement  = document.getElementById('display');

let players = null;

fetch('https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard')
  .then(response => response.json())
  .then(data => {
    players = data.events[0].competitions[0].competitors;
    processData();
  })
  .catch(error => {
    displayElement.innerText = 'Error loading data.';
    console.error(error);
  });

function processData() {
    let output = '';
    let worstScore = getWorstScore();

    let participantScores = [];

    Object.keys(PARTICIPANTS).forEach(p => {
        let totalScore = 0;

        const golfersData = PARTICIPANTS[p].map(golferId => {
            const golfer = players.find(player => player.id === golferId);

            if (golfer && golfer.status.displayValue === "CUT") {
                return {
                    name: golfer.athlete.shortName,
                    score: worstScore,
                    displayValue: formatScore(worstScore),
                    madeCut: false
                };
            } else if (golfer) {
                return {
                    name: golfer.athlete.shortName,
                    score: golfer.statistics[0].value,
                    displayValue: golfer.statistics[0].displayValue,
                    madeCut: true
                };
            }
            return null;
        })
        .filter(golfer => golfer !== null);

        golfersData.forEach(golfer => {
            totalScore += golfer.score;
        });

        participantScores.push({
            participant: p,
            totalScore: totalScore,
            golfers: golfersData
        });
    });

    participantScores.sort((a, b) => a.totalScore - b.totalScore);

    participantScores.forEach(p => {
        output += `<h4>${p.participant}</h4><ul class="list-unstyled">`;

        p.golfers.forEach(golfer => {
            if(golfer.madeCut) {
                output += `<li>${golfer.name}: ${golfer.displayValue}</li>`;
            } else {
                output += `<li>${golfer.name}: MC (${golfer.displayValue} is worst score)</li>`;
            }
        });

        output += `</ul><p>Total Score: ${formatScore(p.totalScore)}</p><hr>`;
    });

    displayElement.innerHTML = output;
};



function getWorstScore(){
    const golfersMadeCut = players.filter(golfer => golfer.status.displayValue !== "CUT");

    const worstGolfer = golfersMadeCut.reduce((worst, currentGolfer) => {
        const worstScore = worst.statistics[0].value;
        const currentScore = currentGolfer.statistics[0].value;

        return currentScore > worstScore ? currentGolfer : worst;
    });

    return worstGolfer.statistics[0].value;
}

function formatScore(score) {
    if (score < 0) {
        return `-${Math.abs(score)}`;
    }
    
    if (score > 0) {
        return `+${score}`;
    }

    return `E`;
}