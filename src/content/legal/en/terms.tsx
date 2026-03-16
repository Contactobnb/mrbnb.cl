import Link from 'next/link'

export default function TermsContentEN() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              General conditions governing the use of our website and services.
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
                Last updated: March 2026
              </p>

              {/* 1. Acceptance */}
              <div>
                <h2 className="heading-2 mb-4">1. Acceptance of terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using the website mrbnb.cl (hereinafter, &quot;the Site&quot;),
                  you agree to comply with these Terms of Service (hereinafter, &quot;the
                  Terms&quot;). If you do not agree with any of these terms, please do not
                  use the Site. Mr.BnB (hereinafter, &quot;the Company&quot;) reserves the right
                  to modify these Terms at any time by publishing the modifications on
                  this page.
                </p>
              </div>

              {/* 2. Service description */}
              <div>
                <h2 className="heading-2 mb-4">2. Service description</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Mr.BnB is a company dedicated to the professional management of
                  properties for short-term rentals. Our services include, among others:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Comprehensive property management on short-term rental platforms (Airbnb, Booking.com and others)</li>
                  <li>Property evaluations to determine profitability potential</li>
                  <li>Operational management: cleaning, maintenance, guest attention and logistics coordination</li>
                  <li>Real estate brokerage and investment</li>
                  <li>Performance reports and financial management of properties</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  The Site aims to inform about our services and facilitate contact
                  between the Company and potential clients or interested property owners.
                </p>
              </div>

              {/* 3. Website use */}
              <div>
                <h2 className="heading-2 mb-4">3. Website use</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  By using the Site, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Use the Site only for lawful purposes and in accordance with these Terms</li>
                  <li>Not engage in activities that may damage, disable or overload the Site</li>
                  <li>Not attempt unauthorized access to systems or networks connected to the Site</li>
                  <li>Not use the Site to transmit illegal, threatening, abusive or otherwise objectionable content</li>
                  <li>Provide truthful and accurate information when completing forms on the Site</li>
                </ul>
              </div>

              {/* 4. Form submissions */}
              <div>
                <h2 className="heading-2 mb-4">4. Form submissions and data</h2>
                <p className="text-gray-600 leading-relaxed">
                  By submitting information through the Site&apos;s forms (contact forms,
                  property evaluations or others), you declare that the information
                  provided is truthful, complete and up to date. The Company will use
                  such information only for the purposes indicated in our{' '}
                  <Link href="/politica-privacidad" className="text-[#1e3a5f] font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                  . Submitting a form does not constitute a service contract nor does it
                  create any obligation on the part of the Company beyond responding to
                  the inquiry received.
                </p>
              </div>

              {/* 5. Intellectual property */}
              <div>
                <h2 className="heading-2 mb-4">5. Intellectual property</h2>
                <p className="text-gray-600 leading-relaxed">
                  All content on the Site, including but not limited to texts, graphics,
                  logos, icons, images, audio clips, digital downloads, data compilations
                  and software, is the property of Mr.BnB or its content providers and is
                  protected by the intellectual property laws in force in Chile and
                  international treaties. Reproduction, distribution, modification or
                  unauthorized use of any content on the Site is prohibited without prior
                  written consent from the Company.
                </p>
              </div>

              {/* 6. Limitation of liability */}
              <div>
                <h2 className="heading-2 mb-4">6. Limitation of liability</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Site and its content are provided &quot;as is&quot; and &quot;as available&quot;.
                  The Company does not guarantee that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                  <li>The Site will be available uninterruptedly or error-free</li>
                  <li>Results obtained from using the Site will be accurate or reliable</li>
                  <li>Information published on the Site is always up to date</li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, Mr.BnB shall not be liable for
                  direct, indirect, incidental, special or consequential damages resulting
                  from the use or inability to use the Site, including but not limited to
                  loss of data, revenue or profits.
                </p>
              </div>

              {/* 7. Third-party links */}
              <div>
                <h2 className="heading-2 mb-4">7. Links to third-party sites</h2>
                <p className="text-gray-600 leading-relaxed">
                  The Site may contain links to third-party websites. These links are
                  provided solely for your convenience. The Company has no control over
                  the content of such sites and assumes no responsibility for the content,
                  privacy policies or practices of third-party websites. We recommend
                  reviewing the terms and privacy policies of each site you visit.
                </p>
              </div>

              {/* 8. Applicable law */}
              <div>
                <h2 className="heading-2 mb-4">8. Applicable law and jurisdiction</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms are governed by the laws of the Republic of Chile. Any
                  dispute arising in connection with these Terms or with the use of the
                  Site shall be submitted to the jurisdiction of the ordinary courts of
                  the city of Santiago, Chile, with the parties waiving any other
                  jurisdiction that may apply.
                </p>
              </div>

              {/* 9. Modifications */}
              <div>
                <h2 className="heading-2 mb-4">9. Modifications to these terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  The Company reserves the right to update or modify these Terms at any
                  time without prior notice. Modifications will take effect from their
                  publication on the Site. Continued use of the Site after the publication
                  of changes constitutes your acceptance of the modified Terms. We
                  recommend reviewing this page periodically.
                </p>
              </div>

              {/* 10. Contact */}
              <div>
                <h2 className="heading-2 mb-4">10. Contact</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions or comments about these Terms of Service, you
                  can contact us through:
                </p>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>
                    <strong>Company:</strong> Mr.BnB
                  </li>
                  <li>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:clientes@mrbnb.cl" className="text-[#1e3a5f] font-semibold hover:underline">
                      clientes@mrbnb.cl
                    </a>
                  </li>
                  <li>
                    <strong>Location:</strong> Santiago, Chile
                  </li>
                </ul>
              </div>

              {/* Divider and link */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-gray-500 text-sm">
                  Also see our{' '}
                  <Link href="/politica-privacidad" className="text-[#1e3a5f] font-semibold hover:underline">
                    Privacy Policy
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
