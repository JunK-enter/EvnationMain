import LegalLayout from '../components/LegalLayout'

const sections = [
  {
    heading: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or using the EVnation website and services, you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.',
    ],
  },
  {
    heading: '2. Services',
    paragraphs: [
      'EVnation provides EV charger and solar installation services, estimates, and related consultation as a licensed C10 Electrical Contractor. All estimates are provided for informational purposes and final pricing is subject to a site assessment.',
      'Scheduling, permitting, and installation timelines may vary based on local jurisdiction requirements, utility coordination, and equipment availability.',
    ],
  },
  {
    heading: '3. Estimates & Financing',
    paragraphs: [
      'Savings estimates, tax credit information, and financing terms (including advertised rates such as 2.99%) are illustrative and depend on individual eligibility, credit approval, and current program availability. EVnation does not guarantee specific financial outcomes.',
    ],
  },
  {
    heading: '4. Customer Responsibilities',
    paragraphs: [
      'Customers are responsible for providing accurate information about their property, electrical system, and vehicle, and for ensuring safe access to the installation area. Inaccurate information may affect pricing and scheduling.',
    ],
  },
  {
    heading: '5. Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, EVnation shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our total liability shall not exceed the amount paid for the specific service in question.',
    ],
  },
  {
    heading: '6. Changes to These Terms',
    paragraphs: [
      'EVnation reserves the right to update these Terms & Conditions at any time. Continued use of our services after changes are posted constitutes acceptance of the revised terms.',
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      lastUpdated="June 2026"
      intro="Please read these Terms & Conditions carefully before using the EVnation website or engaging our services."
      sections={sections}
    />
  )
}
