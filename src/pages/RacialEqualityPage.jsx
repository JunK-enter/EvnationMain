import LegalLayout from '../components/LegalLayout'

const sections = [
  {
    heading: 'Our Commitment',
    paragraphs: [
      'EVnation is committed to building a more equitable and sustainable future for everyone. We believe that the transition to clean energy must be inclusive, and that the benefits of electrification — cleaner air, lower energy costs, and healthier communities — should be accessible to all, regardless of race, background, or zip code.',
    ],
  },
  {
    heading: 'Equity in Clean Energy',
    paragraphs: [
      'Historically, the benefits of solar and electric infrastructure have not been distributed equally. We are committed to helping close that gap by making transparent estimates, accessible financing, and quality installation available to underserved communities.',
    ],
  },
  {
    heading: 'In Our Workplace',
    paragraphs: [
      'We strive to foster a diverse, inclusive, and respectful workplace where every team member is valued. We do not tolerate discrimination of any kind, and we are committed to equitable hiring, training, and advancement opportunities.',
    ],
  },
  {
    heading: 'In Our Community',
    paragraphs: [
      'We support partnerships and programs that expand access to clean energy and create opportunity in communities that have been historically underserved. We will continue to listen, learn, and improve.',
    ],
  },
  {
    heading: 'Holding Ourselves Accountable',
    paragraphs: [
      'This is an ongoing commitment, not a destination. We welcome feedback from our customers, partners, and community on how we can do better. Reach out to us at GoGreen@evnation.us.',
    ],
  },
]

export default function RacialEqualityPage() {
  return (
    <LegalLayout
      eyebrow="Our Values"
      title="Racial Equality"
      intro="A statement on our commitment to equity, inclusion, and access to clean energy for all communities."
      sections={sections}
    />
  )
}
