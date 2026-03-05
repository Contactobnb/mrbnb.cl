import Link from 'next/link'

export default function PrivacyContentEN() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Your privacy is important to us. Learn how we collect,
              use and protect your personal data.
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

              {/* 1. Introduction */}
              <div>
                <h2 className="heading-2 mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Mr.BnB (hereinafter, &quot;the Company&quot;) is committed to protecting the
                  privacy of users of its website mrbnb.cl (hereinafter, &quot;the Site&quot;).
                  This Privacy Policy describes how we collect, use, store and protect
                  the personal information you provide to us, in compliance with Chilean
                  Law No. 19,628 on the Protection of Private Life.
                </p>
              </div>

              {/* 2. Data we collect */}
              <div>
                <h2 className="heading-2 mb-4">2. Data we collect</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We collect the following personal data when you interact with our Site,
                  whether through contact forms, property evaluations or other features:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Property neighborhood or location</li>
                  <li>Property information (type, number of bedrooms, square meters, among others)</li>
                  <li>Any additional information you voluntarily provide in contact forms</li>
                </ul>
              </div>

              {/* 3. How we use your data */}
              <div>
                <h2 className="heading-2 mb-4">3. How we use your data</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the collected information exclusively for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Respond to your inquiries and contact requests</li>
                  <li>Perform property evaluations requested by you</li>
                  <li>Send you relevant information about our services, provided you have given your consent</li>
                  <li>Send notifications related to the status of your request or property</li>
                  <li>Improve the quality of our website and services</li>
                  <li>Comply with applicable legal obligations</li>
                </ul>
              </div>

              {/* 4. Data access */}
              <div>
                <h2 className="heading-2 mb-4">4. Data access</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your personal data is treated confidentially and only authorized members
                  of the Mr.BnB team who need it to fulfill the purposes described in this
                  policy have access to it. We do not sell, rent or share your personal
                  information with third parties, except when required by law or by a
                  competent authority.
                </p>
              </div>

              {/* 5. Cookies and tracking technologies */}
              <div>
                <h2 className="heading-2 mb-4">5. Cookies and tracking technologies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our Site uses cookies and similar technologies to improve your browsing
                  experience. In particular, we use:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                  <li>
                    <strong>Google Analytics:</strong> To collect anonymous information about
                    how visitors use our Site, including pages visited, time spent and traffic
                    source. This information helps us improve the content and functionality
                    of the Site.
                  </li>
                  <li>
                    <strong>Functional cookies:</strong> Necessary for the proper functioning
                    of the Site.
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  You can configure your browser to reject cookies or to notify you when
                  a cookie is sent. However, some features of the Site may not function
                  properly if you disable cookies.
                </p>
              </div>

              {/* 6. Data retention */}
              <div>
                <h2 className="heading-2 mb-4">6. Data retention</h2>
                <p className="text-gray-600 leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill
                  the purposes for which it was collected, or as required by applicable
                  legislation. Once your data is no longer needed, it will be securely
                  deleted or anonymized.
                </p>
              </div>

              {/* 7. Your rights */}
              <div>
                <h2 className="heading-2 mb-4">7. Your rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  In accordance with Chilean Law No. 19,628 on the Protection of Private
                  Life, you have the following rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                  <li>
                    <strong>Right of access:</strong> Request information about the personal
                    data we hold about you.
                  </li>
                  <li>
                    <strong>Right of rectification:</strong> Request the correction of
                    inaccurate or incomplete data.
                  </li>
                  <li>
                    <strong>Right of deletion:</strong> Request the deletion of your personal
                    data when it is no longer necessary for the purposes for which it was
                    collected.
                  </li>
                  <li>
                    <strong>Right of objection:</strong> Object to the processing of your
                    personal data in certain circumstances.
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  To exercise any of these rights, you can contact us via email at{' '}
                  <a href="mailto:felipe@mrbnb.cl" className="text-[#1e3a5f] font-semibold hover:underline">
                    felipe@mrbnb.cl
                  </a>
                  . We will respond to your request within the timeframes established by law.
                </p>
              </div>

              {/* 8. Security */}
              <div>
                <h2 className="heading-2 mb-4">8. Data security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement reasonable technical and organizational security measures to
                  protect your personal data against unauthorized access, alteration,
                  disclosure or destruction. However, no data transmission over the Internet
                  or storage system is completely secure, so we cannot guarantee the absolute
                  security of your information.
                </p>
              </div>

              {/* 9. Changes */}
              <div>
                <h2 className="heading-2 mb-4">9. Changes to this policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify this Privacy Policy at any time. Any
                  changes will be published on this page with the date of last update.
                  We recommend that you review this policy periodically to stay informed
                  about how we protect your data.
                </p>
              </div>

              {/* 10. Contact */}
              <div>
                <h2 className="heading-2 mb-4">10. Contact</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions, comments or requests related to this Privacy
                  Policy or the processing of your personal data, you can contact us
                  through:
                </p>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>
                    <strong>Company:</strong> Mr.BnB
                  </li>
                  <li>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:felipe@mrbnb.cl" className="text-[#1e3a5f] font-semibold hover:underline">
                      felipe@mrbnb.cl
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
                  <Link href="/terminos" className="text-[#1e3a5f] font-semibold hover:underline">
                    Terms of Service
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
