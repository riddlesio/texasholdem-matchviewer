import _ from 'lodash';

/**
 * Parses the passed data object into settings which are usable by the viewer
 * @param   {Object} data       The JSON data received from the server
 * @param   {Object} playerData The data about the participating players from the server
 * @param   {Object} [defaults] The default settings as passed from the gameViewer
 * @returns {Object}            The settings object
 */
function parseSettings(data, playerData, defaults = {}) {

    return {
        ...defaults,
        ...data.settings,
        players: parsePlayerNames(playerData),
    };
}

function parsePlayerNames(playerData) {

    return playerData.map((player) => ({
        alias: player.name || '',
        emailHash: player.emailHash || '',
    }));
}

/**
 * Parses the passed data and settings into states which can be rendered by the viewer
 * @param   {Object} data     The JSON data received from the server
 * @param   {Object} settings The parsed settings
 * @returns {Array}           List of states
 */
function parseStates(data, settings) {

    const { states, winner } = data;
    const finalState = states[states.length - 1];

    finalState.winner = { id: winner, ...settings.players[winner] };

    return states;
}

export {
    parseSettings,
    parseStates,
};
