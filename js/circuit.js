// circuit's extension of Raphael 

// for creating circuit elements at given locations
Raphael.fn.circuit = {
  resistor: function(ohm, x, y) {
    
  },
  voltageSource: function(volt, x, y) {
    
  }
}; 

// for creating circuit elements one after the other
Raphael.el.resistor = function(ohm) {
  this.... // create a new ohm-value resistor after "this" in the circuit
};
