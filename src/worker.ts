let cx: CanvasRenderingContext2D;

const leftoffset = 0.062;
const topoffset = 0.094;

const cols = 20;
const rows = 20;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function loadimage() {
  const res = await fetch(new URL("/map-sm.webp", import.meta.url));
  return await res.blob();
}

function grid(w: number, h: number) {
  const width = w;
  const height = h;
  const cellwidth = (width - width * leftoffset * 2) / cols;
  const cellheight = (height - height * topoffset * 2) / rows;
  const a = Array.from({ length: cols * rows }).map((_, i) => {
    const row = Math.floor(i / rows) + 1;
    const col = (i % cols) + 1;
    const xaligner = cellwidth * 0.35;
    const yaligner = cellheight * 0.55;
    const x =
      width * leftoffset +
      (col - 1) * ((width - width * leftoffset * 2) / cols);
    const y =
      height * topoffset +
      (row - 1) * ((height - height * topoffset * 2) / rows);
    const fill = "white";
    return {
      x,
      y,
      textx: x + xaligner,
      texty: y + yaligner,
      char: alphabet.charAt(row - 1) + col,
      fill,
    };
  });
  return a;
}

onmessage = async (e) => {
  if (e.data.canvas) {
    const b = await loadimage();
    const bm = await createImageBitmap(b);
    cx = e.data.canvas.getContext("2d", { willReadFrequently: true });
    cx.drawImage(bm, 0, 0, e.data.canvas.width, e.data.canvas.height);
    const cells = grid(e.data.w, e.data.h);
    bm.close();
    postMessage({ type: "result", cells });
  }
  if (e.data.command === "grid") {
    const width = e.data.w;
    const height = e.data.h;
    const cellwidth = (width - width * leftoffset * 2) / cols;
    const cellheight = (height - height * topoffset * 2) / rows;
    const a = Array.from({ length: cols * rows }).map((_, i) => {
      const row = Math.floor(i / rows) + 1;
      const col = (i % cols) + 1;
      const xaligner = cellwidth * 0.35;
      const yaligner = cellheight * 0.55;
      const x =
        width * leftoffset +
        (col - 1) * ((width - width * leftoffset * 2) / cols);
      const y =
        height * topoffset +
        (row - 1) * ((height - height * topoffset * 2) / rows);
      return {
        x,
        y,
        textx: x + xaligner,
        texty: y + yaligner,
        char: alphabet.charAt(row - 1) + col,
      };
    });
    postMessage({ result: "grid", data: a });
  }
};
