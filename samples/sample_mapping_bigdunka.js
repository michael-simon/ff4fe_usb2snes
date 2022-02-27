let ti = new tracking_interface();
let ki_map = {
  0x00: KeyItem.PACKAGE,
  0x01: KeyItem.SANDRUBY,
  0x02: KeyItem.LEGEND,
  0x03: KeyItem.BARON_KEY,
  0x04: KeyItem.TWINHARP,
  0x05: KeyItem.EARTH_CRYSTAL,
  0x06: KeyItem.MAGMA_KEY,
  0x07: KeyItem.TOWER_KEY,
  0x08: KeyItem.HOOK,
  0x09: KeyItem.LUCA_KEY,
  0x0A: KeyItem.DARKNESS_CRYSTAL,
  0x0B: KeyItem.RAT_TAIL,
  0x0C: KeyItem.ADAMANT,
  0x0D: KeyItem.PAN,
  0x0E: KeyItem.SPOON,
  0x0F: KeyItem.PINK_TAIL,
  0x10: KeyItem.CRYSTAL
}

let ki_location_map = {
  0x002E: KeyItemCheck.ADAMANT,
  0x0021: KeyItemCheck.ANTLION,
  0x0025: KeyItemCheck.BARON_KING,
  0x0024: KeyItemCheck.BARON_INN,
  0x0033: KeyItemCheck.BARON_ODIN,
  0x0022: KeyItemCheck.FABUL_DEFEND,
  0x002F: KeyItemCheck.FABUL_SYLPH,
  0x0030: KeyItemCheck.FABUL_PAN,
  0x0027: KeyItemCheck.MAGNES,
  0x0059: KeyItemCheck.MIST,
  0x0023: KeyItemCheck.MT_ORDEALS,
  0x0026: KeyItemCheck.TOROIA,
  0x0028: KeyItemCheck.TOWER_ZOT,
  0x002B: KeyItemCheck.DWARF,
  0x002D: KeyItemCheck.FEY_CHEST,
  0x0031: KeyItemCheck.FEY_ASURA,
  0x0032: KeyItemCheck.FEY_LEVIATHAN,
  0x0029: KeyItemCheck.LOWER_BABIL_BOSS,
  0x002A: KeyItemCheck.LOWER_BABIL_CANNON,
  0x002C: KeyItemCheck.SEALED_CAVE,
  0x0034: KeyItemCheck.SYLPH_CAVE,
  0x0035: KeyItemCheck.BAHAMUT,
  0x0037: KeyItemCheck.MOON_CRYSTAL,
  0x0036: KeyItemCheck.MOON_MURASAME,
  0x003B: KeyItemCheck.MOON_MASAMUNE,
  0x0039: KeyItemCheck.MOON_RIBBON,
  0x003A: KeyItemCheck.MOON_RIBBON,
  0x0038: KeyItemCheck.MOON_WHITE
}

function resetObjectives() {
  for (let i=4; i < 98; i++) {
    objectives[i] = 2;
  }
}
// In an enabling framework, i think you have to do them all at once
ti.auto_set_live_objectives = (values) => {
  resetObjectives();
  for (let i=0; i < values.length; i++) {
    let objectiveIndex = objectivenames.indexOf(values[i]);
    objectives[objectiveIndex+4] = 0;
  }
  SetObjectives();
}

ti.auto_set_objective = (slot, value) => {
  // for objectives, the 'slot' is the text of the objective
  let index = objectivenames.indexOf(slot);
  if (index > -1) {
    objectives[index+4] = value ? 0 : 1; // Reverse values of expected
    checkOffObjective(index+4); // Then use this to get the image to update right
  }
}

// Define this function to set KIs. slot is the docced index at
// http://wiki.ff4fe.com/doku.php?id=developer_integration
// value is true or false
ti.auto_set_ki = (slot, value) => {
  keyitems[ki_map[slot]] = value;
}

// Define this function to set KI locations, slot is the docced index at
// http://wiki.ff4fe.com/doku.php?id=developer_integration
// value is true or false
ti.auto_set_loc_ki = (slot, value) => {
  if (ki_location_map[slot] !== undefined) {
    if (keyitemlocations[ki_location_map[slot]] !== 0 &&
      keyitemlocations[ki_location_map[slot]] !== 3) {
        if (value)
          keyitemlocations[ki_location_map[slot]] = 2;
        else
          keyitemlocations[ki_location_map[slot]] = 1;
      }
    }
    else {

    }
  }
// Set the state update function here if you have one
function AutoTrackerErrorHandler(msg) {
  autotrackingmessage = msg;
  autotrackingerror = !ti.status();
  flagautotrackingerror(autotrackingerror);
}

ti.auto_update_func = ApplyChecks;

//ti.getConnected(autotrackingport, AutoTrackerErrorHandler);
