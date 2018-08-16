# SG Dialing Simulator (SGDS)

**IMPORTANT: This project is in a pre-alpha stage of development. Functionality is very limited, and there may be a lot of bugs.**

SGDS aims to be a realistic recreation of the dialing computer depicted in the television show "Stargate SG-1."

## How to Use

The intention of this project is to create a simulator that can be enjoyed without requiring technical expertise. However, we're not quite there yet. For now, the only way to run the program is to download and build the source code. You'll need Node.js and some familiarity with the command line. Otherwise, I recommend that you wait until we get to the point of having a compiled app available.

For those who are comfortable with DIY, simply clone this repo into a directory of your choice, and run your preferred Node package managers `install` and `start` commands. The source code will compile, and an Electron shell will launch automatically.

### Current Functionality

You can dial the gate with a 7-symbol address. The dialing keyboard in the menu at the bottom of the screen can be used to select symbols. Currently, over 80 addresses will work, all of which come from the [SGCommand Wiki](https://stargate.wikia.com). The point of origin will be added to the dialing sequence automatically. You can abort the dialing sequence, or shut the gate down if it's active.

More functionality is planned for the future.

## Technical

Most simulators from Stargate's Internet heyday in the 2000s were built in Flash, much like many of that era's interactive websites. But as the web has moved on, so too can the simulator. SGDS is written in TypeScript, HTML, and Sass. The program is built using Angular, Google's popular open-source frontend framework. Complex and data-driven animations are achieved with the GreenSock Animation Platform.

## Legal

The source code to this project is copyright by the author(s), and made available under the MIT License. No copyright or trademark claim is made by the author(s) to Stargate or related marks, names, sounds, or symbols. Furthermore, no trademark claim is made by the author(s) to the name "SG Dialing Simulator."

Stargate and related marks are trademarks of Metro-Goldwyn-Mayer Studios® Incorporated. This project is produced noncommercially, as a hobby project, with the purpose of promoting the Stargate franchise. This project is not affiliated with Metro-Goldwyn-Mayer Studios® Incorporated or its agents.

Sounds are copyright Metro-Goldwyn-Mayer Studios® Incorporated, and obtained from various Internet sources under fair use.

The Stargate SG-1 address glyphs font was created by Joy Anne Baker and published at http://www.thescifiworld.net/fonts.htm with no stated conditions or limitations on use.
