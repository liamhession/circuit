// circuit's extension of Raphael 

// For creating circuit elements at given locations
//Raphael.fn.circuit = {
  // Resistor - 
  //	ohm: changes how tightly compressed the resistor appears
  //	x,y: where the left or upper end of the resistor will be
  //	vert: set if the resistor is to be drawn vertically, horizontal is standard
Raphael.fn.resistor = function(ohm, x, y, vert) {
    var leadLength = 20; // length of leads to resistor in pixels
    var resistorLength = 50; // space between leads, to be filled by squiggle
    var resistorHeight = 20; // vertical bounds on resistor size

    var pathString = 'M'+x+','+y;
    pathString += (vert?'v'+leadLength:'h'+leadLength); // draw first lead
    
    // ohm will normally have a range of about 500Ω to 5kΩ, we'll have one angle/100Ω,
    // and the number of zigs determines the slope of the zig. 
    // rise is always ±resistorHeight, but run is resistorLength/numZigs
    var numZigs = Math.floor(ohm/100);
    var zigRun = resistorLength/(numZigs+1);   // +1 takes into account the first and last half-zigs

    // draw the opening half-zig, then the body, and finally the closing half-zig
    var goingUpRight = true;
    pathString += resistorZig(zigRun/2, resistorHeight/2, goingUpRight, vert); 
    for(var zig = 0; zig < numZigs; zig++) {
      goingUpRight = !goingUpRight;
      pathString += resistorZig(zigRun, resistorHeight, goingUpRight, vert);
    }
    pathString += resistorZig(zigRun/2, resistorHeight/2, !goingUpRight, vert);

    pathString += (vert?'v'+leadLength:'h'+leadLength); // draw the final lead off the resistor

    return this.path(pathString).attr({fill: "none", stroke: "#000", "stroke-width": 4});
/*  },
  voltageSource: function(volt, x, y, horiz) {
    return;
  }*/
}; 

// Creates strings representing the drawing of one zig in the resistor
//    run, rise: the amount this zig goes "over" and "up" in horiz. frame
//    upRight: true if the zig is being drawn going up and to the right in horiz. frame
//    vert: true if the resistor is being drawn in vert. frame
function resistorZig(run, rise, upRight, vert) {
  var zigPath = 'l';
  
  if((!vert && upRight) || (vert && !upRight)) {  // rise is negative y-movement || negative x-movement
    rise = -rise;
  }

  if(vert) {
    zigPath += rise+','+run;
  }
  else {
    zigPath += run+','+rise;
  }

  return zigPath;
}

// For creating circuit elements one after the other
/*Raphael.el.resistor = function(ohm) {
  this.... // create a new ohm-value resistor after "this" in the circuit
};*/
