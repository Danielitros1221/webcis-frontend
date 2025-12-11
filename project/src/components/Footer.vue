<template>
  <footer class="w-full font-inter">
    <div class="bg-[#193A68] text-white py-8 px-4 md:px-16">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">

        <div>
          <h4 class="text-base font-semibold mb-4">Dirección</h4>
          <p class="text-sm leading-relaxed mb-2">Calz. Miguel Angel de Quevedo 2779</p>
          <p class="text-sm leading-relaxed mb-4">Col. Formando Hogar, Veracruz, Ver. MEXICO CP 91897</p>

          <h4 class="text-base font-semibold mb-4 mt-5">Contacto</h4>
          <p class="text-sm">(229) 934 15 00</p>
        </div>

        <div class="flex justify-center md:justify-end">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6655728129666!2d-96.159607!3d19.2002521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c34419964cc761%3A0xa6d7c54363cf608e!2sTecNM%20-%20Campus%20Instituto%20Tecnol%C3%B3gico%20de%20Veracruz!5e0!3m2!1ses!2smx!4v1732065600000"
            class="w-full md:w-[350px] h-[220px] border-2 border-white rounded-lg"
            allowfullscreen
            loading="lazy"
            title="Ubicación TecNM Veracruz">
          </iframe>
        </div>
      </div>
    </div>

    <div class="bg-[#611232] text-white py-10 px-4 md:px-16">
      <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

        <div>
          <img
            src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
            alt="Gobierno de México"
            class="w-[120px] mb-5">
        </div>

        <div>
          <h3 class="text-base font-semibold mb-5">Enlaces</h3>
          <ul class="space-y-3">
            <li><a href="https://participa.gob.mx/" class="text-sm hover:opacity-80 hover:underline">Participa</a></li>
            <li><a href="http://www.ordenjuridico.gob.mx/" class="text-sm hover:opacity-80 hover:underline">Marco jurídico</a></li>
            <li><a href="https://consultapublicamx.plataformadetransparencia.org.mx/vut-web/faces/view/consultaPublica.xhtml#inicio" class="text-sm hover:opacity-80 hover:underline">Plataforma Nacional de Transparencia</a></li>
            <li><a href="https://alertadores.funcionpublica.gob.mx/" class="text-sm hover:opacity-80 hover:underline">Alerta</a></li>
            <li><a href="#" class="text-sm hover:opacity-80 hover:underline">Denuncia</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-base font-semibold mb-5">¿Qué es gob.mx?</h3>
          <ul class="space-y-3">
            <li><a href="https://www.gob.mx/que-es-gobmx" class="text-sm hover:opacity-80 hover:underline">Es el portal único de trámites, información y participación ciudadana. Leer más</a></li>
            <li><a href="https://datos.gob.mx/" class="text-sm hover:opacity-80 hover:underline">Portal de datos abiertos</a></li>
            <li><a href="https://www.gob.mx/accesibilidad" class="text-sm hover:opacity-80 hover:underline">Declaración de accesibilidad</a></li>
            <li><a href="https://www.gob.mx/terminos" class="text-sm hover:opacity-80 hover:underline">Términos y Condiciones</a></li>
            <li><a href="https://www.gob.mx/terminos#medidas-seguridad-informacion" class="text-sm hover:opacity-80 hover:underline">Política de seguridad</a></li>
            <li><a href="https://www.gob.mx/sitemap" class="text-sm hover:opacity-80 hover:underline">Mapa de sitio</a></li>
          </ul>
        </div>

        <div>
          <ul class="space-y-3 mb-8">
            <li><a href="https://sidec.buengobierno.gob.mx/#!/" class="text-sm hover:opacity-80 hover:underline">Denuncia contra servidores públicos</a></li>
          </ul>

          <h3 class="text-base font-semibold mb-5">Síguenos en</h3>
          <div>
            <a href="https://www.facebook.com/gobmexico" target="_blank" class="inline-block text-2xl hover:scale-110 transition-transform **mr-3**">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a href="https://x.com/GobiernoMX" target="_blank" class="inline-block text-2xl hover:scale-110 transition-transform **mr-3**">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.901 1.127h3.332L14.71 9.947l7.732 12.926h-6.265l-4.938-8.283-6.628 8.283H.802l8.773-11.02L.268 1.127h6.311l4.437 5.768 5.42-5.768zM17.34 20.306h2.247L6.878 3.03H4.492l12.848 17.276z"/>
              </svg>
            </a>

            <a href="https://www.instagram.com/gobmexico/" target="_blank" class="inline-block text-2xl hover:scale-110 transition-transform **mr-3**">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.013 4.85.07c1.171.054 1.744.248 2.378.498.636.25 1.177.599 1.716 1.139s.887 1.08.139 1.716c.25.634.444 1.207.498 2.378.057 1.266.07 1.646.07 4.85s-.013 3.584-.07 4.85c-.054 1.171-.248 1.744-.498 2.378-.25.636-.599 1.177-1.139 1.716s-1.08.887-1.716 1.139c-.634.25-1.207.444-2.378.498-1.266.057-1.646.07-4.85.07s-3.584-.013-4.85-.07c-1.171-.054-1.744-.248-2.378-.498-.636-.25-1.177-.599-1.716-1.139s-.887-1.08-1.139-1.716c-.25-.634-.444-1.207-.498-2.378-.057-1.266-.07-1.646-.07-4.85s.013-3.584.07-4.85c.054-1.171.248-1.744.498-2.378.25-.636.599-1.177 1.139-1.716s1.08-.887 1.716-1.139c.634-.25 1.207-.444 2.378-.498 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.945.071-1.37.062-2.316.29-3.178.634-.849.336-1.554.793-2.247 1.486s-1.15 1.4-1.486 2.247c-.344.862-.572 1.808-.634 3.178-.057 1.278-.071 1.686-.071 4.945s.014 3.667.071 4.945c.062 1.37.29 2.316.634 3.178.336.849.793 1.554 1.486 2.247s1.4 1.15 2.247 1.486c.862.344 1.808.572 3.178.634 1.278.057 1.686.071 4.945.071s3.667-.014 4.945-.071c1.37-.062 2.316-.29 3.178-.634.849-.336 1.554-.793 2.247-1.486s1.15-1.4 1.486-2.247c.344-.862.572-1.808.634-3.178.057-1.278.071-1.686.071-4.945s-.014-3.667-.071-4.945c-.062-1.37-.29-2.316-.634-3.178-.336-.849-.793-1.554-1.486-2.247s-1.4-1.15-2.247-1.486c-.862-.344-1.808-.572-3.178-.634-1.278-.057-1.686-.071-4.945-.071zm0 5.869c-3.461 0-6.269 2.808-6.269 6.269s2.808 6.269 6.269 6.269 6.269-2.808 6.269-6.269c0-3.461-2.808-6.269-6.269-6.269zm0 10.395c-2.28 0-4.126-1.846-4.126-4.126s1.846-4.126 4.126-4.126 4.126 1.846 4.126 4.126-1.846 4.126-4.126 4.126zm6.396-10.744c0-1.077-.872-1.949-1.949-1.949s-1.949.872-1.949 1.949.872 1.949 1.949 1.949 1.949-.872 1.949-1.949z"/>
              </svg>
            </a>

            <a href="https://www.youtube.com/@gobiernodemexico" target="_blank" class="inline-block text-2xl hover:scale-110 transition-transform">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M21.5 6.072c-.815-.316-1.73-.526-2.73-.615C17.13 5.347 12 5.347 12 5.347s-5.13 0-6.77.11c-1 .089-1.915.299-2.73.615C2.61 6.388 2 7.014 2 7.828v8.344c0 .814.61 1.44 1.5 1.756.815.316 1.73.526 2.73.615 1.64.11 6.77.11 6.77.11s5.13 0 6.77-.11c1-.089 1.915-.299 2.73-.615.89-.316 1.5-.942 1.5-1.756V7.828c0-.814-.61-1.44-1.5-1.756zM9.75 14.544V9.456L15 12l-5.25 2.544z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
