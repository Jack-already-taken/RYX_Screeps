// +++++++++++++++++++++++++++++++++++++++++++++
// Title: Screeps->Role->Harvester
// Developer: Furi Xiang
// Date: 2020/12
// +++++++++++++++++++++++++++++++++++++++++++++


var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    // TODO find the nearest. (careful about the terrain)
                    // TODO check will there still be free capacity when creep arrive.
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }

            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;