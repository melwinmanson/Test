import { Clock } from "./clock";
import { Marquee } from "./marquee";

import { reveal } from "./helpers/reveal";
import { Grid } from "./grid";

const clock = new Clock(".home_clock");

const marqueeElements = document.querySelectorAll(".marquee");
marqueeElements.forEach(
  (marqueeElement, index) => new Marquee (marqueeElement, index + 1 * 20)
);

const grid = new Grid();

reveal();