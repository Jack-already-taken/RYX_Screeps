// +++++++++++++++++++++++++++++++++++++++++++++
// Title: Screeps->Role->Harvester
// Developer: Furi Xiang
// Date: 2020/12
// +++++++++++++++++++++++++++++++++++++++++++++

var roleMiner = {
	run: function(creep) {

		// this requires us to store the location of a source in the memory of the creep
		// FIXME Why?
		var source = creep.room.find(FIND_SOURCES);
		// TODO we'd better write a Reserve model so that we can reserve the nearest source for the first miner, and
		//  then the second miner will go the the second nearest source.
		if (creep.harvest(source[0]) === ERR_NOT_IN_RANGE) {
			creep.moveTo(source[0], {visualizePathStyle: {stroke: '#ffaa00'}});
		}
	}
};

module.exports = roleMiner;