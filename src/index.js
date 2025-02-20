import { Clock } from "./clock";
import { Marquee } from "./marquee";
import { Grid } from "./grid";
import { Heading } from "./heading";
import { ToolkitText } from "./toolkit";
import { ColorModeButton } from "./colorModeButton";

import { reveal } from "./helpers/reveal";

class App {
  constructor() {
    // Initialization deferred to start() to wait for fonts readiness
    // this.initialize();
  }

  initialize() {
    this.initClock();
    this.initMarquees();
    this.initGrid();
    this.initToolkitText();
    this.initColorModeButton();
  }

  initClock() {
    try {
      this.clock = new Clock(".home_clock");
    } catch (error) {
      console.error("Error initializing Clock:", error);
    }
  }

  initMarquees() {
    const marqueeElements = document.querySelectorAll(".marquee");
    marqueeElements.forEach((element) => {
      new Marquee(element);
    });
  }

  initGrid() {
    try {
      this.grid = new Grid();
    } catch (error) {
      console.error("Error initializing Grid:", error);
    }
  }

  initToolkitText() {
    document.fonts.ready.then(() => {
      console.log("Fonts are loaded");
      const headingElement = document.querySelector(".hero_h1");
      if (headingElement) {
        new Heading(headingElement);
      } else {
        console.warn("Heading element not found");
      }
      try {
        this.toolkit = new ToolkitText(".toolkit_p");
      } catch (error) {
        console.error("Error initializing ToolkitText:", error);
      }
      reveal();
    });
  }

  initColorModeButton() {
    new ColorModeButton();
  }

  // Новый метод для переинициализации компонентов при смене цветового режима
  handleColorModeChange() {
    console.log("Color mode changed, reinitializing necessary components...");

    // Обновление сетки
    if (this.grid && typeof this.grid.destroy === "function") {
      this.grid.destroy();
    }
    this.grid = new Grid();

    // Обновление toolkit
    if (this.toolkit && typeof this.toolkit.destroy === "function") {
      this.toolkit.destroy();
    }
    this.toolkit = new ToolkitText(".toolkit_p");

    // Здесь можно обновить и другие компоненты, зависящие от изменения цветового режима
    console.log("Color mode-related reinitialization complete.");
  }

  // Заготовка для прослушивания изменений предпочтений движения
  listenToMotionPreferenceChanges() {}

  // Новый метод для старта приложения после загрузки шрифтов
  start() {
    document.fonts.ready.then(() => {
      this.initialize();
    });
  }
}

// Instantiate and start the app after the DOM is ready
const app = new App();
app.start();