// +++++++++++++++++++++++++++++++++++++++++++++
// Title: Screeps->Main
// Developer: Furi Xiang, Yuxin Ren
// Date: 2020/12
// +++++++++++++++++++++++++++++++++++++++++++++

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.export.loop = function() {

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Non-Existing creep Cleaned:', name);
        }
    }

    // Monitor Part:
    for (var name in Game.spawns) {
        console.log('Energy stored at '+name+': '+StructureSpawn[name].store.getUsedCapacity());
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    var carrier = _.filter(Game.creeps, (creep) => creep.memory.role === 'carrier');
    var miner = _.filter(Game.screeps, (creep) => creep.memory.role === 'miner');
    console.log('Harvesters: ' + harvesters.length);
    console.log('Builder: ' + builder.length);
    console.log('Upgrader: ' + upgrader.length);
    console.log('Carrier: ' + carrier.length);
    console.log('Miner: ' + miner.length);

    // Number control table goes here.
    // TODO The numbers haven't been decided.
    var num_Harvester = 2;
    var num_Builder = 2;
    var num_Upgrader = 3;
    var num_Carrier = 4;
    var num_Miner = 4;
    // End

    // Number Control goes here.
    // Simple Version:
    // Try use a switch + for loop to better the priority of spawn.
    {
        if (harvesters.length < num_Harvester) {
            var newName = 'Harvester' + (harvesters.length + 1); // TODO how to append a number to the string
            // console.log('Spawning new harvester: '+ newName);
            // TODO write spawn function inside the module in order to better decide the Type and Body part.
            // roleHarvester.spawnNew();
        }
        if (miner.length < num_Miner) {
            var newName = 'Miner' + (miner.length + 1); // TODO how to append a number to the string
            // console.log('Spawning new miner: '+ newName);
            // TODO write spawn function inside the module in order to better decide the Type and Body part.
            // roleMiner.spawnNew();
        }
        if (carrier.length < num_Hauler) {
            var newName = 'Hauler' + (carrier.length + 1); // TODO how to append a number to the string
            // console.log('Spawning new carrier: '+ newName);
            // TODO write spawn function inside the module in order to better decide the Type and Body part.
            // roleCarrier.spawnNew();
        }
        if (builder.length < num_Builder) {
            var newName = 'Builder' + (builder.length + 1); // TODO how to append a number to the string
            // console.log('Spawning new builder: '+ newName);
            // TODO write spawn function inside the module in order to better decide the Type and Body part.
            // roleBuilder.spawnNew();
        }
        if (upgrader.length < num_Upgrader) {
            var newName = 'Upgrader' + (upgrader.length + 1); // TODO how to append a number to the string
            // console.log('Spawning new upgrader: '+ newName);
            // TODO write spawn function inside the module in order to better decide the Type and Body part.
            // roleUpgrader.spawnNew();
        }
    }

    // Reserve module goes here.
    // For better calling Hauler and post transport task
    for (var name in Game.rooms) {
        // If it is mine
        if (Room[name].controller.owner === 'Williams') {
            var num_Dropped_Energy = Room[name].find(FIND_DROPPED_RESOURCES).length;
            var num_Avaliable_Energy = num_Dropped_Energy;
            if (Room[name].memory.num_Reserved_Energy !== undefined) {
                num_Avaliable_Energy = Room[name].memory.num_Reserved_Energy;
            }
        }
    }

    // TODO add a TaskBoard module.

    // Run creep:
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role === "miner") {
            roleMiner.run(creep);
        }
        if (creep.memory.role === "carrier") {
            roleCarrier.run(creep);
        }
    }
}