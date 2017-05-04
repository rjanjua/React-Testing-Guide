require('react-native-mock-render/mock');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;                
global.window = document.defaultView;                    
 Object.keys(document.defaultView).forEach((property) => {
   if (typeof global[property] === 'undefined') {         
     global[property] = document.defaultView[property];   
   }                                                      
 });                                                      
