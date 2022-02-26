This set of files is a library meant to enable any tracker which can interface with javascript a way to use autotracking via usb2snes.

1) Integration into your project.
Pull down the 3 files from the project and place them where you want. You will need to include them in your project.

Instantiate the tracking interface like so: ti = new tracking_interface();

You must then define the relefavnt functions to wire the documented memory locations from http://wiki.ff4fe.com/doku.php?id=developer_integration to your tracker. The four functions you will need to map are:
auto_set_ki - the function the tracker will call when it has information about a KI
auto_set_used_ki - the function the tracker will call when it has information about a KI being used
auto_set_loc_ki - the function the tracker will call when it has information about a KI location's status
The parameters for the above 3 are the ID of the slot (as defined in the memory locations above) and whether the flag is set (true or false)

If you wish to handle objectives as well, these two functions will need to be handled:
auto_set_live_objectives - This is called once at the beginning to read the metadata from the file. (Warning: limited to ~20 objectives). It will set the objectives and flags variables on the tracker.
auto_set_objective - This is called when an objective should be marked, parameters are the ID of the slot and whether the flag is set (just like the other sets.)

Everyone needs to have this defined
auto_update_func - the function the tracker will call after having updated the raw information: this should trigger any advfanced logic/UI changes
This function has no parameters.

You will also have to decide how you want people to interface with connecting to the server. Whether it be on load of the page, when they click a button, whatever, that's the getConnected() function. the disconnect() function handles a manual disconnect.

2) Usage once in your project.
You will need to set up usb2snes or qusb2snes as appropriate: the docs for this are at http://usb2snes.com/ and https://skarsnik.github.io/QUsb2snes/

Once it is up and running with a single connected device, things should start working.

3) Examples
The 'samples' directory contains some example mapping JS files.

4) Error handling
The getConnected function takes an optional parameter for the errorhandler, and the tracker exposes a 'status()' function.
If you need to know whether the interface is in a 'bad' state, call status()
Whenever an error happens the errorhandler will be called with a string, which you can present as you will. 
