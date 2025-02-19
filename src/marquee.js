import gsap from "gsap";

export class Marquee {
  constructor(rootElement) {
    console.log("Marquee initialized");
    this.marquee = rootElement;
    
    this.marqueeInner = this.marquee.querySelector(".marquee_inner");
    
    // Убираем переводы строк и предотвращаем перенос текста
    this.marqueeInner.innerHTML = this.marqueeInner.innerHTML.replace(/\n/g, "");
    this.marqueeInner.style.whiteSpace = "nowrap";

    // Скрываем переполнение, чтобы не было горизонтального скроллбара
    // this.marquee.style.overflow = "hidden";
    
    this.animation = null;

    this.updateDimensions();
    this.setup();
    this.animate();

    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserver.observe(this.marquee);
  }

  updateDimensions() {
    this.marqueeInnerWidth = this.marqueeInner.offsetWidth;
    this.marqueeWidth = this.marquee.offsetWidth;
    this.gap = parseFloat(getComputedStyle(this.marquee).gap) || 0;
  }

  setup() {
    // Очищаем старые клоны, оставляем только первый блок
    const existingClones = this.marquee.querySelectorAll(".marquee_inner:not(:first-child)");
    existingClones.forEach((clone) => clone.remove());

    // Вычисляем необходимое количество элементов (учитываем исходный элемент)
    const numCopies = Math.ceil(this.marqueeWidth / this.marqueeInnerWidth) + 1;

    // Удаляем старый обёрточный блок, если он существует
    if (this.wrapper) {
      this.wrapper.remove();
    }

    // Создаём wrapper с flex-раскладкой и отключенным переносом текста
    this.wrapper = document.createElement("div");
    this.wrapper.style.display = "flex";
    this.wrapper.style.gap = `${this.gap}px`;
    this.wrapper.style.whiteSpace = "nowrap";

    // Добавляем исходный блок в wrapper
    this.wrapper.appendChild(this.marqueeInner);

    // Добавляем необходимые клоны (numCopies - 1 дополнений)
    for (let i = 1; i < numCopies; i++) {
      const clone = this.marqueeInner.cloneNode(true);
      // Убираем переводы строк и отключаем перенос и для клонов
      clone.innerHTML = clone.innerHTML.replace(/\n/g, "");
      clone.style.whiteSpace = "nowrap";
      this.wrapper.appendChild(clone);
    }

    this.marquee.appendChild(this.wrapper);
  }

  animate() {
    // Ширина одного элемента (включая gap)
    const itemWidth = this.marqueeInnerWidth + this.gap;

    // Запускаем анимацию
    this.animation = gsap.to(this.wrapper, {
      x: -itemWidth,
      duration: 2,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        // Сбрасываем позицию без видимого разрыва
        gsap.set(this.wrapper, { x: 0 });
        console.log("repeat");
      },
    });
  }

  handleResize() {
    // Обновляем размеры
    this.updateDimensions();

    // Останавливаем текущую анимацию, если есть
    if (this.animation) {
      this.animation.kill();
    }

    // Перестраиваем marquee
    this.setup();
    this.animate();
  }
}