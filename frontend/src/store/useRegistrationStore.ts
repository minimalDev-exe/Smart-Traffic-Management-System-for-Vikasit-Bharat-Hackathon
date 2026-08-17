import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TeamLead, TeamMember } from '../types';

export interface ThemeInfo {
  id: string;
  name: string;
  category: string;
  problemStatement: string;
  expectedSolution: string;
  description: string;
  guidelines: string[];
  sampleDeliverables: string[];
}

export const THEME_DETAILS: Record<string, ThemeInfo> = {
  'Smart City': {
    id: 'smart-city',
    name: 'Smart City',
    category: 'Urban Infrastructure & Mobility',
    problemStatement:
      'Uneven distribution of traffic over planning authorities’ jurisdictions leading to localized gridlocks and uncoordinated signal systems.',
    expectedSolution:
      'Simulation to create an intelligent traffic management command center during morning peak (9:00 AM – 12:00 PM) and evening peak (4:00 PM – 7:00 PM) with cross-authority load balancing and AI signal optimization.',
    description:
      'Develop real-time simulation algorithms, spatial congestion heatmaps, dynamic signal timing controllers, and cross-jurisdiction routing engines to rebalance metropolitan traffic flow.',
    guidelines: [
      'Model peak commuter influx during 09:00 - 12:00 and 16:00 - 19:00.',
      'Quantify cross-jurisdictional imbalance using deterministic metrics.',
      'Simulate actionable intervention strategies (signal retiming, rerouting, green wave).',
      'Provide before vs after statistical verification of throughput, delay, and CO2 emissions.',
    ],
    sampleDeliverables: [
      'Interactive GIS traffic map with authority boundaries',
      'Real-time traffic telemetry and timeline scrubber',
      'Deterministic Imbalance Score engine',
      'AI strategy optimizer with live impact comparison',
    ],
  },
  'Healthcare & MedTech': {
    id: 'medtech',
    name: 'Healthcare & MedTech',
    category: 'Digital Health & Emergency Response',
    problemStatement:
      'Emergency medical response delays and disparate hospital ICU bed allocation during urban mass casualty incidents.',
    expectedSolution:
      'Real-time triage simulation and dynamic ambulance green-corridor routing platform with inter-hospital resource balancing.',
    description:
      'Build a predictive emergency response coordination system that synchronizes ambulance dispatch with live traffic signal priority.',
    guidelines: [
      'Integrate real-time hospital occupancy telemetry.',
      'Simulate golden-hour transit times for emergency vehicles.',
      'Optimize ambulance dispatch across multiple municipal zones.',
    ],
    sampleDeliverables: [
      'Emergency green corridor map',
      'Hospital ICU bed availability dashboard',
      'Patient triage dispatch coordinator',
    ],
  },
  'Agriculture & Rural Development': {
    id: 'agritech',
    name: 'Agriculture & Rural Development',
    category: 'Agritech & Supply Chain',
    problemStatement:
      'Post-harvest crop wastage caused by unoptimized farm-to-mandi logistics routes and siloed cold-storage capacity.',
    expectedSolution:
      'Geo-spatial perishables logistics optimizer and real-time cold storage availability network across rural districts.',
    description:
      'Deploy algorithmic supply chain load balancing to ensure perishable crops reach processing hubs before shelf-life expiration.',
    guidelines: [
      'Model transit degradation for perishable produce.',
      'Optimize multi-depot vehicle routing over rural road networks.',
      'Provide district-level surplus vs deficit analytics.',
    ],
    sampleDeliverables: [
      'Rural transit route optimizer',
      'Cold storage capacity map',
      'Perishable commodity pricing index',
    ],
  },
  'FinTech & Cybersecurity': {
    id: 'fintech',
    name: 'FinTech & Cybersecurity',
    category: 'Financial Networks & Security',
    problemStatement:
      'High latency and vulnerability in high-frequency cross-border payment routing across heterogenous banking jurisdictions.',
    expectedSolution:
      'Zero-trust cryptographic transaction routing simulator with real-time liquidity imbalance detection.',
    description:
      'Simulate dynamic liquidity corridors and automated anti-fraud network anomaly detection.',
    guidelines: [
      'Simulate high-throughput transaction bursts.',
      'Detect artificial liquidity bottlenecks in settlement rails.',
      'Demonstrate automated fraud isolation mechanisms.',
    ],
    sampleDeliverables: [
      'Cross-border liquidity flow visualizer',
      'Anomaly detection neural monitor',
      'Compliance & latency audit log',
    ],
  },
  'Clean & Green Tech': {
    id: 'greentech',
    name: 'Clean & Green Tech',
    category: 'Renewable Energy & Sustainability',
    problemStatement:
      'Grid instability and power curtailment from localized solar/wind microgrid generation imbalances across urban substations.',
    expectedSolution:
      'Predictive smart-grid load balancer with decentralized battery energy storage dispatch algorithms.',
    description:
      'Simulate microgrid frequency regulation and dynamic electric vehicle (EV) fleet charging load distribution.',
    guidelines: [
      'Model intermittent renewable generation curves.',
      'Optimize substation transformer thermal limits.',
      'Simulate peak-shaving through coordinated EV charging.',
    ],
    sampleDeliverables: [
      'Substation load distribution map',
      'Renewable generation forecast chart',
      'Dynamic battery dispatch scheduler',
    ],
  },
};

interface RegistrationState {
  step: number;
  theme: string;
  teamName: string;
  teamLead: TeamLead;
  members: TeamMember[];
  isThemeModalOpen: boolean;
  isSubmitting: boolean;
  registrationResult: {
    id: string;
    workspaceReady: boolean;
    submittedAt: string;
  } | null;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTheme: (theme: string) => void;
  setTeamName: (name: string) => void;
  updateTeamLead: (field: keyof TeamLead, value: string) => void;
  addMember: () => void;
  updateMember: (id: string, field: keyof TeamMember, value: string) => void;
  removeMember: (id: string) => void;
  toggleThemeModal: (open?: boolean) => void;
  submitRegistration: () => Promise<boolean>;
  resetForm: () => void;
}

const DEFAULT_TEAM_LEAD: TeamLead = {
  fullName: 'Arjun Sharma',
  email: 'arjun.sharma@innovate.edu',
  phone: '+91 98765 43210',
  collegeOrgId: 'MIT-BLR-2024-889',
};

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: 'mem-1',
    fullName: 'Priya Venkatesh',
    email: 'priya.v@innovate.edu',
    role: 'Simulation & GIS Engineer',
  },
  {
    id: 'mem-2',
    fullName: 'Rohan Deshmukh',
    email: 'rohan.d@innovate.edu',
    role: 'AI / Optimization Algorithms',
  },
];

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set, get) => ({
      step: 1,
      theme: 'Smart City',
      teamName: 'Team UrbanFlow AI',
      teamLead: DEFAULT_TEAM_LEAD,
      members: DEFAULT_MEMBERS,
      isThemeModalOpen: false,
      isSubmitting: false,
      registrationResult: null,

      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: Math.min(3, state.step + 1) })),
      prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
      setTheme: (theme) => set({ theme }),
      setTeamName: (teamName) => set({ teamName }),

      updateTeamLead: (field, value) =>
        set((state) => ({
          teamLead: { ...state.teamLead, [field]: value },
        })),

      addMember: () => {
        const { members } = get();
        if (members.length >= 4) return;
        const newMember: TeamMember = {
          id: `mem-${Date.now()}`,
          fullName: '',
          email: '',
          role: 'Full-Stack Developer',
        };
        set({ members: [...members, newMember] });
      },

      updateMember: (id, field, value) => {
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id ? { ...m, [field]: value } : m
          ),
        }));
      },

      removeMember: (id) => {
        set((state) => ({
          members: state.members.filter((m) => m.id !== id),
        }));
      },

      toggleThemeModal: (open) => {
        set((state) => ({
          isThemeModalOpen:
            open !== undefined ? open : !state.isThemeModalOpen,
        }));
      },

      submitRegistration: async () => {
        set({ isSubmitting: true });

        // Realistic network delay
        await new Promise((res) => setTimeout(res, 800));

        const registrationId = `M4Y-${Math.floor(100000 + Math.random() * 900000)}`;
        const result = {
          id: registrationId,
          workspaceReady: true,
          submittedAt: new Date().toISOString(),
        };

        set({
          isSubmitting: false,
          registrationResult: result,
          step: 3,
        });

        return true;
      },

      resetForm: () => {
        set({
          step: 1,
          theme: 'Smart City',
          teamName: 'Team UrbanFlow AI',
          teamLead: DEFAULT_TEAM_LEAD,
          members: DEFAULT_MEMBERS,
          registrationResult: null,
        });
      },
    }),
    {
      name: 'sadaksense_registration_storage',
    }
  )
);
