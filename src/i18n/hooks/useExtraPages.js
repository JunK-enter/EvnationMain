'use client'

import { useMemo } from 'react'
import {
  ArrowLeftRight,
  BadgeCheck,
  BatteryCharging,
  Bolt,
  Building2,
  Car,
  Clock,
  FileCheck,
  Gauge,
  Headphones,
  Home,
  Leaf,
  HeartHandshake,
  Plug,
  RefreshCw,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  Thermometer,
  TrendingDown,
  Users,
  Wallet,
  Wrench,
  Zap,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LocaleProvider'
import { POWERWALL_IMAGES } from '@/data/powerwallContent'
import { STANDARD_HOME_CHARGERS, BIDIRECTIONAL_HOME_CHARGERS } from '@/data/homeChargers'
import { ALTERNATIVE_HOME_BATTERIES } from '@/data/homeBatteries'
import { PRICING } from '@/data/services'

export function useAboutCopy() {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      eyebrow: t('about.eyebrow'),
      title: t('about.title'),
      titleAccent: t('about.titleAccent'),
      subtitle: t('about.subtitle'),
      whoWeAre: t('about.whoWeAre'),
      whoP1: t('about.whoP1'),
      whoP2: t('about.whoP2'),
      stats: [
        { value: '2,000+', label: t('about.stat1') },
        { value: t('about.stat2Value'), label: t('about.stat2') },
        { value: t('about.stat3Value'), label: t('about.stat3') },
        { value: 'C10', label: t('about.stat4') },
      ],
      values: [
        { icon: Leaf, title: t('about.value1Title'), text: t('about.value1Text') },
        { icon: ShieldCheck, title: t('about.value2Title'), text: t('about.value2Text') },
        { icon: HeartHandshake, title: t('about.value3Title'), text: t('about.value3Text') },
        { icon: BatteryCharging, title: t('about.value4Title'), text: t('about.value4Text') },
      ],
      valuesTitle: t('about.valuesTitle'),
      teamTitle: t('about.teamTitle'),
      visitUs: t('about.visitUs'),
      ctaTitle: t('about.readyElectric'),
      ctaDesc: t('about.freeEstimateDesc'),
      ctaButton: t('about.freeEstimate'),
      readBlog: t('about.readBlog'),
    }),
    [t],
  )
}

export function useEVChargerCopy() {
  const { t } = useTranslation()
  return useMemo(() => {
    const prefix = 'evCharger'
    return {
      hero: {
        badge: t(`${prefix}.hero.badge`),
        from: t(`${prefix}.hero.from`),
        title: t(`${prefix}.hero.title`),
        titleAccent: t(`${prefix}.hero.titleAccent`),
        subtitle: t(`${prefix}.hero.subtitle`),
        getQuote: t(`${prefix}.hero.getQuote`),
        seeChargers: t(`${prefix}.hero.seeChargers`),
        overlay: t(`${prefix}.hero.overlay`),
        imageAlt: t(`${prefix}.hero.imageAlt`),
        price: PRICING.l2Charger.label.replace('From ', ''),
      },
      metrics: ['m1', 'm2', 'm3', 'm4'].map((k) => ({
        value: t(`${prefix}.metrics.${k}.value`),
        label: t(`${prefix}.metrics.${k}.label`),
      })),
      valueProps: [
        { icon: Gauge, ...pick(t, `${prefix}.valueProps.v1`) },
        { icon: Shield, ...pick(t, `${prefix}.valueProps.v2`) },
        { icon: Sparkles, ...pick(t, `${prefix}.valueProps.v3`) },
      ],
      chargers: {
        eyebrow: t(`${prefix}.chargers.eyebrow`),
        title: t(`${prefix}.chargers.title`),
        subtitle: t(`${prefix}.chargers.subtitle`),
        quoteThis: t(`${prefix}.chargers.quoteThis`),
        list: STANDARD_HOME_CHARGERS,
      },
      included: {
        eyebrow: t(`${prefix}.included.eyebrow`),
        title: t(`${prefix}.included.title`),
        items: [
          { icon: Zap, text: t(`${prefix}.included.i1`) },
          { icon: Gauge, text: t(`${prefix}.included.i2`) },
          { icon: Wrench, text: t(`${prefix}.included.i3`) },
          { icon: Shield, text: t(`${prefix}.included.i4`) },
          { icon: FileCheck, text: t(`${prefix}.included.i5`) },
          { icon: Clock, text: t(`${prefix}.included.i6`) },
        ],
      },
      steps: {
        eyebrow: t(`${prefix}.steps.eyebrow`),
        title: t(`${prefix}.steps.title`),
        items: ['s1', 's2', 's3', 's4'].map((k, i) => ({
          n: String(i + 1),
          title: t(`${prefix}.steps.${k}.title`),
          desc: t(`${prefix}.steps.${k}.desc`),
        })),
      },
      faq: {
        title: t(`${prefix}.faq.title`),
        items: ['q1', 'q2', 'q3'].map((k) => ({
          q: t(`${prefix}.faq.${k}.q`),
          a: t(`${prefix}.faq.${k}.a`),
        })),
      },
      cta: {
        title: t(`${prefix}.cta.title`),
        desc: t(`${prefix}.cta.desc`),
        getQuote: t(`${prefix}.cta.getQuote`),
        contact: t(`${prefix}.cta.contact`),
      },
      brands: STANDARD_HOME_CHARGERS.map((c) => c.brand),
    }
  }, [t])
}

export function useBiDirectionalCopy() {
  const { t } = useTranslation()
  return useMemo(() => {
    const prefix = 'biDirectional'
    return {
      hero: {
        badge: t(`${prefix}.hero.badge`),
        level2Link: t(`${prefix}.hero.level2Link`),
        title: t(`${prefix}.hero.title`),
        titleAccent: t(`${prefix}.hero.titleAccent`),
        subtitle: t(`${prefix}.hero.subtitle`),
        getQuote: t(`${prefix}.hero.getQuote`),
        seeHardware: t(`${prefix}.hero.seeHardware`),
        overlay: t(`${prefix}.hero.overlay`),
        imageAlt: t(`${prefix}.hero.imageAlt`),
      },
      metrics: ['m1', 'm2', 'm3', 'm4'].map((k) => ({
        value: t(`${prefix}.metrics.${k}.value`),
        label: t(`${prefix}.metrics.${k}.label`),
      })),
      valueProps: [
        { icon: Home, ...pick(t, `${prefix}.valueProps.v1`) },
        { icon: ArrowLeftRight, ...pick(t, `${prefix}.valueProps.v2`) },
        { icon: Shield, ...pick(t, `${prefix}.valueProps.v3`) },
      ],
      explainer: {
        eyebrow: t(`${prefix}.explainer.eyebrow`),
        title: t(`${prefix}.explainer.title`),
        intro: t(`${prefix}.explainer.intro`),
        compare: {
          normalTitle: t(`${prefix}.explainer.compare.normalTitle`),
          normalDesc: t(`${prefix}.explainer.compare.normalDesc`),
          v2hTitle: t(`${prefix}.explainer.compare.v2hTitle`),
          v2hDesc: t(`${prefix}.explainer.compare.v2hDesc`),
        },
        stepsTitle: t(`${prefix}.explainer.stepsTitle`),
        steps: ['s1', 's2', 's3', 's4'].map((k, i) => ({
          n: String(i + 1),
          title: t(`${prefix}.explainer.steps.${k}.title`),
          desc: t(`${prefix}.explainer.steps.${k}.desc`),
        })),
        powershareTitle: t(`${prefix}.explainer.powershareTitle`),
        powershareBody: t(`${prefix}.explainer.powershareBody`),
        stats: ['st1', 'st2', 'st3'].map((k) => ({
          value: t(`${prefix}.explainer.stats.${k}.value`),
          label: t(`${prefix}.explainer.stats.${k}.label`),
        })),
        needsTitle: t(`${prefix}.explainer.needsTitle`),
        needs: ['n1', 'n2', 'n3', 'n4'].map((k) => t(`${prefix}.explainer.needs.${k}`)),
        note: t(`${prefix}.explainer.note`),
      },
      chargers: {
        eyebrow: t(`${prefix}.chargers.eyebrow`),
        title: t(`${prefix}.chargers.title`),
        subtitle: t(`${prefix}.chargers.subtitle`),
        quoteThis: t(`${prefix}.chargers.quoteThis`),
        disclaimer: t(`${prefix}.chargers.disclaimer`),
        list: BIDIRECTIONAL_HOME_CHARGERS,
      },
      included: {
        eyebrow: t(`${prefix}.included.eyebrow`),
        title: t(`${prefix}.included.title`),
        items: [
          { icon: ArrowLeftRight, text: t(`${prefix}.included.i1`) },
          { icon: Home, text: t(`${prefix}.included.i2`) },
          { icon: Shield, text: t(`${prefix}.included.i3`) },
          { icon: FileCheck, text: t(`${prefix}.included.i4`) },
          { icon: Zap, text: t(`${prefix}.included.i5`) },
          { icon: Clock, text: t(`${prefix}.included.i6`) },
        ],
      },
      steps: {
        eyebrow: t(`${prefix}.steps.eyebrow`),
        title: t(`${prefix}.steps.title`),
        items: ['s1', 's2', 's3', 's4'].map((k, i) => ({
          n: String(i + 1),
          title: t(`${prefix}.steps.${k}.title`),
          desc: t(`${prefix}.steps.${k}.desc`),
        })),
      },
      faq: {
        title: t(`${prefix}.faq.title`),
        items: ['q1', 'q2', 'q3', 'q4', 'q5'].map((k) => ({
          q: t(`${prefix}.faq.${k}.q`),
          a: t(`${prefix}.faq.${k}.a`),
        })),
      },
      cta: {
        title: t(`${prefix}.cta.title`),
        desc: t(`${prefix}.cta.desc`),
        getQuote: t(`${prefix}.cta.getQuote`),
        contact: t(`${prefix}.cta.contact`),
      },
      brands: BIDIRECTIONAL_HOME_CHARGERS.map((c) => c.brand),
    }
  }, [t])
}

function pick(t, base) {
  return { title: t(`${base}.title`), desc: t(`${base}.desc`) }
}

export function usePanelUpgradeCopy() {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      hero: {
        badge: t('panelUpgrade.hero.badge'),
        title: t('panelUpgrade.hero.title'),
        description: t('panelUpgrade.hero.description'),
        getQuote: t('panelUpgrade.hero.getQuote'),
        price: PRICING.panelUpgrade.label,
        imageAlt: t('panelUpgrade.hero.imageAlt'),
      },
      programs: {
        eyebrow: t('panelUpgrade.programs.eyebrow'),
        title: t('panelUpgrade.programs.title'),
        intro: t('panelUpgrade.programs.intro'),
        stats: ['stat1', 'stat2', 'stat3'].map((k) => ({
          value: t(`panelUpgrade.programs.${k}Value`),
          label: t(`panelUpgrade.programs.${k}Label`),
          desc: t(`panelUpgrade.programs.${k}Desc`),
        })),
        note: t('panelUpgrade.programs.note'),
      },
      beforeAfter: {
        eyebrow: t('panelUpgrade.beforeAfter.eyebrow'),
        title: t('panelUpgrade.beforeAfter.title'),
        dragHint: t('panelUpgrade.beforeAfter.dragHint'),
        meterMain: t('panelUpgrade.beforeAfter.meterMain'),
        breakerPanel: t('panelUpgrade.beforeAfter.breakerPanel'),
        galleryLink: t('panelUpgrade.beforeAfter.galleryLink'),
        gallery: t('panelUpgrade.beforeAfter.gallery'),
      },
      whyUpgrade: {
        eyebrow: t('panelUpgrade.whyUpgrade.eyebrow'),
        title: t('panelUpgrade.whyUpgrade.title'),
        intro: t('panelUpgrade.whyUpgrade.intro'),
        reasonsTitle: t('panelUpgrade.whyUpgrade.reasonsTitle'),
        reasons: ['r1', 'r2', 'r3', 'r4'].map((k) => t(`panelUpgrade.whyUpgrade.reasons.${k}`)),
        benefitsTitle: t('panelUpgrade.whyUpgrade.benefitsTitle'),
        benefits: ['b1', 'b2', 'b3', 'b4'].map((k) => t(`panelUpgrade.whyUpgrade.benefits.${k}`)),
      },
      features: {
        title: t('panelUpgrade.features.title'),
        items: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'].map((k) => t(`panelUpgrade.features.${k}`)),
      },
    }),
    [t],
  )
}

export function useSolarCopy() {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      layout: {
        eyebrow: t('solar.eyebrow'),
        title: t('solar.title'),
        highlight: t('solar.highlight'),
        description: t('solar.description'),
        tagline: t('solar.tagline'),
        imageAlt: t('solar.imageAlt'),
        primaryCta: { to: '/quote', label: t('solar.primaryCta') },
        secondaryCta: { to: '/contact', label: t('solar.secondaryCta') },
        stats: ['s1', 's2', 's3'].map((k) => ({
          value: t(`solar.stats.${k}.value`),
          label: t(`solar.stats.${k}.label`),
        })),
        features: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'].map((k) => t(`solar.features.${k}`)),
      },
      whySolar: {
        title: t('solar.whySolar.title'),
        items: [
          { icon: Sun, ...pick(t, 'solar.whySolar.w1') },
          { icon: BatteryCharging, ...pick(t, 'solar.whySolar.w2') },
          { icon: Zap, ...pick(t, 'solar.whySolar.w3') },
          { icon: TrendingDown, ...pick(t, 'solar.whySolar.w4') },
        ],
      },
    }),
    [t],
  )
}

export function useWarrantyCopy() {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      layout: {
        badge: t('warranty.badge'),
        title: t('warranty.title'),
        highlight: t('warranty.highlight'),
        description: t('warranty.description'),
        tagline: t('warranty.tagline'),
        imageAlt: t('warranty.imageAlt'),
        stats: ['s1', 's2', 's3', 's4'].map((k) => ({
          value: t(`warranty.stats.${k}.value`),
          label: t(`warranty.stats.${k}.label`),
        })),
        features: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'].map((k) => t(`warranty.features.${k}`)),
      },
      tiers: {
        eyebrow: t('warranty.tiers.eyebrow'),
        title: t('warranty.tiers.title'),
        items: [
          { icon: BadgeCheck, ...pickTier(t, 'warranty.tiers.t1') },
          { icon: Wrench, ...pickTier(t, 'warranty.tiers.t2') },
          { icon: Headphones, ...pickTier(t, 'warranty.tiers.t3') },
          { icon: RefreshCw, ...pickTier(t, 'warranty.tiers.t4') },
        ],
      },
    }),
    [t],
  )
}

function pickTier(t, base) {
  return { title: t(`${base}.title`), desc: t(`${base}.desc`) }
}

export function useBatteryCopy() {
  const { t } = useTranslation()
  return useMemo(() => {
    const spIcons = [Home, Wallet, BatteryCharging, ShieldCheck, Car]
    const spKeys = ['sp1', 'sp2', 'sp3', 'sp4', 'sp5']
    return {
      hero: {
        pageTitle: t('battery.hero.pageTitle'),
        badge: t('battery.hero.badge'),
        from: t('battery.hero.from'),
        title: t('battery.hero.title'),
        tagline: t('battery.hero.tagline'),
        description: t('battery.hero.description'),
        getQuote: t('battery.hero.getQuote'),
        seeFeatures: t('battery.hero.seeFeatures'),
        otherBrands: t('battery.hero.otherBrands'),
        overlay: t('battery.hero.overlay'),
        imageAlt: t('battery.hero.imageAlt'),
        allBrandsLabel: t('battery.hero.allBrandsLabel'),
        specsLabel: t('battery.hero.specsLabel'),
        price: PRICING.teslaPowerwall.label.replace('From ', ''),
      },
      metrics: ['m1', 'm2', 'm3', 'm4'].map((k) => ({
        value: t(`battery.metrics.${k}.value`),
        unit: t(`battery.metrics.${k}.unit`),
        label: t(`battery.metrics.${k}.label`),
      })),
      pillars: {
        title: t('battery.pillars.title'),
        items: ['p1', 'p2', 'p3'].map((k) => ({
          label: t(`battery.pillars.${k}.label`),
          desc: t(`battery.pillars.${k}.desc`),
        })),
      },
      stories: {
        title: t('battery.stories.title'),
        subtitle: t('battery.stories.subtitle'),
        items: ['s1', 's2', 's3'].map((k, i) => ({
          id: ['backup', 'savings', 'integrated'][i],
          index: t(`battery.stories.${k}.index`),
          title: t(`battery.stories.${k}.title`),
          body: t(`battery.stories.${k}.body`),
          imageAlt: t(`battery.stories.${k}.imageAlt`),
          image: [POWERWALL_IMAGES.storyBackup, POWERWALL_IMAGES.storySavings, POWERWALL_IMAGES.storyIntegrated][i],
          imageFit: i === 2 ? 'contain' : 'cover',
        })),
      },
      sellingPoints: {
        sectionLabel: t('battery.sellingPoints.sectionLabel'),
        title: t('battery.sellingPoints.title'),
        subtitle: t('battery.sellingPoints.subtitle'),
        items: spKeys.map((k, i) => ({
          id: ['backup', 'savings', 'integrated', 'durable', 'ev'][i],
          icon: spIcons[i],
          title: t(`battery.sellingPoints.${k}.title`),
          summary: t(`battery.sellingPoints.${k}.summary`),
          bullets: ['b1', 'b2', 'b3'].map((b) => t(`battery.sellingPoints.${k}.${b}`)),
        })),
      },
      evFeatures: ['e1', 'e2', 'e3'].map((k, i) => ({
        icon: [Sun, Plug, Bolt][i],
        title: t(`battery.evFeatures.${k}.title`),
        desc: t(`battery.evFeatures.${k}.desc`),
      })),
      install: {
        eyebrow: t('battery.install.eyebrow'),
        title: t('battery.install.title'),
        subtitle: t('battery.install.subtitle'),
        exampleLabel: t('battery.install.exampleLabel'),
        includedEyebrow: t('battery.install.includedEyebrow'),
        includedTitle: t('battery.install.includedTitle'),
        includes: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'].map((k) => t(`battery.install.${k}`)),
        startQuote: t('battery.install.startQuote'),
        howItWorks: t('battery.install.howItWorks'),
        stepLabel: (n) => t('battery.install.stepLabel', { n }),
        steps: ['s1', 's2', 's3', 's4'].map((k, i) => ({
          step: String(i + 1).padStart(2, '0'),
          title: t(`battery.install.${k}.title`),
          desc: t(`battery.install.${k}.desc`),
        })),
      },
      otherBatteries: {
        eyebrow: t('battery.otherBatteries.eyebrow'),
        title: t('battery.otherBatteries.title'),
        subtitle: t('battery.otherBatteries.subtitle'),
        photoSoon: t('battery.otherBatteries.photoSoon'),
        quoteBrand: (brand) => t('battery.otherBatteries.quoteBrand', { brand }),
        list: ALTERNATIVE_HOME_BATTERIES,
      },
      faq: {
        title: t('battery.faq.title'),
        subtitle: t('battery.faq.subtitle'),
        items: ['q1', 'q2', 'q3', 'q4', 'q5'].map((k) => ({
          q: t(`battery.faq.${k}.q`),
          a: t(`battery.faq.${k}.a`),
        })),
      },
      cta: {
        title: t('battery.cta.title'),
        desc: t('battery.cta.desc'),
        getQuote: t('battery.cta.getQuote'),
        contact: t('battery.cta.contact'),
        trademark: t('battery.cta.trademark'),
      },
      images: POWERWALL_IMAGES,
    }
  }, [t])
}

export function useAutoDealerCopy() {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      hero: {
        eyebrow: t('autoDealer.hero.eyebrow'),
        title: t('autoDealer.hero.title'),
        titleAccent: t('autoDealer.hero.titleAccent'),
        subtitle: t('autoDealer.hero.subtitle'),
      },
      benefits: [
        { icon: Car, ...pickBenefit(t, 'autoDealer.benefits.b1') },
        { icon: Users, ...pickBenefit(t, 'autoDealer.benefits.b2') },
        { icon: TrendingDown, ...pickBenefit(t, 'autoDealer.benefits.b3') },
        { icon: Building2, ...pickBenefit(t, 'autoDealer.benefits.b4') },
      ],
      steps: {
        title: t('autoDealer.steps.title'),
        items: ['s1', 's2', 's3', 's4'].map((k) => ({
          step: t(`autoDealer.steps.${k}.step`),
          title: t(`autoDealer.steps.${k}.title`),
          text: t(`autoDealer.steps.${k}.text`),
        })),
      },
      form: {
        title: t('autoDealer.form.title'),
        dealership: t('autoDealer.form.dealership'),
        dealershipPlaceholder: t('autoDealer.form.dealershipPlaceholder'),
        contactName: t('autoDealer.form.contactName'),
        contactPlaceholder: t('autoDealer.form.contactPlaceholder'),
        email: t('autoDealer.form.email'),
        emailPlaceholder: t('autoDealer.form.emailPlaceholder'),
        phone: t('autoDealer.form.phone'),
        phonePlaceholder: t('autoDealer.form.phonePlaceholder'),
        submit: t('autoDealer.form.submit'),
        successTitle: t('autoDealer.form.successTitle'),
        successDesc: t('autoDealer.form.successDesc'),
        preferTalk: t('autoDealer.form.preferTalk'),
        orCall: t('autoDealer.form.orCall'),
        contactLink: t('autoDealer.form.contactLink'),
      },
    }),
    [t],
  )
}

function pickBenefit(t, base) {
  return { title: t(`${base}.title`), text: t(`${base}.text`) }
}

export function useServiceAreasCopy(counties, cities) {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      eyebrow: t('serviceAreas.hero.eyebrow'),
      title: t('serviceAreas.hero.title'),
      titleAccent: t('serviceAreas.hero.titleAccent'),
      subtitle: t('serviceAreas.hero.subtitle', { counties, cities }),
      getQuote: t('serviceAreas.hero.getQuote'),
      contact: t('serviceAreas.hero.contact'),
    }),
    [t, counties, cities],
  )
}

export function useCountyCopy(county) {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      backLink: t('county.backLink'),
      title: t('county.title', { county: county.name, state: county.state }),
      getQuote: t('county.getQuote'),
      evServices: t('county.evServices'),
      citiesHeading: t('county.citiesHeading', { county: county.name }),
      citiesMeta: t('county.citiesMeta', { count: county.cities.length }),
      related: [
        { href: '/residential-ev-charging', ...pick(t, 'county.related.ev') },
        { href: '/panel-upgrades', ...pick(t, 'county.related.panel') },
        { href: '/solar', ...pick(t, 'county.related.solar') },
      ],
    }),
    [t, county],
  )
}

export function useLegalCopy(type) {
  const { t } = useTranslation()
  return useMemo(() => {
    const base = `legal.${type}`
    const sectionKeys = type === 'terms'
      ? ['s1', 's2', 's3', 's4', 's5', 's6', 's7']
      : ['s1', 's2', 's3', 's4', 's5', 's6']
    return {
      eyebrow: t(`${base}.eyebrow`),
      title: t(`${base}.title`),
      lastUpdated: t(`${base}.lastUpdated`),
      intro: t(`${base}.intro`),
      sections: sectionKeys.map((k) => {
        const heading = t(`${base}.${k}.heading`)
        const paragraphs = []
        for (let i = 1; i <= 6; i += 1) {
          const p = t(`${base}.${k}.p${i}`)
          if (!p || p.startsWith('legal.')) break
          paragraphs.push(p)
        }
        return { heading, paragraphs }
      }),
      disclaimer: t('legal.disclaimerFooter'),
      disclaimerContact: t('legal.disclaimerContact'),
    }
  }, [t, type])
}

export function useBlogCopy(region, articleCount, date) {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      badge: t('blog.badge', { region }),
      title: t('blog.title'),
      titleAccent: t('blog.titleAccent'),
      subtitle: t('blog.subtitle'),
      articlesMeta: t('blog.articlesMeta', { count: articleCount, date }),
      loading: t('blog.loading'),
      newPost: t('blog.newPost'),
      manage: t('blog.manage'),
      signOut: t('blog.signOut'),
      editorSignIn: t('blog.editorSignIn'),
      latestStories: t('blog.latestStories'),
      emptyCategory: t('blog.emptyCategory'),
      ctaTitle: t('blog.ctaTitle'),
      ctaDesc: t('blog.ctaDesc'),
      ctaButton: t('blog.ctaButton'),
      editorTitle: t('blog.editorTitle'),
      close: t('blog.close'),
      allCategory: t('blog.allCategory'),
    }),
    [t, region, articleCount, date],
  )
}

export function useSitemapCopy() {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      eyebrow: t('sitemap.eyebrow'),
      title: t('sitemap.title'),
      subtitle: t('sitemap.subtitle'),
      blogArticles: t('sitemap.blogArticles'),
      groups: {
        main: t('sitemap.groups.main'),
        services: t('sitemap.groups.services'),
        serviceAreas: t('sitemap.groups.serviceAreas'),
        company: t('sitemap.groups.company'),
        internal: t('sitemap.groups.internal'),
      },
      links: {
        home: t('sitemap.links.home'),
        getQuote: t('sitemap.links.getQuote'),
        gallery: t('sitemap.links.gallery'),
        contact: t('sitemap.links.contact'),
        residentialEv: t('sitemap.links.residentialEv'),
        biDirectional: t('sitemap.links.biDirectional'),
        solar: t('sitemap.links.solar'),
        panelUpgrades: t('sitemap.links.panelUpgrades'),
        commercial: t('sitemap.links.commercial'),
        battery: t('sitemap.links.battery'),
        warranty: t('sitemap.links.warranty'),
        shop: t('sitemap.links.shop'),
        allServiceAreas: t('sitemap.links.allServiceAreas'),
        orangeCounty: t('sitemap.links.orangeCounty'),
        losAngeles: t('sitemap.links.losAngeles'),
        sanDiego: t('sitemap.links.sanDiego'),
        clarkCounty: t('sitemap.links.clarkCounty'),
        sanLuisObispo: t('sitemap.links.sanLuisObispo'),
        about: t('sitemap.links.about'),
        autoDealer: t('sitemap.links.autoDealer'),
        blog: t('sitemap.links.blog'),
        customerIntake: t('sitemap.links.customerIntake'),
        adminIntake: t('sitemap.links.adminIntake'),
        siteMap: t('sitemap.links.siteMap'),
      },
    }),
    [t],
  )
}

export function useProjectsCopy(count) {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      heroEyebrow: t('projects.heroEyebrow', { count }),
      heroTitle1: t('projects.heroTitle1'),
      heroTitle2: t('projects.heroTitle2'),
      heroDesc: t('projects.heroDesc'),
      getSimilarQuote: t('projects.getSimilarQuote'),
      index: t('projects.index'),
      emptyCategory: t('projects.emptyCategory'),
      ctaTitle: t('projects.ctaTitle'),
      startProject: t('projects.startProject'),
      serviceAreas: t('projects.serviceAreas'),
      types: {
        all: t('projects.types.all'),
        ev: t('projects.types.ev'),
        panel: t('projects.types.panel'),
        solar: t('projects.types.solar'),
        commercial: t('projects.types.commercial'),
      },
    }),
    [t, count],
  )
}

export function useAIAssistantCopy() {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      title: t('aiAssistant.title'),
      subtitle: t('aiAssistant.subtitle'),
      closeChat: t('aiAssistant.closeChat'),
      openAssistant: t('aiAssistant.openAssistant'),
      closeAssistant: t('aiAssistant.closeAssistant'),
      thinking: t('aiAssistant.thinking'),
      sendMessage: t('aiAssistant.sendMessage'),
      placeholder: t('aiAssistant.placeholder'),
      welcome: {
        text: t('aiAssistant.welcome'),
        links: [{ label: t('aiAssistant.welcomeLink'), href: '/quote' }],
      },
      prompts: ['p1', 'p2', 'p3', 'p4'].map((k) => t(`aiAssistant.prompts.${k}`)),
    }),
    [t],
  )
}
