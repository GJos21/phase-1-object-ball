const gameObject = () => {
    return {
        home: {
            teamName: "Brooklyn Nets",
            colors: ["Black", "White"],
            players: {
                "Alan Anderson": {
                    number: "0",
                    shoe: 16,
                    points: 22,
                    rebounds: 12,
                    assists: 12,
                    steals: 3,
                    blocks: 1,
                    slamDunks: 1,
                },
                "Reggie Evans": {
                    number: "30",
                    shoe: 14,
                    points: 12,
                    rebounds: 12,
                    assists: 12,
                    steals: 12,
                    blocks: 12,
                    slamDunks: 7,
                },
                "Brook Lopez": {
                    number: "11",
                    shoe: 17,
                    points: 17,
                    rebounds: 19,
                    assists: 10,
                    steals: 3,
                    blocks: 1,
                    slamDunks: 15,
                },
                "Mason Plumlee": {
                    number: "1",
                    shoe: 19,
                    points: 26,
                    rebounds: 12,
                    assists: 6,
                    steals: 3,
                    blocks: 8,
                    slamDunks: 5,
                },
                "Jason Terry": {
                    number: "31",
                    shoe: 15,
                    points: 19,
                    rebounds: 2,
                    assists: 2,
                    steals: 4,
                    blocks: 11,
                    slamDunks: 1,
                },
            },
        },
        away: {
            teamName: "Charlotte Hornets",
            colors: ["Turquoise", "Purple"],
            players: {
                "Jeff Adrien": {
                    number: "4",
                    shoe: 18,
                    points: 10,
                    rebounds: 1,
                    assists: 1,
                    steals: 2,
                    blocks: 7,
                    slamDunks: 2,
                },
                "Bismak Biyombo": {
                    number: "0",
                    shoe: 16,
                    points: 12,
                    rebounds: 4,
                    assists: 7,
                    steals: 7,
                    blocks: 15,
                    slamDunks: 10,
                },
                "DeSagna Diop": {
                    number: "2",
                    shoe: 14,
                    points: 24,
                    rebounds: 12,
                    assists: 12,
                    steals: 4,
                    blocks: 5,
                    slamDunks: 5,
                },
                "Ben Gordon": {
                    number: "8",
                    shoe: 15,
                    points: 33,
                    rebounds: 3,
                    assists: 2,
                    steals: 1,
                    blocks: 1,
                    slamDunks: 0,
                },
                "Brendan Haywood": {
                    number: "33",
                    shoe: 15,
                    points: 6,
                    rebounds: 12,
                    assists: 12,
                    steals: 22,
                    blocks: 5,
                    slamDunks: 12,
                },
            },

        },
    }
};

function pickPlayer(game) {
    // returns a random player name
    const players = getPlayerNames(game);
    return players[Math.floor((Math.random() * players.length))]
}

function getPlayerNames(game) {
    // returns an array of all player names
    const playerNames = [];

    for (const team in game) {
        const playerObj = game[team].players;
        for (const onePlayer in playerObj) {
            playerNames.push(onePlayer);
        }
    }

    return playerNames;
}

function getPlayerStat(game, playerName, playerStat) {
    for (const team in game) {
        const playerObj = game[team].players;
        for (const onePlayer in playerObj) {
            if (onePlayer === playerName) {
                return playerObj[onePlayer][playerStat];
            }
        }
    }
}

function numPointsScored(game, playerName) {
    // return the number of points scored for a player
    return ((getPlayerStat(game, playerName, "points")));
}

function shoeSize(game, playerName) {
    // return the show size for a player
    return ((getPlayerStat(game, playerName, "shoe")));

}

function getTeamFact(game, teamName, fact) {
    // return array of team colors
    for (const team in game) {
        if (game[team].teamName === teamName) {
            return game[team][fact];
        }
    }
}

function teamColors(game, teamName) {
    // return array of team colors
    return getTeamFact(game, teamName, "colors");
}

function teamNames(game) {
    // return array of the teamNames
    const names = [];
    for (const team in game) {
        names.push(game[team].teamName);
    }

    return names;
}

function playerNumbers(game, teamName) {
    // return an array of the player's numbers for a team
    const nums = [];
    for (const team in game) {
        const playerObj = game[team].players;
        if (game[team].teamName === teamName) {
            for (const onePlayer in playerObj) {
                nums.push(playerObj[onePlayer]["number"]);
            }
        }
    }

    return nums;
}

function playerStats(game, playerName) {
    // returns an object of a player's stats
    for (const team in game) {
        const playerObj = game[team].players;
        for (const onePlayer in playerObj) {
            if (onePlayer === playerName) {
                return playerObj[onePlayer];
            }
        }
    }
}

function bigShoeRebounds(game) {
    // return the number of rebounds associated with the players that has the largest shoe size
    let rebounds = 0;
    let biggestShoe = 0;

    for (const team in game) {
        const playerObj = game[team].players;
        for (const onePlayer in playerObj) {
            if (playerObj[onePlayer].shoe > biggestShoe) {
                rebounds = playerObj[onePlayer].rebounds;
                biggestShoe = playerObj[onePlayer].shoe;
            }
        }
    }

    return rebounds;
}


function whichPlayer(callback, game) {
    // jumped through some hoops (no pun intended) on this  
    //  to demonstrate a callback
    let candidateName;

    for (const team in game) {
        const playerObj = game[team].players;
        for (const onePlayer in playerObj) {
            if (callback(onePlayer, playerObj[onePlayer])) {
                candidateName = onePlayer;
            }
        }
    }

    return candidateName;
}

function mostPointsScored() {
    // return player name who has scored the most points
    const testPoints = (function () {
        let points = 0;
        return function (playerName, playerObj) {
            if (playerObj.points > points) {
                points = playerObj.points;
                return true;
            } else {
                return false;
            }
        }
    })();
    return whichPlayer(testPoints, gameObject());
}

function playerWithLongestName() {
    // return player name which is the longest
    const testNameLength = (function () {
        let length = 0;
        return function (playerName, playerObj) {
            if (playerName.length > length) {
                length = playerName.length;
                return true;
            } else {
                return false;
            }
        }
    })();
    return whichPlayer(testNameLength, gameObject());
}

function mostRebounds() {
    // return player name who has the most rebounds
    const testRebounds = (function () {
        let rebounds = 0;
        return function (playerName, playerObj) {
            if (playerObj.rebounds > rebounds) {
                rebounds = playerObj.rebounds;
                return true;
            } else {
                return false;
            }
        }
    })();
    return whichPlayer(testRebounds, gameObject());
}

function winningTeam(game) {
    // return team name that has scored the most points
    let winningPoints = 0;
    let winningTeamName;

    for (const team in game) {
        const playerObj = game[team].players;
        let teamPoints = 0;
        for (const playerName in playerObj) {
            teamPoints += playerObj[playerName].points;
        }
        if (teamPoints > winningPoints) {

            winningPoints = teamPoints;
            winningTeamName = game[team].teamName;
        }
    }

    return winningTeamName;
}
const doesLongNameStealATon = () => playerWithLongestName() === mostRebounds();

const playerName = pickPlayer(gameObject());
console.log(`${[playerName]} scored ${numPointsScored(gameObject(), playerName)} points!`);
console.log(`His shoe size is ${shoeSize(gameObject(), playerName)}.`);

const oneTeamName = "Brooklyn Nets";
const colors = teamColors(gameObject(), oneTeamName).join(' & ');
console.log(`Team colors of the ${oneTeamName} are ${colors}`);

const allTeamNames = teamNames(gameObject()).join(', ');
console.log(`Teams are ${allTeamNames}`);

console.log(`Winning team is ${winningTeam(gameObject())}`)

console.log(`Team numbers for ${oneTeamName} are ${playerNumbers(gameObject(), oneTeamName).join(', ')}`);

console.log(`${mostPointsScored()} scored the most points.`);

console.log(`${bigShoeRebounds(gameObject())} rebounds for player with largest shoe size.`);

console.log(`${playerWithLongestName()} has the longest name.`);

console.log(`${mostRebounds()} has the most rebounds.`);

console.log(`Longest name steals a ton? ${doesLongNameStealATon()}`);

// refactored to use arrays based on video at end of lab
// this imposes a limitataion that the gameObject only has 2 main keys - home and away
function homeTeam() {
    return gameObject().home;
}

function awayTeam() {
    return gameObject().away;
}

function playersObj() {
    return Object.assign(homeTeam().players, awayTeam().players);
}

function numPointsScoredNew(playerName) {
    const players = Object.entries(playersObj());
    let points;

    playerArray = players.find((player) => player[0] === playerName)
    points = playerArray[1].points;

    return points;
}

console.log(`${[playerName]} scored ${numPointsScoredNew(playerName)} points!`);
