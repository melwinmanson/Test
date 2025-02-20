class ColorStore {
    constructor() {
      if (ColorStore.instance) {
        return ColorStore.instance;
      }
  
      this.colors = {};
      this.init();
  
      ColorStore.instance = this;
    }
  
    init() {
      this.colors = {
        textPrimary: getComputedStyle(document.body).getPropertyValue(
          "--theme--text-primary"
        ),
        textSecondary: getComputedStyle(document.body).getPropertyValue(
          "--theme--text-secondary"
        ),
        backgroundPrimary: getComputedStyle(document.body).getPropertyValue(
          "--theme--bg-primary"
        ),
        backgroundSecondary: getComputedStyle(document.body).getPropertyValue(
          "--theme--bg-secondary"
        ),
        border: getComputedStyle(document.body).getPropertyValue(
          "--theme--border"
        ),
      };
  
      console.log(this.colors);
    }
  }
  
  const colorStore = new ColorStore();
  export default colorStore;