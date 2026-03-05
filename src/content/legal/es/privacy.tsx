import Link from 'next/link'

export default function PrivacyContentES() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Politica de Privacidad
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Tu privacidad es importante para nosotros. Conoce como recopilamos,
              usamos y protegemos tus datos personales.
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

              {/* 1. Introduccion */}
              <div>
                <h2 className="heading-2 mb-4">1. Introduccion</h2>
                <p className="text-gray-600 leading-relaxed">
                  Mr.BnB (en adelante, &quot;la Empresa&quot;) se compromete a proteger la
                  privacidad de los usuarios de su sitio web mrbnb.cl (en adelante,
                  &quot;el Sitio&quot;). Esta Politica de Privacidad describe como recopilamos,
                  utilizamos, almacenamos y protegemos la informacion personal que nos
                  proporcionas, en cumplimiento con la Ley N 19.628 sobre Proteccion de
                  la Vida Privada de Chile.
                </p>
              </div>

              {/* 2. Datos que recopilamos */}
              <div>
                <h2 className="heading-2 mb-4">2. Datos que recopilamos</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Recopilamos los siguientes datos personales cuando interactuas con
                  nuestro Sitio, ya sea a traves de formularios de contacto, evaluacion
                  de propiedades u otras funcionalidades:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Nombre completo</li>
                  <li>Direccion de correo electronico</li>
                  <li>Numero de telefono</li>
                  <li>Comuna o ubicacion de la propiedad</li>
                  <li>Informacion sobre la propiedad (tipo, cantidad de dormitorios, metros cuadrados, entre otros)</li>
                  <li>Cualquier informacion adicional que decidas proporcionarnos voluntariamente en los formularios de contacto</li>
                </ul>
              </div>

              {/* 3. Como usamos tus datos */}
              <div>
                <h2 className="heading-2 mb-4">3. Como utilizamos tus datos</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Utilizamos la informacion recopilada exclusivamente para los siguientes fines:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Responder a tus consultas y solicitudes de contacto</li>
                  <li>Realizar evaluaciones de propiedades solicitadas por ti</li>
                  <li>Enviarte informacion relevante sobre nuestros servicios, siempre que hayas dado tu consentimiento</li>
                  <li>Enviar notificaciones relacionadas con el estado de tu solicitud o propiedad</li>
                  <li>Mejorar la calidad de nuestro sitio web y servicios</li>
                  <li>Cumplir con obligaciones legales aplicables</li>
                </ul>
              </div>

              {/* 4. Acceso a los datos */}
              <div>
                <h2 className="heading-2 mb-4">4. Acceso a los datos</h2>
                <p className="text-gray-600 leading-relaxed">
                  Tus datos personales son tratados de manera confidencial y solo tienen
                  acceso a ellos los miembros autorizados del equipo de Mr.BnB que los
                  necesitan para cumplir con las finalidades descritas en esta politica.
                  No vendemos, alquilamos ni compartimos tu informacion personal con
                  terceros, salvo cuando sea requerido por ley o por una autoridad
                  competente.
                </p>
              </div>

              {/* 5. Cookies y tecnologias de seguimiento */}
              <div>
                <h2 className="heading-2 mb-4">5. Cookies y tecnologias de seguimiento</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nuestro Sitio utiliza cookies y tecnologias similares para mejorar tu
                  experiencia de navegacion. En particular, utilizamos:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                  <li>
                    <strong>Google Analytics:</strong> Para recopilar informacion anonima
                    sobre como los visitantes usan nuestro Sitio, incluyendo paginas
                    visitadas, tiempo de permanencia y fuente de trafico. Esta informacion
                    nos ayuda a mejorar el contenido y la funcionalidad del Sitio.
                  </li>
                  <li>
                    <strong>Cookies funcionales:</strong> Necesarias para el correcto
                    funcionamiento del Sitio.
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  Puedes configurar tu navegador para rechazar cookies o para que te
                  notifique cuando se envie una cookie. Sin embargo, algunas funcionalidades
                  del Sitio podrian no funcionar correctamente si deshabilitas las cookies.
                </p>
              </div>

              {/* 6. Retencion de datos */}
              <div>
                <h2 className="heading-2 mb-4">6. Retencion de datos</h2>
                <p className="text-gray-600 leading-relaxed">
                  Conservamos tus datos personales unicamente durante el tiempo necesario
                  para cumplir con las finalidades para las cuales fueron recopilados, o
                  segun lo exija la legislacion vigente. Una vez que tus datos ya no sean
                  necesarios, seran eliminados o anonimizados de manera segura.
                </p>
              </div>

              {/* 7. Derechos del usuario */}
              <div>
                <h2 className="heading-2 mb-4">7. Tus derechos</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  De acuerdo con la Ley N 19.628 sobre Proteccion de la Vida Privada,
                  tienes los siguientes derechos respecto a tus datos personales:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                  <li>
                    <strong>Derecho de acceso:</strong> Solicitar informacion sobre los
                    datos personales que tenemos sobre ti.
                  </li>
                  <li>
                    <strong>Derecho de rectificacion:</strong> Solicitar la correccion de
                    datos inexactos o incompletos.
                  </li>
                  <li>
                    <strong>Derecho de cancelacion:</strong> Solicitar la eliminacion de
                    tus datos personales cuando ya no sean necesarios para los fines para
                    los que fueron recopilados.
                  </li>
                  <li>
                    <strong>Derecho de oposicion:</strong> Oponerte al tratamiento de tus
                    datos personales en determinadas circunstancias.
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  Para ejercer cualquiera de estos derechos, puedes contactarnos a traves
                  del correo electronico{' '}
                  <a href="mailto:felipe@mrbnb.cl" className="text-[#1e3a5f] font-semibold hover:underline">
                    felipe@mrbnb.cl
                  </a>
                  . Responderemos tu solicitud dentro de los plazos establecidos por la ley.
                </p>
              </div>

              {/* 8. Seguridad */}
              <div>
                <h2 className="heading-2 mb-4">8. Seguridad de los datos</h2>
                <p className="text-gray-600 leading-relaxed">
                  Implementamos medidas de seguridad tecnicas y organizativas razonables
                  para proteger tus datos personales contra el acceso no autorizado, la
                  alteracion, divulgacion o destruccion. Sin embargo, ninguna transmision
                  de datos por Internet o sistema de almacenamiento es completamente
                  seguro, por lo que no podemos garantizar la seguridad absoluta de tu
                  informacion.
                </p>
              </div>

              {/* 9. Cambios */}
              <div>
                <h2 className="heading-2 mb-4">9. Cambios a esta politica</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nos reservamos el derecho de modificar esta Politica de Privacidad en
                  cualquier momento. Cualquier cambio sera publicado en esta pagina con
                  la fecha de ultima actualizacion. Te recomendamos revisar esta politica
                  periodicamente para estar informado sobre como protegemos tus datos.
                </p>
              </div>

              {/* 10. Contacto */}
              <div>
                <h2 className="heading-2 mb-4">10. Contacto</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Si tienes preguntas, comentarios o solicitudes relacionadas con esta
                  Politica de Privacidad o con el tratamiento de tus datos personales,
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
                  Consulta tambien nuestros{' '}
                  <Link href="/terminos" className="text-[#1e3a5f] font-semibold hover:underline">
                    Terminos de Servicio
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
