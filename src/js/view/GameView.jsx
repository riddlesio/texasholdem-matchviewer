import React            from 'react';
import component        from 'omniscient';
import PlayerView       from './PlayerView.jsx';
import Chips            from './Chips.jsx';
import MaybeEndOverlay  from './MaybeEndOverlay';

const GameView = component('GameView', function ({ state, settings, isLastState }) {

    const { winner, round, table } = state;

    return (
        <div className={ 'TexasHoldEm-wrapper' }>
            <div className="TexasHoldEm">
                <div className="TexasHoldEm-ui-wrapper">
                    <span className="TexasHoldEm-round">Round { round }</span>
                    <span className="TexasHoldEm-ui-text TexasHoldEm-chips">Chips</span>
                    <span className="TexasHoldEm-ui-text TexasHoldEm-odds">Odds</span>
                    <span className="TexasHoldEm-ui-text TexasHoldEm-bet">Bet</span>
                </div>
                <PlayerView state={ state } settings={ settings } />
                <div className="TexasHoldEm-table">
                    <div className="TexasHoldEm-table-stack">
                        <Chips state={ state } settings={ settings } />
                    </div>
                    <div className="TexasHoldEm-table-cards">
                        { addBlankCardsToTable(table).map(getCard) }
                    </div>
                </div>
            </div>
            <MaybeEndOverlay winner={ winner } />
        </div>
    );
});

function addBlankCardsToTable(table) {
    const fullTable = table.slice(0);

    for (let i = 0; i < 5; i++) {
        if (table[i]) continue;

        fullTable[i] = 'blank';
    }

    return fullTable;
}

function getCard(card, index) {
    return <div key={`${card}-${index}`} className={`Card Card--${card}`} />;
}

export default GameView;
