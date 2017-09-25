import React from 'react';
import createView from 'omniscient';

function addBlankCardsToHand(hand) {
    const fullHand = hand.slice(0);

    for (let i = 0; i < 2; i++) {
        if (hand[i]) continue;

        fullHand[i] = 'blank';
    }

    return fullHand;
}

function getCard(card, index) {
    return <div key={`${card}-${index}`} className={`Card Card--${card}`} />;
}

function getHandValueName(handValue) {
    switch (handValue) {
        case 'NO_PAIR':
            return 'High card';
        case 'PAIR':
            return 'Pair';
        case 'TWO_PAIR':
            return 'Two pair';
        case 'THREE_OF_A_KIND':
            return 'Three of a kind';
        case 'STRAIGHT':
            return 'Straight';
        case 'FLUSH':
            return 'Flush';
        case 'FULL_HOUSE':
            return 'Full house';
        case 'FOUR_OF_A_KIND':
            return 'Four of a kind';
        case 'STRAIGHT_FLUSH':
            return 'Straight flush';
        default:
            return handValue;
    }
}

function getPlayerRenderer(winningOdds) {
    return function renderPlayer(player, index) {

        const { chips, odds, bet, hand, id, move, failedInput } = player;
        const defaultHref = encodeURIComponent(
            'https://storage.googleapis.com/riddles-images/riddles-avatar-solo-113.png');
        const playerClass = `player--player${id}`;
        const playerOdds = odds !== undefined ? `${odds}%` : '-';
        const playerBet = bet ? bet : '-';
        const playerMove = move !== undefined ? move.replace('_', ' ') : '';
        const handValue = hand.value ? hand.value : '';

        let handValueWinnerClass = '';
        let playerScript = playerMove;

        if (handValue !== '') {
            handValueWinnerClass = odds === winningOdds ? 'hand-winner' : 'hand-loser';
            playerScript = handValue;
        }

        if (failedInput) {
            handValueWinnerClass = 'hand-loser';
            playerScript = 'Disqualified: Invalid input';
        }

        return <div
            key={ `Player-${index}` }
            className={ `player-wrapper ${playerClass}` }>
            <div className="player-name">{ player.alias }</div>
            <div className="player-content">
                <img
                    className="player-avatar"
                    src={ `https://www.gravatar.com/avatar/${player.emailHash}?d=${defaultHref}&s=105` }
                    alt="avatar"/>
                <div className="player-hand">
                    <div className="player-cards">
                        { addBlankCardsToHand(hand.cards).map(getCard) }
                    </div>
                    <div className={ `player-script ${handValueWinnerClass}` }>
                        { getHandValueName(playerScript) }
                    </div>
                </div>
                <div className="player-info">
                    <span className="player-chips">{ chips }</span>
                    <span className="player-odds">{ playerOdds }</span>
                    <span className="player-bet">{ playerBet }</span>
                </div>
            </div>
        </div>;
    };
}

const PlayerView = createView('PlayerView', function (data) {

    const { state, settings } = data;
    const composedPlayers = state.players.map(player => ({
        ...player,
        ...settings.players[player.id],
    }));

    let winningOdds = -1;
    composedPlayers.forEach(player => {
        if (player.odds && player.odds > winningOdds) {
            winningOdds = player.odds;
        }
    });

    return <div className='PlayerView'>
        { composedPlayers.map(getPlayerRenderer(winningOdds)) }
    </div>;
});

export default PlayerView;
