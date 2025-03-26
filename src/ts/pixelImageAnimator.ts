class PixelImageAnimator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private img: HTMLImageElement;
  private dpr: number;
  private options: {
    initialPixelSize: number;
    finalPixelSize: number;
    animationDuration: number;
  };
  private animationId: number | null;
  private startTime: number | null;
  private hasAnimated: boolean;
  private imageData: ImageData; // Добавляем свойство imageData

  constructor(canvasElement: HTMLCanvasElement, imageSrc: string, options: Partial<typeof this.options> = {}) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.img = new Image();
    this.img.src = imageSrc;
    this.dpr = window.devicePixelRatio || 1;
    this.options = {
      initialPixelSize: 200,
      finalPixelSize: 10,
      animationDuration: 2000,
      ...options,
    };
    this.animationId = null;
    this.startTime = null;
    this.hasAnimated = false;
    this.imageData = new ImageData(1, 1); // Инициализируем imageData
  }

  setupCanvas(): void {
    const canvasContainer = this.canvas.parentElement!.getBoundingClientRect();
    this.canvas.width = canvasContainer.width * this.dpr;
    this.canvas.height = canvasContainer.height * this.dpr;
    this.canvas.style.width = `${canvasContainer.width}px`;
    this.canvas.style.height = `${canvasContainer.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  progressiveLoad(progress: number): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const currentPixelSize = Math.max(
      this.options.finalPixelSize,
      this.options.initialPixelSize - (this.options.initialPixelSize - this.options.finalPixelSize) * (progress / 100)
    );

    const scaledWidth = this.canvas.width / this.dpr;
    const scaledHeight = this.canvas.height / this.dpr;
    const cols = Math.ceil(scaledWidth / currentPixelSize);
    const rows = Math.ceil(scaledHeight / currentPixelSize);
    const halfPixel = currentPixelSize / 2;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (progress < 100 && Math.random() * 100 > progress) continue;

        const pixelX = x * currentPixelSize;
        const pixelY = y * currentPixelSize;

        const sampleX = Math.min(
          Math.floor((pixelX + halfPixel) * this.dpr),
          this.imageData.width - 1
        );
        const sampleY = Math.min(
          Math.floor((pixelY + halfPixel) * this.dpr),
          this.imageData.height - 1
        );

        const dataIndex = (sampleY * this.imageData.width + sampleX) * 4;

        this.ctx.fillStyle = `rgba(
          ${this.imageData.data[dataIndex]},
          ${this.imageData.data[dataIndex + 1]},
          ${this.imageData.data[dataIndex + 2]},
          ${this.imageData.data[dataIndex + 3] / 255}
        )`;

        this.ctx.fillRect(pixelX, pixelY, currentPixelSize, currentPixelSize);
      }
    }
  }

  animate(currentTime: number): void {
    if (!this.startTime) this.startTime = currentTime;

    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.options.animationDuration * 100, 100);

    this.progressiveLoad(progress);

    if (progress < 100) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    } else {
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.drawImage(this.img, 0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
      this.hasAnimated = true;
    }
  }

  init(): void {
    this.img.onload = () => {
      this.setupCanvas();

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCanvas.width = this.canvas.width;
      tempCanvas.height = this.canvas.height;

      tempCtx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
      this.imageData = tempCtx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    };

    this.img.onerror = () => {
      console.error(`Failed to load image: ${this.img.src}`);
    };
  }

  startAnimation(): void {
    if (!this.hasAnimated && !this.animationId) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
  }

  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}