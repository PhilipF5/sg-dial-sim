# SGC Computer Simulator

**IMPORTANT: This project is in a pre-alpha stage of development. Functionality is very limited, and there may be a lot of bugs.**

SGC Computer Simulator aims to be a realistic recreation of the dialing computer depicted in the television show "Stargate SG-1."

## How to Use

The intention of this project is to create a simulator that can be enjoyed without requiring technical expertise. However, we're not quite there yet. For now, the only way to run the program is to download and build the source code. You'll need Node.js and some familiarity with the command line. Otherwise, I recommend that you wait until we get to the point of having a compiled app available.

For those who are comfortable with DIY, simply clone this repo into a directory of your choice, and run your preferred Node package managers installation and `start` commands. Once the project builds, point your web browser at `http://localhost:4200` to load it.

### Current Functionality

You can dial the gate with a 7-symbol address. The dialing keyboard in the menu at the bottom of the screen can be used to select symbols. Currently, any 6-symbol combination will work, and the point of origin will be added to the dialing sequence automatically. You can abort the dialing sequence, or shut the gate down if it's active.

More functionality is planned for the future.

## Technical

The simulator is built in Angular with TypeScript. Animations are built with the GreenSock Animation Platform for JavaScript.

## Legal

The source code to this project is copyright by the author(s), and made available under the GNU Affero General Public License v3.0. No copyright or trademark claim is made by the author(s) to Stargate or related marks, names, sounds, or symbols. Furthermore, no trademark claim is made by the author(s) to the name "SGC Computer Simulator."

Stargate and related marks are trademarks of Metro-Goldwyn-Mayer Studios® Incorporated. SGC Computer Simulator is produced noncommercially, as a hobby project, with the purpose of promoting the Stargate franchise. This project is not affiliated with Metro-Goldwyn-Mayer Studios® Incorporated or its agents.

Sounds are copyright Metro-Goldwyn-Mayer Studios® Incorporated, and obtained from various Internet sources under fair use.

The Stargate SG-1 address glyphs font was created by Joy Anne Baker and published at http://www.thescifiworld.net/fonts.htm with no stated conditions or limitations on use.
