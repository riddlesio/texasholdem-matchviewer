import React from 'react';
import createView from 'omniscient';
import RandomSeed from 'random-seed';

function getChipRenderer(random) {
    return function renderChip(image, index) {

        let top = (4 - index) * 5;

        // makes the stack a bit nicer
        if (top === 20) {
            top -= 2;
        } else if (top === 15) {
            top -= 1;
        }

        const randomShift = random.intBetween(-1, 1);
        const style = {
            top: `${top}px`,
            left: `${randomShift}px`,
        };

        return <img
            key={ `chip-${index}` }
            className="chip"
            src={ `../img/${image}` }
            style={ style }
        />;
    };
}

function getColumnRenderer(random) {
    return function renderColumn(chipColumn, index) {

        const { chipType, amount } = chipColumn;

        if (amount <= 0) return null;

        const images = [];
        for (let i = 0; i < amount; i++) {
            images[i] = chipType.image;
        }

        return <div key={`column-${index}`} className="chip-stack">
            { images.map(getChipRenderer(random)) }
        </div>;
    };
}

function renderStack(chips, chipTypes, random) {

    let remainder = chips;
    const chipColumnArray = chipTypes.map(chipType => {
        const amount = Math.floor(remainder / chipType.value);

        remainder -= amount * chipType.value;

        return { chipType, amount };
    });

    return <div className="Chips-stack">
        { chipColumnArray.map(getColumnRenderer(random)) }
    </div>;
}

function renderChips(chips, sideChips, chipTypes, round) {
    const allChips = sideChips ? chips + sideChips : chips;
    const chipsString = sideChips ? `${chips} + ${sideChips}` : `${chips}`;

    if (allChips <= 0) {
        return <div />;
    }

    const random = RandomSeed.create(allChips + '-' + round);

    return <div>
        <div className="Chips-count">{ chipsString }</div>
        { renderStack(allChips, chipTypes, random) }
    </div>;
}

function getPlayerChipsRenderer(chipTypes, round) {
    return function renderPlayerChips(player) {

        const { bet, id } = player;
        const playerClass = `player--player${id}`;

        return <div key={ `player-${id}` } className={ `Chips-player ${playerClass}` }>
            { renderChips(bet, 0, chipTypes, round) }
        </div>;
    };
}

const Chips = createView('Chips', function (data) {

    const { state, settings } = data;
    const { pot, players, round } = state;
    const chips = pot[0].chips;
    const sideChips = pot.length > 1 ? pot[1].chips : 0;

    return <div className="Chips">
        <div className="Chips-table">
            { renderChips(chips, sideChips, settings.chips, round) }
        </div>
        { players.map(getPlayerChipsRenderer(settings.chips, round)) }
    </div>;
});

export default Chips;
