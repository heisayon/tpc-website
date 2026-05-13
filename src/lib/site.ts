import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BookOpen,
  Camera,
  Church,
  Clock3,
  Flame,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Mic2,
  Music2,
  School,
  UsersRound,
} from "lucide-react";

export const site = {
  name: "Teens Prayer Conference",
  shortName: "TPC",
  tagline: "Intimacy SZN.",
  description:
    "TPC is a prayer and discipleship programme for teenagers and young adults who want to know God for themselves and carry fire into everyday life.",
  location: "Nigeria",
  email: "teensprayerconference@gmail.com",
  instagram: "https://instagram.com/teensprayerconference",
  instagramHandle: "@teensprayerconference",
  whatsappDisplay: "+234 807 981 99851",
  whatsapp: "https://wa.me/23480798199851",
  logo: "/images/brand/tpc-logo.png",
  supportLink: "https://paystack.shop/pay/-u4sj3xlav",
  storeLink: "https://teensprayerconference1.bumpa.shop",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/conference" },
  { label: "Register", href: "/register" },
  { label: "Merch", href: "/merch" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

export const heroImages = {
  main: "/images/moments/tpc-prayer-black-white.jpg",
  room: "/images/moments/tpc-room-worship.jpg",
  joy: "/images/moments/tpc-joy-circle.jpg",
  teaching: "/images/moments/tpc-teaching-circle.jpg",
};

export const pillars = [
  {
    icon: Flame,
    title: "Prayer that remains",
    text: "Not just a moment in the room, but a life that keeps returning to God when nobody is watching.",
  },
  {
    icon: BookOpen,
    title: "The Word",
    text:  "We do not use Scripture as decoration. We sit with it, learn it, and let it shape us.",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    text: "Young people burn longer when they are not burning alone. TPC continues beyond the meeting."
  },
  {
    icon: UsersRound,
    title: "Service with heart",
    text: "Every chair, camera, call, prayer, and welcome matters. The work is ministry too.",
  },
];

export const stats = [
  { value: "Mar-Aug", label: "2026 movement calendar" },
  { value: "Teens +", label: "young adults welcome" },
  { value: "Free", label: "conference attendance" },
];

export type ScheduleStatus = "past" | "closed" | "open" | "team" | "pending";

export type ScheduleItem = {
  slug: string;
  month: string;
  title: string;
  label: string;
  status: ScheduleStatus;
  description: string;
  registerHref?: string;
  enquiryHref?: string;
  icon: LucideIcon;
};

export const schedule: ScheduleItem[] = [
  {
    slug: "march",
    month: "MAR",
    title: "Worship Evening",
    label: "Completed",
    status: "past",
    description:
      "The year opened with worship. No big speech, just young people making room for God.",
    icon: Music2,
  },
  {
    slug: "april",
    month: "APR",
    title: "4 Hours Prayer Stretch",
    label: "Completed",
    status: "past",
    description:
      "Four hours before God. Long enough for noise to settle and hunger to become honest.",
    icon: Clock3,
  },
  {
    slug: "may",
    month: "MAY",
    title: "Secondary School Outreach",
    label: "Enquiries",
    status: "team",
    enquiryHref: site.whatsapp,
    description:
      "This is handled through direct enquiries. If your school wants to connect, message the team.",
    icon: School,
  },
  {
    slug: "june",
    month: "JUN",
    title: "Creator's Conf",
    label: "Register now",
    status: "open",
    registerHref: "/register",
    description:
      "For young people who want skill without losing fire. Create well. Think clearly. Build with God in view.",
    icon: GraduationCap,
  },
  {
    slug: "july",
    month: "JUL",
    title: "Volunteers Prayer Meeting",
    label: "Volunteers only",
    status: "team",
    enquiryHref: site.whatsapp,
    description:
      "Strictly for volunteers. Before people see the room, the team carries it in prayer.",
    icon: HandHeart,
  },
  {
    slug: "august",
    month: "AUG",
    title: "TPC 2026: Birthing",
    label: "Registration not open",
    status: "pending",
    registerHref: "/register",
    description:
      "Birthing: A Call to Intimacy. The main TPC gathering is for everyone hungry to know God closely.",
    icon: Flame,
  },
];

export const registrationEvents = [
  {
    slug: "june",
    title: "Creator's Conf",
    month: "June",
    status: "Open now",
    href: "/register",
  },
  {
    slug: "august",
    title: "TPC 2026: Birthing",
    month: "August",
    status: "Registration not open",
    href: "/register",
  },
];

export const creatorSkills = [
  "Content Creation & Media",
  "Tech & Digital Skills",
  "Fashion & Beauty",
  "Business & Entrepreneurship",
  "Creative & Handcraft Skills",
  "Communication & Leadership",
];

export const registrationOptions = [
  {
    icon: BadgeCheck,
    title: "Come as you are",
    text: "You do not need perfect words for what you want from God. Just come sincerely.",
  },
  {
    icon: Church,
    title: "Bring a group",
    text: "Parents, youth pastors, schools, churches, and fellowships can bring young people together.",
  },
  {
    icon: HandHeart,
    title: "Serve with the team",
    text: "Volunteers pray, arrive early, stay late, and help make room for others to meet God.",
  },
];

export const merchProducts = [
  {
    image: "/images/merch/official-birthn-hands.jpg",
    name: "Birthing: A Call to Intimacy",
    price: "NGN 6,000",
    tag: "Official merch",
    featured: true,
    description: "The hand-to-hand design carries the 2026 theme.",
  },
  {
    image: "/images/merch/birthn-front.jpg",
    name: "Birthn Wordmark Tee",
    price: "NGN 6,000",
    tag: "Preview",
    featured: false,
    description: "A clean Birthn wordmark option for anyone who wants something minimal and direct.",
  },
  {
    image: "/images/merch/tpc-motion.jpg",
    name: "TPC Motion Tee",
    price: "NGN 6,000",
    tag: "Preview",
    featured: false,
    description: "A movement-inspired print on black and white shirts.",
  },
  {
    image: "/images/merch/birthn-szn.jpg",
    name: "Birthn SZN Tee",
    price: "NGN 6,000",
    tag: "Preview",
    featured: false,
    description: "A louder type-driven shirt for the ones who want the message clear.",
  },
  {
    image: "/images/merch/tpc-bolt.jpg",
    name: "TPC Bolt Tee",
    price: "NGN 6,000",
    tag: "Preview",
    featured: false,
    description: "Simple, sharp, and easy to wear beyond the programme.",
  },
  {
    image: "/images/merch/locked-in.jpg",
    name: "Stay Locked In With God",
    price: "NGN 6,000",
    tag: "Preview",
    featured: false,
    description: "For regular days, not only conference days.",
  },
  {
    image: "/images/merch/birth-impact.jpg",
    name: "We Don't Play",
    price: "NGN 6,000",
    tag: "Preview",
    featured: false,
    description: "A bold statement piece from the wider TPC shirt family.",
  },
];

export const galleryImages = [
  {
    src: "/images/moments/tpc-prayer-black-white.jpg",
    label: "Prayer in the room",
    span: "md:col-span-2",
  },
  {
    src: "/images/moments/tpc-room-worship.jpg",
    label: "The room alive",
    span: "",
  },
  {
    src: "/images/moments/tpc-joy-circle.jpg",
    label: "Joy after prayer",
    span: "",
  },
  {
    src: "/images/moments/tpc-band.jpg",
    label: "Worship",
    span: "",
  },
  {
    src: "/images/moments/tpc-teaching-circle.jpg",
    label: "Teaching circles",
    span: "md:col-span-2",
  },
  {
    src: "/images/moments/tpc-word-session.jpg",
    label: "Listening for truth",
    span: "",
  },
];

export const volunteerTeams = [
  {
    icon: UsersRound,
    name: "Protocol and Hosting",
    text: "Welcoming people like they matter, because they do.",
  },
  {
    icon: Camera,
    name: "Media and Content",
    text: "Capturing the real moments without turning the room into a show.",
  },
  {
    icon: Mic2,
    name: "Sound and Technicals",
    text: "Helping the Word, worship, and prayer land clearly from behind the scenes.",
  },
  {
    icon: Flame,
    name: "Prayer Team",
    text: "Praying before anybody walks through the door.",
  },
  {
    icon: HandHeart,
    name: "Welfare",
    text: "Noticing the tired, the hungry, the confused, and the first-timers.",
  },
  {
    icon: MessageCircle,
    name: "Follow-up",
    text: "Checking in after the altar moment. Discipleship needs care.",
  },
];

export const supportUses = [
  "Secure spaces where young people can gather and pray.",
  "Provide welfare, media, materials, and event support.",
  "Keep TPC accessible for teenagers who may not be able to afford much.",
  "Follow up after the meeting, not just celebrate what happened in it.",
];

export const contacts = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Send us a message",
    href: site.whatsapp,
    note: "For volunteering, outreach enquiries, groups, and quick questions.",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Send us a mail",
    href: `mailto:${site.email}`,
    note: "For partnerships, invitations, and anything that needs a clear thread.",
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.location,
    href: "/conference",
    note: "Venue details will be announced with each programme.",
  },
];

export const faqs = [
  {
    q: "Who is TPC for?",
    a: "Teenagers and young adults who want to know God sincerely. Parents, youth leaders, schools, and churches can also bring groups.",
  },
  {
    q: "What registrations are open?",
    a: "Creator's Conf is open now. TPC 2026 registration has not commenced yet.",
  },
  {
    q: "What about Secondary School Outreach?",
    a: "School outreach is handled by enquiry, not registration. Message the team on WhatsApp.",
  },
  {
    q: "Where do I buy merch?",
    a: "This site previews the shirts. Orders should go through the Bumpa store.",
  },
  {
    q: "Can I support without a fixed amount?",
    a: "Yes. Support is optional and open-hearted. Give what you are led to give, or reach out if you want to support in another way.",
  },
];
