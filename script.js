const SWEEPSTAKES = {
    '1': {
        'James Nolan': ['5539', '9037', '569']
    },
    '2': {
        'Joe O\'Sullivan': ['5409', '5467', '9478']
    },
    '3': {
        'Sean Kane': ['9478', '4375972', '7081']
    }
};

// Get group from URL
function getGroupFromURL() {
    const path = window.location.pathname.replace('/', '');
    return path || '1';
}

const groupName = getGroupFromURL();
const PARTICIPANTS = SWEEPSTAKES[groupName];

const displayElement = document.getElementById('display');

if (!PARTICIPANTS) {
    displayElement.innerHTML = `<h3>Invalid group: ${groupName}</h3>`;
    throw new Error('Invalid group');
}

let players = null;

// Fetch leaderboard
function loadLeaderboard() {
    fetch('https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard')
        .then(res => res.json())
        .then(data => {
            players = data.events[0].competitions[0].competitors;
            processData();
        })
        .catch(err => {
            displayElement.innerText = 'Error loading data.';
            console.error(err);
        });
}

function processData() {
    let output = `
      <div class="leaderboard">
        <div class="leaderboard-header">
          <span>⛳ Group ${groupName}</span>
          <span style="color:#ff4d4d;">● LIVE</span>
        </div>
    `;

    let worstScore = getWorstScore();
    let participantScores = [];

    Object.keys(PARTICIPANTS).forEach(p => {
        let totalScore = 0;

        const golfersData = PARTICIPANTS[p].map(id => {
            const golfer = players.find(pl => pl.id === id);

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
        }).filter(g => g !== null);

        golfersData.forEach(g => totalScore += g.score);

        participantScores.push({
            participant: p,
            totalScore,
            golfers: golfersData
        });
    });

    participantScores.sort((a, b) => a.totalScore - b.totalScore);

    participantScores.forEach((p, index) => {
        const isLeader = index === 0 ? 'leader' : '';

        let scoreClass = '';
        if (p.totalScore < 0) scoreClass = 'under';
        if (p.totalScore > 0) scoreClass = 'over';

        // Main row
        output += `
          <div class="leaderboard-row ${isLeader}">
            <div class="position">${index + 1}</div>
            <div class="name">${p.participant}</div>
            <div class="score ${scoreClass}">
              ${formatScore(p.totalScore)}
            </div>
          </div>
        `;

        // Golfers row
        output += `<div class="golfer-row">`;

        p.golfers.forEach(g => {
            const mcClass = g.madeCut ? '' : 'mc';

            output += `
              <div class="golfer ${mcClass}">
                ${g.name}
                <span>${g.displayValue}</span>
              </div>
            `;
        });

        output += `</div>`;
    });

    output += `</div>`;

    displayElement.innerHTML = output;
}

function getWorstScore() {
    const madeCut = players.filter(g => g.status.displayValue !== "CUT");

    const worst = madeCut.reduce((w, c) =>
        c.statistics[0].value > w.statistics[0].value ? c : w
    );

    return worst.statistics[0].value;
}

function formatScore(score) {
    if (score < 0) return `-${Math.abs(score)}`;
    if (score > 0) return `+${score}`;
    return `E`;
}

// Initial load
loadLeaderboard();

// Auto refresh
setInterval(loadLeaderboard, 60000);