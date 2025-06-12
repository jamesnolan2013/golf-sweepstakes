const PARTICIPANTS = {
    'James Nolan': ['9478', '10046', '11253'],
    'Joe O\'Sullivan': ['9478', '9938', '5076021'],
    'Cillian Kelly-Murtagh': ['9478', '8961', '388'],
    'Ben Mullin': ['9478', '11253', '8961'],
    'Evan Cullen': ['4513', '7081', '8961'],
    'Cian Maher': ['5539', '5860', '2230'],
    'Sean Kane': ['9126', '9131', '9478'],
    'Peter Gannon': ['9478', '10046', '4602673'],
    'Ruairí MacMathúna': ['9126', '5467', '10140']
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