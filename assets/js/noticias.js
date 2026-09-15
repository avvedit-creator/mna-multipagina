document.addEventListener("DOMContentLoaded", () => {
  const contenedorNovedades = document.querySelector("#lista-novedades-publico");
  const contenedorDocumentos = document.querySelector("#lista-documentos-publico");

  function idVideoEmbebible(url) {
    if (!url) return null;
    const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{6,})/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : null;
  }

  function renderNovedades() {
    if (!contenedorNovedades) return;
    const novedades = MNA.listarNovedades();
    if (!novedades.length) {
      contenedorNovedades.innerHTML = `<p class="vacio">Todavía no hay novedades publicadas.</p>`;
      return;
    }
    contenedorNovedades.innerHTML = novedades.map((n) => {
      const embed = idVideoEmbebible(n.video);
      return `
        <article class="tarjeta tarjeta--noticia">
          <span class="fecha">${n.fecha}</span>
          <h3>${n.titulo}</h3>
          <p>${n.texto}</p>
          ${n.imagen ? `<img src="${n.imagen.datos}" alt="" style="border-radius:10px;width:100%;">` : ""}
          ${embed ? `<div class="video-incrustado"><iframe src="${embed}" title="Video" allowfullscreen></iframe></div>` : ""}
          ${n.pdf ? `<a href="${n.pdf.datos}" download="${n.pdf.nombre}" class="tarjeta__enlace">📄 Descargar PDF</a>` : ""}
        </article>
      `;
    }).join("");
  }

  function renderDocumentos() {
    if (!contenedorDocumentos) return;
    const documentos = MNA.listarDocumentos();
    if (!documentos.length) {
      contenedorDocumentos.innerHTML = `<p class="vacio">Todavía no hay documentos publicados.</p>`;
      return;
    }
    contenedorDocumentos.innerHTML = documentos.map((d) => `
      <div class="documento-item">
        <div class="documento-item__icono">📄</div>
        <div class="documento-item__cuerpo">
          <h4>${d.titulo}</h4>
          ${d.descripcion ? `<p>${d.descripcion}</p>` : ""}
          <a href="${d.archivo.datos}" download="${d.archivo.nombre}">Descargar</a>
        </div>
      </div>
    `).join("");
  }

  renderNovedades();
  renderDocumentos();
});
