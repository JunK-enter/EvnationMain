import LegalLayout from '../components/LegalLayout'

const sections = [
  {
    heading: '1. Information We Collect',
    paragraphs: [
      'We collect information you provide directly to us, such as your name, phone number, email, home address, vehicle details, and installation preferences when you request an estimate, submit a customer intake form, or contact us.',
      'We may also collect limited technical information automatically, such as browser type and pages visited, to improve our website experience.',
    ],
  },
  {
    heading: '2. How We Use Your Information',
    paragraphs: [
      'We use your information to provide estimates, schedule and complete installations, process financing and rebate applications, communicate with you, and improve our services. We may share information with trusted installation and financing partners solely to fulfill your request.',
    ],
  },
  {
    heading: '3. How We Share Information',
    paragraphs: [
      'We do not sell your personal information. We share data only with service partners (such as solar installers, financing providers, and utility rebate programs) as needed to deliver the services you request, or when required by law.',
    ],
  },
  {
    heading: '4. Data Security',
    paragraphs: [
      'We implement reasonable administrative, technical, and physical safeguards to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    heading: '5. Your Choices',
    paragraphs: [
      'You may request access to, correction of, or deletion of your personal information at any time by contacting us. You may also opt out of marketing communications by following the unsubscribe instructions in our emails.',
    ],
  },
  {
    heading: '6. Contact Us',
    paragraphs: [
      'If you have questions about this Privacy Policy or how we handle your data, contact us at GoGreen@evnation.us or 866-913-6199.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="June 2026"
      intro="Your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have."
      sections={sections}
    />
  )
}
