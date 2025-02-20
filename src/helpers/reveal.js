export function reveal() {
    const startHiddenAttributeName = "start-hidden";
    const starRevealefAttributeName = "start-revealed";

    const elements = document.querySelectorAll(`[${startHiddenAttributeName}]`);
    const elementsToHide = document.querySelectorAll(
        `[${starRevealefAttributeName}]`
    );

    elements.forEach((element) => {
      element.removeAttribute(startHiddenAttributeName);
    });

    elementsToHide.forEach((element) => {
      element.remove();
    })
}