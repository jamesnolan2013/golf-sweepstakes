const PARTICIPANTS = {
    'James Nolan': ['9025', '4375972', '4848'],
    'Joe O\'Sullivan': ['8973', '3470', '9478'],
    'Cillian Kelly-Murtagh': ['569', '4587', '3470'],
    'Ben Mullin': ['569', '4587', '10046'],
    'Evan Cullen': ['3470', '10046', '4602218'],
    'Cian Maher': ['10140', '4375972', '3448'],
    'Sean Kane': ['9478', '4375972', '1225'],
    'Adam Ryan': ['4587', '8961', '11099'],
    'Peter Gannon': ['4375972', '11099', '4895429'],
    'Ruairí MacMathúna': ['4587', '9126', '11099']
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