import { Clock } from "./clock";
import { Marquee } from "./marquee";

import { reveal } from "./helpers/reveal";

const clock = new Clock(".home_clock");

const marqueeElements = document.querySelectorAll(".marquee");
const marquees = [];
marqueeElements.forEach((marqueeElement) => marquees.push(new Marquee(marqueeElement)));
reveal();