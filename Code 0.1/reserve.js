// +++++++++++++++++++++++++++++++++++++++++++++
// Title: Screeps->Reserve
// Developer: Yuxin Ren
// Date: 2020/12
// +++++++++++++++++++++++++++++++++++++++++++++

var reserve = {
    available_Dropped_Energy: function (room) {
        var num_Available_Energy = Room[name].find(FIND_DROPPED_RESOURCES).length;
        if (Room[name].memory.num_Reserved_Energy !== undefined) {
            num_Available_Energy = Room[name].memory.num_Reserved_Energy;
        }
        return num_Available_Energy;
    },

    available_Energy_Source: function (room) {
        var available_Energy_Source = 0;
        var flag = true;
        for (var id in room.find(FIND_SOURCES).id) {
            // Reserved Energy Source is stored in room.memory.
            for (var reserved_id in room.memory.reserved_Energy_Source) {
                if (id !== reserved_id) {
                    flag = true;
                }
                else {
                    flag = false;
                    break;
                }
            }
            if (flag === true) {
                available_Energy_Source.push(id);
            }
        }
        if (available_Energy_Source.length === 0) {
            return ERR_NOT_FOUND;
        }
        else {
            return available_Energy_Source;
        }
    }
}

module.exports = reserve;