import React from 'react';
import createMaybe from './createMaybe';

class EndOverlay extends React.Component {

    render() {
        const winner = this.props.winner || { id: 'none', emailHash: '' };
        const draw = winner.id === 'none';
        const message = draw ? 'It\'s a draw' : `${winner.alias} won!`;

        return <div className="TexasHoldEm-overlay">
            <div className={ `TexasHoldEm-overlay-foreground winner--${winner.id}` }>
                { message }
            </div>
        </div>;
    }
}

function predicate({ winner }) {
    return winner !== undefined;
}

export default createMaybe({ Component: EndOverlay, predicate });
