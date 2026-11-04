/**
 * Centralized Event Configuration & Data Store
 * Customize your event details, speakers, agenda, and ticket tiers here.
 */

const EVENT_CONFIG = {
  name: "NEXUS Tech Summit 2027",
  shortName: "NEXUS '27",
  tagline: "The Future of AI, Cloud & Intelligent Systems",
  description: "Join 3,500+ engineers, product leaders, researchers, and founders for three days of immersive keynotes, deep-dive technical workshops, and high-impact networking.",
  
  // Set date for the live countdown (YYYY-MM-DDTHH:MM:SS)
  // Configured into the future for an active countdown
  targetDate: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000).toISOString(),
  dateDisplay: "October 14-16, 2027",
  timeDisplay: "09:00 AM - 06:30 PM PST",
  
  venue: {
    name: "Metropolitan Convention Center",
    hall: "Grand Horizon Auditorium & Expo Hall A-D",
    address: "747 Howard Street, San Francisco, CA 94103",
    city: "San Francisco, CA",
    virtualOption: "Virtual Global Stream (4K Interactive)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086307135084!2d-122.40366762361664!3d37.78393397198305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858087d3a040b1%3A0x6b4f3bfa6f5a34f0!2sMoscone%20Center!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
  },

  stats: [
    { value: "3,500+", label: "Global Attendees" },
    { value: "65+", label: "World-Class Speakers" },
    { value: "3", label: "Immersive Days" },
    { value: "48+", label: "Hands-on Sessions" }
  ],

  ticketTiers: [
    {
      id: "virtual",
      name: "Virtual Pass",
      badge: "Global Access",
      price: 99,
      originalPrice: 149,
      description: "Full digital live stream, interactive Q&A, and on-demand session recordings.",
      features: [
        "Live 4K Stream of all 3 Tracks",
        "Interactive Speaker Q&A & Polls",
        "Discord Community & Networking Lounge",
        "6-Month On-Demand Video Access",
        "Digital Certificate of Attendance"
      ],
      popular: false,
      available: 500
    },
    {
      id: "general",
      name: "Standard Conference Pass",
      badge: "Most Popular",
      price: 499,
      originalPrice: 699,
      description: "Full in-person access to all keynotes, breakout tracks, expo hall, and official afterparty.",
      features: [
        "Full in-person access to Days 1-3",
        "Entry to Keynotes & 4 Breakout Tracks",
        "Daily Catered Lunch & Coffee Breaks",
        "Access to Innovation Expo & Sponsor Booths",
        "Official Welcome Reception & Day 2 Afterparty",
        "Conference Swag Kit & Badge"
      ],
      popular: true,
      available: 320
    },
    {
      id: "vip",
      name: "VIP Executive All-Access",
      badge: "Ultimate Experience",
      price: 1199,
      originalPrice: 1499,
      description: "The complete VIP experience with private speaker salon access, front-row reserved seating, and exclusive VIP dinner.",
      features: [
        "Everything included in Standard Pass",
        "Front-Row Reserved Keynote Seating",
        "Private VIP Lounge with Bar & Workstations",
        "Exclusive VIP & Speakers Dinner at SF MoMA",
        "Hands-On Masterclass Workshop Access",
        "Expedited VIP Registration & Concierge",
        "Lifetime On-Demand Video Library"
      ],
      popular: false,
      available: 45
    }
  ],

  speakers: [
    {
      id: 1,
      name: "Dr. Elena Rostova",
      role: "VP of Artificial Intelligence",
      company: "NeuralMatrix Labs",
      bio: "Pioneer in multimodal foundation models and autonomous agent alignment. Formerly Chief Scientist at DeepTech Systems.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      featured: true,
      tag: "Keynote",
      topic: "The Autonomous Agent Revolution: Beyond LLMs",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com"
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "Head of Infrastructure & Cloud",
      company: "Hyperscale Cloud",
      bio: "Architecting distributed systems handling over 100M queries per second. Author of 'Designing Resilient Distributed Engines'.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      featured: true,
      tag: "Infrastructure",
      topic: "Edge AI & Real-Time Distributed Inference",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com"
    },
    {
      id: 3,
      name: "Aisha Chen",
      role: "Chief Product Officer",
      company: "Synthetix AI",
      bio: "Leads product strategy for generative interfaces used by over 20M creative developers worldwide. Forbes 30 Under 30.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      featured: true,
      tag: "Product & UX",
      topic: "Designing Generative UI: From Static Screens to Fluid Canvas",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com"
    },
    {
      id: 4,
      name: "Devon Thorne",
      role: "Chief Information Security Officer",
      company: "CyberShield Global",
      bio: "Specializing in post-quantum cryptography and supply chain security for mission-critical defense and cloud infrastructures.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      featured: false,
      tag: "Security",
      topic: "Zero-Trust Architectures in the Era of Quantum Computing",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com"
    },
    {
      id: 5,
      name: "Priya Nair",
      role: "Director of Engineering",
      company: "Aether Robotics",
      bio: "Leading humanoid robotics perception and reinforcement learning algorithms at Aether. IEEE Senior Member.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
      featured: false,
      tag: "Robotics",
      topic: "Physical Intelligence: Embodied AI and Sensor Fusion",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com"
    },
    {
      id: 6,
      name: "Kofi Mensah",
      role: "Founder & General Partner",
      company: "VentureFront Capital",
      bio: "Early-stage investor in 14 unicorns spanning developer tooling, open source AI, and next-gen data platforms.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      featured: false,
      tag: "Venture & Startups",
      topic: "State of Tech 2027: Where the Next Trillion-Dollar Startups Live",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com"
    }
  ],

  schedule: {
    day1: {
      date: "Thursday, October 14, 2027",
      theme: "Foundation Day: AI Breakthroughs & Large Models",
      sessions: [
        {
          id: "s101",
          time: "08:30 - 09:30 AM",
          title: "Registration, Breakfast & Networking Expo",
          stage: "Main Atrium",
          track: "General",
          speaker: null,
          description: "Pick up your physical smart badge, enjoy barista coffee, and meet early attendees."
        },
        {
          id: "s102",
          time: "09:30 - 10:45 AM",
          title: "Opening Keynote: The Autonomous Agent Revolution",
          stage: "Grand Auditorium",
          track: "Keynote",
          speaker: "Dr. Elena Rostova",
          company: "NeuralMatrix Labs",
          description: "How next-generation reasoning architectures and tool-using agents are restructuring enterprise automation."
        },
        {
          id: "s103",
          time: "11:00 - 12:15 PM",
          title: "Edge AI & Real-Time Distributed Inference",
          stage: "Stage B (Cloud)",
          track: "Infrastructure",
          speaker: "Marcus Vance",
          company: "Hyperscale Cloud",
          description: "Technical deep-dive on sub-10ms model execution across 250+ global edge nodes."
        },
        {
          id: "s104",
          time: "12:15 - 01:30 PM",
          title: "Networking Lunch & Startup Demo Showcase",
          stage: "Dining Pavilion & Expo",
          track: "Networking",
          speaker: null,
          description: "Gourmet lunch provided. Explore 40+ early-stage startup booths."
        },
        {
          id: "s105",
          time: "01:30 - 02:45 PM",
          title: "Designing Generative UI: From Static Screens to Fluid Canvas",
          stage: "Stage C (Design)",
          track: "Product & UX",
          speaker: "Aisha Chen",
          company: "Synthetix AI",
          description: "Best practices for building interfaces that generate dynamically based on user intent."
        },
        {
          id: "s106",
          time: "03:00 - 04:30 PM",
          title: "Hands-on Workshop: Building Agentic Workflows with Antigravity",
          stage: "Workshop Lab 1",
          track: "Workshop",
          speaker: "Technical Lead Team",
          company: "NEXUS Core",
          description: "Bring your laptop! Build an autonomous multi-agent pipeline from scratch."
        },
        {
          id: "s107",
          time: "05:00 - 07:30 PM",
          title: "Opening Night Welcome Reception & Craft Beer Social",
          stage: "Rooftop Terrace",
          track: "Social",
          speaker: null,
          description: "Complimentary drinks, live DJ, and sunset networking overlooking San Francisco."
        }
      ]
    },
    day2: {
      date: "Friday, October 15, 2027",
      theme: "Architecture & Scale: Infrastructure & Security",
      sessions: [
        {
          id: "s201",
          time: "09:00 - 10:15 AM",
          title: "Zero-Trust Architectures in the Era of Quantum Computing",
          stage: "Grand Auditorium",
          track: "Security",
          speaker: "Devon Thorne",
          company: "CyberShield Global",
          description: "Migrating enterprise cryptography to NIST-standardized post-quantum algorithms."
        },
        {
          id: "s202",
          time: "10:30 - 11:45 AM",
          title: "Physical Intelligence: Embodied AI and Sensor Fusion",
          stage: "Stage B (Robotics)",
          track: "Robotics",
          speaker: "Priya Nair",
          company: "Aether Robotics",
          description: "Bridging the gap between software vision-language-action models and physical hardware."
        },
        {
          id: "s203",
          time: "12:00 - 01:15 PM",
          title: "Lunch & Diversity in Tech Roundtable",
          stage: "Dining Pavilion",
          track: "Community",
          speaker: null,
          description: "Curated lunchtime discussions focused on building inclusive engineering cultures."
        },
        {
          id: "s204",
          time: "01:30 - 02:45 PM",
          title: "State of Tech 2027: Where the Next Trillion-Dollar Startups Live",
          stage: "Grand Auditorium",
          track: "Venture & Startups",
          speaker: "Kofi Mensah",
          company: "VentureFront Capital",
          description: "Macro-economic trends, capital deployment patterns, and the frontier tech landscape."
        },
        {
          id: "s205",
          time: "03:15 - 04:45 PM",
          title: "Interactive Panel: The Future of Developer Tools",
          stage: "Stage B",
          track: "Keynote",
          speaker: "Panel of Industry CTOs",
          company: "Various",
          description: "How AI pair programming and autonomous code reviewers are reshaping the engineering team."
        },
        {
          id: "s206",
          time: "08:00 - 11:30 PM",
          title: "NEXUS Official Afterparty & Concert",
          stage: "Mezzanine Club SF",
          track: "Social",
          speaker: null,
          description: "Exclusive concert, open bar, light shows, and immersive art installations."
        }
      ]
    },
    day3: {
      date: "Saturday, October 16, 2027",
      theme: "The Frontier: Hackathon Pitches, Quantum & Closing Gala",
      sessions: [
        {
          id: "s301",
          time: "09:30 - 11:30 AM",
          title: "Global Hackathon Live Pitch Finale ($100k Prize Pool)",
          stage: "Grand Auditorium",
          track: "Hackathon",
          speaker: "Top 8 Finalist Teams",
          company: "Global",
          description: "Live 5-minute pitches from the top builders judged by top venture partners and engineering leaders."
        },
        {
          id: "s302",
          time: "11:45 - 01:00 PM",
          title: "Ethics, Governance & Open Source: The Path Forward",
          stage: "Stage B",
          track: "Keynote",
          speaker: "Dr. Elena Rostova & Guest Panel",
          company: "Open Alignment Alliance",
          description: "Navigating open weights, safety regulations, and global access to frontier intelligence."
        },
        {
          id: "s303",
          time: "01:00 - 02:30 PM",
          title: "Closing Banquet & Awards Ceremony",
          stage: "Grand Ballroom",
          track: "General",
          speaker: null,
          description: "Celebrating the community, announcing hackathon winners, and unveiling NEXUS 2028."
        }
      ]
    }
  },

  sponsors: [
    { name: "Google Cloud", tier: "Platinum", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
    { name: "NVIDIA", tier: "Platinum", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
    { name: "AWS", tier: "Gold", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "Microsoft Azure", tier: "Gold", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
    { name: "Stripe", tier: "Silver", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { name: "GitHub", tier: "Silver", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
    { name: "Docker", tier: "Silver", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
    { name: "Vercel", tier: "Community", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg" }
  ],

  faqs: [
    {
      q: "What is included with my conference pass?",
      a: "All in-person tickets grant access to keynote sessions, breakout tracks, the Innovation Expo hall, daily catered meals and coffee breaks, our networking lounges, and the opening reception. VIP tickets also include access to the VIP Lounge, private speaker dinner, and reserved seating."
    },
    {
      q: "Can I transfer or refund my ticket?",
      a: "Tickets can be transferred to a colleague free of charge at any time up to 48 hours before the event starts through your attendee dashboard. Full refunds are available up to 30 days prior to the event."
    },
    {
      q: "Will the sessions be recorded?",
      a: "Yes! All keynotes and breakout tracks are recorded in high-definition 4K. Ticket holders (both in-person and virtual) will receive exclusive on-demand video access within 48 hours of each session."
    },
    {
      q: "Are there student, academic, or group discounts?",
      a: "Yes! We offer 50% discounts for verified full-time students and academic researchers, as well as 20% discounts for company groups of 5 or more. Reach out to tickets@nexussummit.io with your credentials."
    },
    {
      q: "How do I check in and receive my physical badge?",
      a: "After registering, you will receive a Digital Ticket Pass with a unique QR code. Simply show this QR code on your phone or printed paper at the registration desks at the venue for instant contactless badge printing."
    }
  ]
};

// Seed sample attendees for demonstration if none exist in LocalStorage
function getStoredAttendees() {
  const local = localStorage.getItem("nexus_attendees");
  if (local) {
    try {
      return JSON.parse(local);
    } catch(e) {
      console.error("Failed to parse local attendees", e);
    }
  }

  // Initial seed attendees
  const sampleAttendees = [
    {
      id: "NEX-884920",
      fullName: "Sarah Jenkins",
      email: "sarah.j@techventures.io",
      company: "Apex Systems",
      jobTitle: "Senior Staff Engineer",
      ticketTier: "general",
      ticketName: "Standard Conference Pass",
      amountPaid: 499,
      registeredAt: "2027-08-12T14:22:00Z",
      checkedIn: true,
      checkedInAt: "2027-10-14T08:45:00Z"
    },
    {
      id: "NEX-391048",
      fullName: "Alex Rivera",
      email: "arivera@cloudscale.net",
      company: "CloudScale Inc",
      jobTitle: "VP of Product",
      ticketTier: "vip",
      ticketName: "VIP Executive All-Access",
      amountPaid: 1199,
      registeredAt: "2027-08-14T09:15:00Z",
      checkedIn: false,
      checkedInAt: null
    },
    {
      id: "NEX-771239",
      fullName: "Maya Lin",
      email: "m.lin@berkeley.edu",
      company: "UC Berkeley AI Lab",
      jobTitle: "PhD Researcher",
      ticketTier: "virtual",
      ticketName: "Virtual Pass",
      amountPaid: 99,
      registeredAt: "2027-08-20T16:40:00Z",
      checkedIn: false,
      checkedInAt: null
    },
    {
      id: "NEX-502914",
      fullName: "David Sterling",
      email: "d.sterling@fintechfrontier.com",
      company: "Fintech Frontier",
      jobTitle: "Chief Technology Officer",
      ticketTier: "vip",
      ticketName: "VIP Executive All-Access",
      amountPaid: 1199,
      registeredAt: "2027-08-25T11:05:00Z",
      checkedIn: true,
      checkedInAt: "2027-10-14T08:52:00Z"
    }
  ];

  localStorage.setItem("nexus_attendees", JSON.stringify(sampleAttendees));
  return sampleAttendees;
}

function saveAttendee(attendee) {
  const list = getStoredAttendees();
  list.unshift(attendee);
  localStorage.setItem("nexus_attendees", JSON.stringify(list));
  return list;
}
