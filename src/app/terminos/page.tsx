import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terminos de Servicio',
  description:
    'Terminos y condiciones de uso del sitio web de Mr.BnB. Conoce las condiciones que rigen el uso de nuestros servicios de administracion de propiedades.',
}

export default function TerminosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Terminos de Servicio
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Condiciones generales que rigen el uso de nuestro sitio web y servicios.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-10">

              <p className="text-gray-500 text-sm">
                Ultima actualizacion: Marzo 2026
              </p>

              {/* 1. Aceptacion */}
              <div>
                <h2 className="heading-2 mb-4">1. Aceptacion de los terminos</h2>
                <p className="text-gray-600 leading-relaxed">
                  Al acceder y utilizar el sitio web mrbnb.cl (en adelante, &quot;el Sitio&quot;),
                  aceptas cumplir con estos Terminos de Servicio (en adelante, &quot;los
                  Terminos&quot;). Si no estas de acuerdo con alguno de estos terminos, te
                  solicitamos no utilizar el Sitio. Mr.BnB (en adelante, &quot;la Empresa&quot;)
                  se reserva el derecho de modificar estos Terminos en cualquier momento,
                  publicando las modificaciones en esta pagina.
                </p>
              </div>

              {/* 2. Descripcion del servicio */}
              <div>
                <h2 className="heading-2 mb-4">2. Descripcion del servicio</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Mr.BnB es una empresa dedicada a la administracion profesional de
                  propiedades para arriendo de corto plazo (renta corta). Nuestros
                  servicios incluyen, entre otros:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Administracion integral de propiedades en plataformas de arriendo corto (Airbnb, Booking.com y otras)</li>
                  <li>Evaluacion de propiedades para determinar su potencial de rentabilidad</li>
                  <li>Gestion operativa: limpieza, mantenimiento, atencion a huespedes y coordinacion logistica</li>
                  <li>Corretaje e inversion inmobiliaria</li>
                  <li>Reportes de rendimiento y gestion financiera de las propiedades</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  El Sitio tiene como objetivo informar sobre nuestros servicios y
                  facilitar el contacto entre la Empresa y potenciales clientes o
                  propietarios interesados.
                </p>
              </div>

              {/* 3. Uso del sitio web */}
              <div>
                <h2 className="heading-2 mb-4">3. Uso del sitio web</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Al utilizar el Sitio, te comprometes a:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Utilizar el Sitio unicamente para fines licitos y de acuerdo con estos Terminos</li>
                  <li>No realizar actividades que puedan danar, deshabilitar o sobrecargar el Sitio</li>
                  <li>No intentar acceder de manera no autorizada a sistemas o redes conectadas al Sitio</li>
                  <li>No utilizar el Sitio para transmitir contenido ilegal, amenazante, abusivo o de cualquier manera objetable</li>
                  <li>Proporcionar informacion veraz y precisa cuando completes formularios en el Sitio</li>
                </ul>
              </div>

              {/* 4. Envio de formularios */}
              <div>
                <h2 className="heading-2 mb-4">4. Envio de formularios y datos</h2>
                <p className="text-gray-600 leading-relaxed">
                  Al enviar informacion a traves de los formularios del Sitio (formularios
                  de contacto, evaluacion de propiedades u otros), declaras que la
                  informacion proporcionada es veraz, completa y actualizada. La Empresa
                  utilizara dicha informacion unicamente para los fines indicados en
                  nuestra{' '}
                  <Link href="/politica-privacidad" className="text-[#1e3a5f] font-semibold hover:underline">
                    Politica de Privacidad
                  </Link>
                  . El envio de un formulario no constituye un contrato de prestacion de
                  servicios ni genera obligacion alguna por parte de la Empresa mas alla
                  de responder a la consulta recibida.
                </p>
              </div>

              {/* 5. Propiedad intelectual */}
              <div>
                <h2 className="heading-2 mb-4">5. Propiedad intelectual</h2>
                <p className="text-gray-600 leading-relaxed">
                  Todo el contenido del Sitio, incluyendo pero no limitado a textos,
                  graficos, logotipos, iconos, imagenes, clips de audio, descargas
                  digitales, compilaciones de datos y software, es propiedad de Mr.BnB
                  o de sus proveedores de contenido y esta protegido por las leyes de
                  propiedad intelectual vigentes en Chile y tratados internacionales.
                  Queda prohibida la reproduccion, distribucion, modificacion o uso no
                  autorizado de cualquier contenido del Sitio sin el consentimiento previo
                  y por escrito de la Empresa.
                </p>
              </div>

              {/* 6. Limitacion de responsabilidad */}
              <div>
                <h2 className="heading-2 mb-4">6. Limitacion de responsabilidad</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  El Sitio y su contenido se proporcionan &quot;tal cual&quot; y &quot;segun
                  disponibilidad&quot;. La Empresa no garantiza que:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                  <li>El Sitio estara disponible de manera ininterrumpida o libre de errores</li>
                  <li>Los resultados obtenidos del uso del Sitio seran precisos o confiables</li>
                  <li>La informacion publicada en el Sitio este siempre actualizada</li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  En la maxima medida permitida por la ley, Mr.BnB no sera responsable
                  por danos directos, indirectos, incidentales, especiales o consecuentes
                  que resulten del uso o la imposibilidad de uso del Sitio, incluyendo
                  pero no limitado a la perdida de datos, ingresos o beneficios.
                </p>
              </div>

              {/* 7. Enlaces a terceros */}
              <div>
                <h2 className="heading-2 mb-4">7. Enlaces a sitios de terceros</h2>
                <p className="text-gray-600 leading-relaxed">
                  El Sitio puede contener enlaces a sitios web de terceros. Estos enlaces
                  se proporcionan unicamente para tu conveniencia. La Empresa no tiene
                  control sobre el contenido de dichos sitios y no asume responsabilidad
                  alguna por el contenido, politicas de privacidad o practicas de sitios
                  web de terceros. Te recomendamos revisar los terminos y politicas de
                  privacidad de cada sitio que visites.
                </p>
              </div>

              {/* 8. Ley aplicable */}
              <div>
                <h2 className="heading-2 mb-4">8. Legislacion aplicable y jurisdiccion</h2>
                <p className="text-gray-600 leading-relaxed">
                  Estos Terminos se rigen por las leyes de la Republica de Chile.
                  Cualquier controversia que surja en relacion con estos Terminos o con
                  el uso del Sitio sera sometida a la jurisdiccion de los tribunales
                  ordinarios de la ciudad de Santiago, Chile, renunciando las partes a
                  cualquier otro fuero que pudiera corresponderles.
                </p>
              </div>

              {/* 9. Modificaciones */}
              <div>
                <h2 className="heading-2 mb-4">9. Modificaciones a estos terminos</h2>
                <p className="text-gray-600 leading-relaxed">
                  La Empresa se reserva el derecho de actualizar o modificar estos
                  Terminos en cualquier momento y sin previo aviso. Las modificaciones
                  entraran en vigencia desde su publicacion en el Sitio. El uso continuado
                  del Sitio despues de la publicacion de cambios constituye tu aceptacion
                  de los Terminos modificados. Te recomendamos revisar esta pagina
                  periodicamente.
                </p>
              </div>

              {/* 10. Contacto */}
              <div>
                <h2 className="heading-2 mb-4">10. Contacto</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Si tienes preguntas o comentarios sobre estos Terminos de Servicio,
                  puedes contactarnos a traves de:
                </p>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>
                    <strong>Empresa:</strong> Mr.BnB
                  </li>
                  <li>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:felipe@mrbnb.cl" className="text-[#1e3a5f] font-semibold hover:underline">
                      felipe@mrbnb.cl
                    </a>
                  </li>
                  <li>
                    <strong>Ubicacion:</strong> Santiago, Chile
                  </li>
                </ul>
              </div>

              {/* Divider and link */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-gray-500 text-sm">
                  Consulta tambien nuestra{' '}
                  <Link href="/politica-privacidad" className="text-[#1e3a5f] font-semibold hover:underline">
                    Politica de Privacidad
                  </Link>
                  .
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
