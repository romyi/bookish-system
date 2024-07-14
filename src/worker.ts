let cs: OffscreenCanvas;

async function loadimage() {
  const res = await fetch(new URL("/map-sm.webp", import.meta.url));
  return await res.blob();
}

onmessage = async (e) => {
  if (e.data.canvas) {
    cs = e.data.canvas;
    const b = await loadimage();
    const bm = await createImageBitmap(b);
    cs.getContext("2d")?.drawImage(bm, 0, 0, cs.width, cs.height);
    bm.close();
  }
};
