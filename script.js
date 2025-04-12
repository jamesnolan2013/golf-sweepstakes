const PARTICIPANTS = {
    'James Nolan': ['569', '9478', '11099'],
    'Joe O\'Sullivan': ['9478', '10592', '9780'],
    'Cillian Kelly-Murtagh': ['9780', '3470', '388'],
    'Ben Mullin': ['10980', '5539', '10046'],
    'Evan Cullen': ['10592', '11119', '5409'],
    'Cian Maher': ['4375972', '4587', '4602673']
};

const displayElement  = document.getElementById('display');

let players = null;

fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    players = data.data.events[0].competitions[0].competitors;
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