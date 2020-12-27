// +++++++++++++++++++++++++++++++++++++++++++++
// Title: Screeps->Role->Harvester
// Developer: Furi Xiang
// Date: 2020/12
// +++++++++++++++++++++++++++++++++++++++++++++

var roleCarrier = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() === 0) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
                
            });
            if(targets.length > 0) {
                // TODO find the nearest. (careful about the terrain)
                // TODO check will there still be free capacity when creep arrive.
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // What if length<0, set an alert.
        }
        else {
            // Check if the resource is reserved.
            var sources = creep.room.find(FIND_DROPPED_RESOURCES);
            if (creep.pickup(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}

module.exports = roleCarrier;