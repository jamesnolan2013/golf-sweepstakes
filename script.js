const SWEEPSTAKES = {
    '1': {
        'James Nolan': ['5539', '9037', '569'],
        'Joe O\'Sullivan': ['5409', '5467', '9478'],
        'Sean Kane': ['9478', '4375972', '7081']
    },
    '2': {
        'Joe O\'Sullivan': ['5409', '5467', '9478']
    },
    '3': {
        'Sean Kane': ['9478', '4375972', '7081']
    }
};

const redirect = sessionStorage.redirect;
if (redirect) {
  history.replaceState(null, null, redirect);
  sessionStorage.removeItem("redirect");
}

function getGroupFromURL() {
    const base = "/golf-sweepstakes";

    let path = window.location.pathname;

    if (path.startsWith(base)) {
        path = path.slice(base.length);
    }

    const parts = path.split('/').filter(Boolean);
    return parts[0] || '1';
}

const groupName = getGroupFromURL();
const PARTICIPANTS = SWEEPSTAKES[groupName];
const displayElement = document.getElementById('display');

if (!PARTICIPANTS) {
    displayElement.innerHTML = `<div class="error-msg">Invalid group: ${groupName}</div>`;
    throw new Error('Invalid group');
}

let players = null;

function loadLeaderboard() {
    fetch('https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard')
        .then(res => res.json())
        .then(data => {
            players = data.events[0].competitions[0].competitors;
            processData();
        })
        .catch(err => {
            displayElement.innerHTML = `<div class="leaderboard-card"><div class="error-msg">Could not load leaderboard data.</div></div>`;
            console.error(err);
        });
}

function getGolferStatus(golfer) {
    const state = golfer.status.type.state;
    const displayThru = golfer.status.displayThru;
    const teeTime = golfer.status.teeTime;

    if (golfer.status.displayValue === 'CUT') return { label: 'CUT', type: 'cut' };
    if (state === 'post') return { label: 'F', type: 'finished' };
    if (state === 'in') return { label: `Thru ${displayThru}`, type: 'active' };

    if (teeTime) {
        const t = new Date(teeTime);
        const label = t.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' });
        return { label, type: 'pre' };
    }
    return { label: '—', type: 'pre' };
}

function getRoundScores(golfer) {
    if (!golfer.linescores) return [];
    return golfer.linescores
        .slice()
        .sort((a, b) => a.period - b.period)
        .map(r => r.displayValue);
}

function scoreColorClass(displayValue) {
    if (!displayValue || displayValue === 'E') return 'even';
    if (displayValue.startsWith('-')) return 'under';
    if (displayValue.startsWith('+')) return 'over';
    return 'even';
}

// Worst score of any golfer in the entire field (not just those who made the cut)
function getWorstScore() {
    return players.reduce((worst, g) => {
        const val = g.statistics[0].value;
        return val > worst ? val : worst;
    }, -Infinity);
}

function processData() {
    const worstScore = getWorstScore();

    // Determine if tournament is fully over across ALL groups
    const allGroupGolfers = Object.values(SWEEPSTAKES)
        .flatMap(group => Object.values(group).flat())
        .map(id => players.find(pl => pl.id === id))
        .filter(Boolean);

    const isFinal = allGroupGolfers.every(g => {
        const isCut = g.status.displayValue === 'CUT';
        const isFinishedR4 = g.status.type.state === 'post' && g.status.period === 4;
        return isCut || isFinishedR4;
    });

    let participantScores = [];

    Object.keys(PARTICIPANTS).forEach(p => {
        let totalScore = 0;

        const golfersData = PARTICIPANTS[p].map(id => {
            const golfer = players.find(pl => pl.id === id);
            if (!golfer) return null;

            const isCut = golfer.status.displayValue === 'CUT';
            const overallScore = isCut ? worstScore : golfer.statistics[0].value;
            const overallDisplay = isCut ? formatScore(worstScore) : golfer.statistics[0].displayValue;

            return {
                name: golfer.athlete.shortName,
                score: overallScore,
                displayValue: overallDisplay,
                madeCut: !isCut,
                roundScores: isCut ? [] : getRoundScores(golfer),
                status: getGolferStatus(golfer)
            };
        }).filter(Boolean);

        golfersData.forEach(g => totalScore += g.score);
        participantScores.push({ participant: p, totalScore, golfers: golfersData });
    });

    participantScores.sort((a, b) => a.totalScore - b.totalScore);

    let html = `
      <div class="leaderboard-card">
        <div class="card-header">
          <img class="masters-header" src="masters-header.png" alt="The Masters" />
        </div>
        <div class="col-headers">
          <span></span>
          <span>Player</span>
          <span class="col-score">Score</span>
        </div>
    `;

    participantScores.forEach((p, index) => {
        const isLeader = index === 0 ? 'leader' : '';
        const scoreClass = p.totalScore < 0 ? 'under' : p.totalScore > 0 ? 'over' : 'even';
        const winnerBadge = (isFinal && index === 0)
            ? `<span class="winner-badge">🏆 Winner</span>`
            : '';

        html += `
          <div class="participant-block ${isLeader}">
            <div class="participant-row">
              <span class="pos">${index + 1}</span>
              <span class="p-name">${p.participant}${winnerBadge}</span>
              <span class="p-score ${scoreClass}">${formatScore(p.totalScore)}</span>
            </div>
            <div class="golfer-row">
        `;

        p.golfers.forEach(g => {
            const mcClass = g.madeCut ? '' : 'mc';
            const pillScoreClass = scoreColorClass(g.displayValue);

            let cutMessage = '';

            let statusHtml = '';
            if (g.status.type === 'cut') {
                statusHtml = `<span class="pill-status cut-label">CUT</span>`;
                cutMessage = 'Worst weekend score: '
            } else if (g.status.type === 'finished') {
                statusHtml = `<span class="pill-status finished-label">F</span>`;
            } else if (g.status.type === 'active') {
                statusHtml = `<span class="pill-status active-label">${g.status.label}</span>`;
            } else {
                statusHtml = `<span class="pill-status pre-label">${g.status.label}</span>`;
            }

            const roundsHtml = g.roundScores.length > 0
                ? `<div class="pill-rounds">${
                    g.roundScores.map((r, i) =>
                        `<span class="round-item"><span class="round-label">R${i + 1}</span><span class="round-score ${scoreColorClass(r)}">${r}</span></span>`
                    ).join('')
                  }</div>`
                : '';

            html += `
              <div class="golfer-pill ${mcClass}">
                <div class="pill-top">
                  <span class="pill-name">${g.name}</span>
                  <span class="pill-right">
                    <span class="pill-cut-message">${cutMessage}</span>
                    <span class="pill-score ${pillScoreClass}">${g.displayValue}</span>
                    ${statusHtml}
                  </span>
                </div>
                ${roundsHtml}
              </div>
            `;
        });

        html += `</div></div>`;
    });

    html += `</div>`;
    displayElement.innerHTML = html;
}

function formatScore(score) {
    if (score < 0) return `-${Math.abs(score)}`;
    if (score > 0) return `+${score}`;
    return 'E';
}

loadLeaderboard();
