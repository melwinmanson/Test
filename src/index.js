import { Clock } from "./clock";
import { Marquee } from "./marquee";
import { Grid } from "./grid";
import { Heading } from "./heading";
import { ToolkitText } from "./toolkit";

import { reveal } from "./helpers/reveal";

const clock = new Clock(".home_clock");

const marqueeElements = document.querySelectorAll(".marquee");
marqueeElements.forEach(
  (marqueeElement, index) => new Marquee (marqueeElement, index + 1 * 20)
);

const grid = new Grid();

document.fonts.ready.then(() => {
  console.log("Fonts are loaded");
  const heading = new Heading(document.querySelector(".hero_h1"));
  const toolkit = new ToolkitText(".toolkit_p");
  reveal();
});