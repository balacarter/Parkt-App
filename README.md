Parkt - the app thats gets you parkt faster
https://expo.io/@carterb/projects/parkt
https://expo.io/@carterb/projects/parkt

Beta version 0.0.00.01

Parkt is an app that allows users to crowd source parking spots in densley populated areas.

Users can set the mode of the app to "I need parking" which draws a circle around the users current locastion, or search location, and highlights reported parking spots in that area. The user can also report a parking spot they are leaving behind by changing the app mode to "I am leaving" which allows the user to add their current location to the app as an available parking spot.

The app features a basic Login/Sign Up flow using Firebase to handle authentication. One can sign up with an email address and password. The app also uses firebase to store parking spots, and sync those spots up with other Parkt users. Redux is used locally to manage app state and store parking spots in the area.

The search radius can be set in the settings page with feet as the unit of measure. The default is 500 feet search radius.

There should be multiple parking spots where I live at: 200 S Kenmore Ave, Los Angeles, CA if you want to check what's stored in firebase.


Features to add:
Better overall GUI
A modal to pop up when pins are pressed, maybe displaying a preview of the location street view.
A way to only download parking spots that reside in the search radius. this could be a performance issue later on.
Parking spot timeouts: I.e delete parking spots after 30 minutes
A limit to how many parking spots one user can report at once.
A scoring system to encourage users to report more parking spots.
A page listing availeble parking spots and distance, vs. a map with pins on it

Commentary:
I wish I could have created a more fully featured app, but between work, senior project, and other classes it's been hard to develop more than this. I think this is a good beta version of the app, and I plan to continue development as aperson project. My biggest struggle was implementing redux with firebase and maintaining a uniform data structure. As it is now, the app uses redux actions to dispatch data to be stored into firebase. Firebase functions in a way that reading data can be set up as an event listener that fires when new data is added to firebase. This maintins synchronization across all users apps. Using Redux Thunk and Firebase, any user can see new parking spots pop up as they are added by other users.
