const Golfers = {
    HAOTONG_LI: "9221",
    JOHNNY_KEEFER: "5217048",
    CARLOS_ORTIZ: "5532",
    MAX_HOMA: "8973",
    NAOYUKI_KATAOKA: "4837226",
    JOSE_MARIA_OLAZABAL: "329",
    RASMUS_NEERGAARD_PETERSEN: "4858859",
    ALDRICH_POTGIETER: "5080439",
    ANGEL_CABRERA: "65",
    SAMI_VALIMAKI: "4585548",
    JACKSON_HERRINGTON: "5344766",
    CHARL_SCHWARTZEL: "1097",
    RYAN_FOX: "4251",
    MAX_GREYSERMAN: "11101",
    VIJAY_SINGH: "392",
    RASMUS_HOJGAARD: "11253",
    MATT_MCCARTY: "4901368",
    KURT_KITAYAMA: "10364",
    KRISTOFFER_REITAN: "4348470",
    CASEY_JARVIS: "4610056",
    BUBBA_WATSON: "780",
    BRANDON_HOLTZ: "2201886",
    NICO_ECHAVARRIA: "4408316",
    CAMERON_SMITH: "9131",
    JAKE_KNAPP: "9843",
    HIDEKI_MATSUYAMA: "5860",
    SI_WOO_KIM: "7081",
    SUNGJAE_IM: "11382",
    TYRRELL_HATTON: "5553",
    JJ_SPAUN: "10166",
    XANDER_SCHAUFFELE: "10140",
    SCOTTIE_SCHEFFLER: "9478",
    LUDVIG_ABERG: "4375972",
    DANIEL_BERGER: "9025",
    JON_RAHM: "9780",
    TOMMY_FLEETWOOD: "5539",
    SAM_BURNS: "9938",
    JUSTIN_ROSE: "569",
    GARY_WOODLAND: "3550",
    CHRIS_GOTTERUP: "4690755",
    ALEX_NOREN: "3832",
    VIKTOR_HOVLAND: "4364873",
    RORY_MCILROY: "3470",
    TOM_MCKIBBIN: "4348444",
    CAM_YOUNG: "4425906",
    ADAM_SCOTT: "388",
    RASMUS_HOJGAARD: "11253",
    JORDAN_SPIETH: "5467",
    MAX_HOMA: "8973",
    MIN_WOO_LEE: "4410932",
    JASON_DAY: "1680",
    BROOKS_KOEPKA: "6798",
    RUSSELL_HENLEY: "5409",
    COREY_CONNORS: "9126",
    SHANE_LOWRY: "4587",
    MATT_FITZPATRICK: "9037",
    AKSHAY_BHATIA: "4419142",
    PATRICK_REED: "5579",
    JUSTIN_THOMAS: "4848",
    KEEGAN_BRADLEY: "4513",
    NICOLAI_HOJGAARD: "11250",
    BRYSON_DECHAMBEAU: "10046",
    ROBERT_MACINTYRE: "11378",
    SEPP_STRAKA: "8961",
    COLLIN_MORIKAWA: "10592"
}

const SWEEPSTAKES = {
    '1': {
        'James': [Golfers.SCOTTIE_SCHEFFLER, Golfers.JJ_SPAUN, Golfers.TYRRELL_HATTON],
        'Sophie': [Golfers.RORY_MCILROY, Golfers.SHANE_LOWRY, Golfers.TOM_MCKIBBIN],
        'Sean': [Golfers.CAM_YOUNG, Golfers.CHRIS_GOTTERUP, Golfers.JJ_SPAUN],
        'David K': [Golfers.LUDVIG_ABERG, Golfers.ADAM_SCOTT, Golfers.SHANE_LOWRY],
        'Trish': [Golfers.GARY_WOODLAND, Golfers.JON_RAHM, Golfers.JJ_SPAUN],
        'Jack': [Golfers.CAM_YOUNG, Golfers.XANDER_SCHAUFFELE, Golfers.RASMUS_HOJGAARD],
        'Jan': [Golfers.JUSTIN_ROSE, Golfers.JON_RAHM, Golfers.MAX_HOMA],
        'John': [Golfers.JORDAN_SPIETH, Golfers.ADAM_SCOTT, Golfers.MIN_WOO_LEE],
        'Gail': [Golfers.VIKTOR_HOVLAND, Golfers.SI_WOO_KIM, Golfers.ADAM_SCOTT],
        'Scats': [Golfers.MAX_HOMA, Golfers.LUDVIG_ABERG, Golfers.MATT_FITZPATRICK],
        'Dave F': [Golfers.GARY_WOODLAND, Golfers.LUDVIG_ABERG, Golfers.JUSTIN_ROSE],
        'Mark': [Golfers.TOMMY_FLEETWOOD, Golfers.SHANE_LOWRY, Golfers.JASON_DAY],
        'Sadie': [Golfers.SHANE_LOWRY, Golfers.BROOKS_KOEPKA, Golfers.RUSSELL_HENLEY],
        'Thomas': [Golfers.JUSTIN_ROSE, Golfers.COREY_CONNORS, Golfers.MATT_FITZPATRICK]    
    },
    '2': {
        'Joe': [Golfers.SCOTTIE_SCHEFFLER, Golfers.JJ_SPAUN, Golfers.AKSHAY_BHATIA],
        'James': [Golfers.LUDVIG_ABERG, Golfers.PATRICK_REED, Golfers.DANIEL_BERGER],
        'Cian': [Golfers.JUSTIN_ROSE, Golfers.PATRICK_REED, Golfers.TYRRELL_HATTON],
        'Chez': [Golfers.XANDER_SCHAUFFELE, Golfers.SHANE_LOWRY, Golfers.JASON_DAY],
        'Ruairí': [Golfers.SHANE_LOWRY, Golfers.JUSTIN_THOMAS, Golfers.TOMMY_FLEETWOOD],
        'Ben': [Golfers.JON_RAHM, Golfers.JUSTIN_ROSE, Golfers.MAX_HOMA],
        'Cillian': [Golfers.SCOTTIE_SCHEFFLER, Golfers.JON_RAHM, Golfers.KEEGAN_BRADLEY],
        'Peter': [Golfers.CAM_YOUNG, Golfers.CHRIS_GOTTERUP, Golfers.NICOLAI_HOJGAARD]
    },
    '3': {
        'Sean Kane': [Golfers.HIDEKI_MATSUYAMA, Golfers.SI_WOO_KIM, Golfers.SUNGJAE_IM],
        'Conor Cullen': [Golfers.TYRRELL_HATTON, Golfers.JJ_SPAUN, Golfers.XANDER_SCHAUFFELE],
        'Seamus Boyle': [Golfers.SCOTTIE_SCHEFFLER, Golfers.VIKTOR_HOVLAND, Golfers.SUNGJAE_IM],
        'David Keegan': [Golfers.XANDER_SCHAUFFELE, Golfers.LUDVIG_ABERG, Golfers.DANIEL_BERGER],
        'Darragh Cullen': [Golfers.TYRRELL_HATTON, Golfers.JJ_SPAUN, Golfers.JON_RAHM],
        'Peter Byrne': [Golfers.LUDVIG_ABERG, Golfers.TOMMY_FLEETWOOD, Golfers.SAM_BURNS],
        'Kevin Kirwan': [Golfers.SCOTTIE_SCHEFFLER, Golfers.JUSTIN_ROSE, Golfers.GARY_WOODLAND],
        'Kyle Brennan': [Golfers.XANDER_SCHAUFFELE, Golfers.CHRIS_GOTTERUP, Golfers.SUNGJAE_IM],
        'Cian Leahy': [Golfers.SCOTTIE_SCHEFFLER, Golfers.JUSTIN_ROSE, Golfers.ALEX_NOREN]
    },
    '4': {
        'Darragh': [Golfers.SHANE_LOWRY, Golfers.BRYSON_DECHAMBEAU, Golfers.TOMMY_FLEETWOOD],
        'Kev B': [Golfers.MIN_WOO_LEE, Golfers.MATT_FITZPATRICK, Golfers.TOMMY_FLEETWOOD],
        'Jimmy': [Golfers.SCOTTIE_SCHEFFLER, Golfers.CHRIS_GOTTERUP, Golfers.JUSTIN_THOMAS],
        'Micky': [Golfers.LUDVIG_ABERG, Golfers.ROBERT_MACINTYRE, Golfers.VIKTOR_HOVLAND],
        'Chris': [Golfers.PATRICK_REED, Golfers.HIDEKI_MATSUYAMA, Golfers.XANDER_SCHAUFFELE],
        'Kev O\'D': [Golfers.MATT_FITZPATRICK, Golfers.JUSTIN_ROSE, Golfers.BROOKS_KOEPKA],
        'Michael McS': [Golfers.JUSTIN_ROSE, Golfers.LUDVIG_ABERG, Golfers.SI_WOO_KIM],
        'Thomas': [Golfers.JUSTIN_THOMAS, Golfers.JUSTIN_ROSE, Golfers.BRYSON_DECHAMBEAU],
        'Alex': [Golfers.JUSTIN_ROSE, Golfers.CHRIS_GOTTERUP, Golfers.MATT_FITZPATRICK],
        'Ollie': [Golfers.BRYSON_DECHAMBEAU, Golfers.CAM_YOUNG, Golfers.AKSHAY_BHATIA],
        'Oisin': [Golfers.PATRICK_REED, Golfers.JUSTIN_ROSE, Golfers.MATT_FITZPATRICK],
        'Jack': [Golfers.JON_RAHM, Golfers.MATT_FITZPATRICK, Golfers.SEPP_STRAKA],
        'Duggan': [Golfers.JON_RAHM, Golfers.PATRICK_REED, Golfers.VIKTOR_HOVLAND],
        'Paddy': [Golfers.JUSTIN_ROSE, Golfers.SCOTTIE_SCHEFFLER, Golfers.SHANE_LOWRY],
        'Skelly': [Golfers.BRYSON_DECHAMBEAU, Golfers.COLLIN_MORIKAWA, Golfers.AKSHAY_BHATIA]
    }
};

function getGroupFromURL() {
    // Support both ?group=1 (GitHub Pages) and /1 (local server)
    const params = new URLSearchParams(window.location.search);
    if (params.has('group')) return params.get('group');
    const path = window.location.pathname.replace('/', '');
    return path || '1';
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
        .filter(r => r.displayValue !== undefined && r.displayValue !== null && r.displayValue !== '')
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

        [...p.golfers].sort((a, b) => {
            const parse = v => v === 'E' ? 0 : parseInt(v, 10);
            return parse(a.displayValue) - parse(b.displayValue);
        }).forEach(g => {
            const mcClass = g.madeCut ? '' : 'mc';
            const pillScoreClass = scoreColorClass(g.displayValue);
        
            let statusHtml = '';
            if (g.status.type === 'cut') {
                statusHtml = `<span class="pill-status cut-label">CUT</span>`;
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