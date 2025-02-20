import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import colorStore from "./stores/ColorStore";

export class ToolkitText {
  constructor(selector) {
    console.log("Creating toolkit text");
    gsap.registerPlugin(ScrollTrigger);
    this.element = document.querySelector(selector);

    if (!this.element) {
      throw new Error("Element not found");
    }

    const splitTypeObj = this.splitText();

    this.applyStyles(splitTypeObj);
    this.addBlocks(splitTypeObj);
    this.animateLines(splitTypeObj);
  }

  splitText() {
    console.log("Splitting text");
    const splitTypeObject = new SplitType(this.element, {
      types: "lines",
    });
    return splitTypeObject;
  }

  applyStyles(obj) {
    gsap.set(obj.lines, {
      backgroundImage: `linear-gradient(90deg, ${colorStore.colors.textPrimary} 50%, transparent 50%)`,
      color: "transparent", // Hide text color to show the background gradient
      backgroundPositionX: 100,
      backgroundSize: "200% 100%",
      backgroundClip: "text",
      position: "relative",
    });
  }

  addBlocks(obj) {
    obj.lines.forEach((line) => {
      const block = document.createElement("div");
      gsap.set(block, {
        backgroundColor: colorStore.colors.textPrimary,
        position: "absolute",
        top: 0,
        left: 0,
        width: getComputedStyle(line).height,
        height: getComputedStyle(line).height,
        opacity: 0,
      });
      line.appendChild(block);
    });
  }

  animateLines(obj) {
    const blocks = [];

    obj.lines.forEach((line) => {
      const block = line.querySelector("div");
      blocks.push(block);
    });

    obj.lines.forEach((line, index) => {
      const blockForLine = blocks[index];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: line,
          start: "top center",
          end: "bottom center",
          scrub: true,
          // markers: true,
        },
      });

      gsap.set(blockForLine, {
        transformOrigin: "bottom",
      });

      tl.to(line, {
        ease: "none",
        backgroundPositionX: "0%",
      }).fromTo(
        blockForLine,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "none",
          x: getComputedStyle(line).width,
        },
        0
      );

      const tlTwo = gsap.timeline({
        scrollTrigger: {
          trigger: line,
          start: "bottom center",
          end: `+=${parseFloat(getComputedStyle(blockForLine).height)}`,
          scrub: true,
          // markers: true,
        },
      });

      // get the previous block
      const prevBlock = blocks[index - 1];

      if (!prevBlock) {
        return;
      }

      tlTwo.to(prevBlock, {
        scaleY: 0,
        // yPercent: 100,
        ease: "none",
      });

      // add tlTwo to tl
      tl.add(tlTwo);
    });
  }

  destroy() {
    console.log("Destroying toolkit text");
    // Kill all ScrollTriggers for this element
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === this.element) {
        st.kill();
      }
    });

    // Remove blocks and reset text styles
    const splitLines = this.element.querySelectorAll(".line");
    splitLines.forEach((line) => {
      // Remove appended blocks
      const block = line.querySelector("div");
      if (block) {
        block.remove();
      }

      // Reset styles
      gsap.set(line, {
        backgroundImage: "",
        color: "",
        backgroundPositionX: "",
        backgroundSize: "",
        backgroundClip: "",
        position: "",
      });
    });

    // Revert split text
    this.element.innerHTML = this.element.textContent;
  }
}