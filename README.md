# Calculator

This is a clone of:
  - https://github.com/Granze/react-starterify 
  - https://github.com/ddaza/drone-view

## Problem:

A calculator website (or app) which logs calculations as they happen and shares those calculations with everyone connected to the website. 
For example, user A and user B go to your site at the same time. User A calculates "5 + 5", which equals "10". 
This is logged below the calculator as "5+5 = 10". User B is updated about this calculation right after user A posts it. 
Now user B calculates "3\*4". This calcs to 12 and displays "3\*4=12" right below the prior calculation. 
User A sees this update immediately after user B posts it. Results should remain between sessions. Only show the last 10 calculations descending from most recent to oldest.


## Instructions: 

Make sure you have the latest version of Node installed.

at the root of the folder you should run:
```bash
npm install
```
After the installer finished you should run: 

```bash
npm run watch
```
In order to build the application and serve it in localhost:3000

The app should start and update when changes are detected.

The calculator is just an input that would take simple math operations and display their value when the user presses the 'Return/Enter' key.

## Known Bugs: 

There is a problem with the Styling when working with multiple sessions and you'd need to refresh your page.
