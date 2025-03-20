import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, semantic } from '../theme/colors';
import VideoPlayer from '../components/VideoPlayer';
import { Link, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const FinancialEducationScreen = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('modules');
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [activeVideoLevel, setActiveVideoLevel] = useState('beginner');

  // New state variables for points and progress
  const [userPoints, setUserPoints] = useState(0);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const [unlockedLevels, setUnlockedLevels] = useState(['beginner']);

  // Points required to unlock each level
  const levelRequirements = {
    intermediate: 100,
    advanced: 250,
    expert: 500
  };

  // Points awarded for completing content
  const pointsReward = {
    video: 20,
    module: 30
  };

  const educationModules = {
    basics: {
      title: 'Financial Basics',
      lessons: [
        {
          id: '1',
          title: 'Understanding Money',
          description: 'Learn about money, its functions, and value',
          duration: '10 min',
          topics: [
            'What is money?',
            'Functions of money',
            'Types of money',
            'Value of money'
          ]
        },
        {
          id: '2',
          title: 'Budgeting 101',
          description: 'Master the basics of budgeting and financial planning',
          duration: '15 min',
          topics: [
            'Creating a budget',
            'Income and expenses',
            'Tracking spending',
            'Setting financial goals'
          ]
        },
        {
          id: '3',
          title: 'Saving Strategies',
          description: 'Effective ways to save money and build wealth',
          duration: '12 min',
          topics: [
            'Importance of saving',
            'Different types of savings',
            'Setting saving goals',
            'Automating savings'
          ]
        }
      ]
    },
    investment: {
      title: 'Investment Knowledge',
      lessons: [
        {
          id: '4',
          title: 'Investment Basics',
          description: 'Introduction to different investment options',
          duration: '15 min',
          topics: [
            'Types of investments',
            'Risk and return',
            'Diversification',
            'Investment strategies'
          ]
        },
        {
          id: '5',
          title: 'Stock Market Basics',
          description: 'Understanding how the stock market works',
          duration: '20 min',
          topics: [
            'What are stocks?',
            'Stock exchanges',
            'Buying and selling stocks',
            'Market analysis'
          ]
        }
      ]
    },
    credit: {
      title: 'Credit & Loans',
      lessons: [
        {
          id: '6',
          title: 'Understanding Credit',
          description: 'Learn about credit scores and credit management',
          duration: '15 min',
          topics: [
            'What is credit?',
            'Credit scores',
            'Building good credit',
            'Managing credit cards'
          ]
        },
        {
          id: '7',
          title: 'Loan Management',
          description: 'Smart borrowing and loan management strategies',
          duration: '12 min',
          topics: [
            'Types of loans',
            'Interest rates',
            'Loan terms',
            'Repayment strategies'
          ]
        }
      ]
    }
  };

  const moduleCategories = [
    {
      id: 'basics',
      title: 'Financial Basics',
      icon: 'cash-multiple',
      color: '#4F46E5'
    },
    {
      id: 'investment',
      title: 'Investment',
      icon: 'chart-line',
      color: '#059669'
    },
    {
      id: 'credit',
      title: 'Credit & Loans',
      icon: 'credit-card',
      color: '#DC2626'
    }
  ];

  // Module content for each topic
  const moduleContent = {
    emergencyFund: {
      title: "Emergency Fund",
      pages: [
        {
          title: "What is an Emergency Fund?",
          content: "An emergency fund is money you set aside specifically for unexpected expenses or financial emergencies. It acts as a financial safety net to help you avoid going into debt when unexpected costs arise. Think of it as your financial cushion for life's surprises like medical emergencies, car repairs, or job loss. Having this fund gives you peace of mind and financial security.",
        },
        {
          title: "Why Do You Need One?",
          content: "Emergency funds provide financial security and reduce stress during unexpected situations. They help you: \n\n• Avoid high-interest debt and loans\n• Maintain financial stability during job transitions\n• Handle unexpected medical expenses\n• Cover urgent home or vehicle repairs\n• Deal with sudden family emergencies\n• Stay financially independent during crises",
        },
        {
          title: "How Much Should You Save?",
          content: "Most financial experts recommend saving 3-6 months of living expenses. Here's a breakdown:\n\n• Beginner: Start with ₹10,000\n• Intermediate: Build up to 3 months of expenses\n• Advanced: Aim for 6 months of expenses\n• Expert: Consider 12 months for added security\n\nCalculate your monthly expenses including:\n• Rent/Housing\n• Utilities\n• Food\n• Transportation\n• Insurance\n• Other essential bills",
        },
        {
          title: "Where to Keep It?",
          content: "Your emergency fund should be easily accessible but separate from daily spending. Consider these options:\n\n1. High-yield savings account\n• Earns interest\n• Easy access\n• Separate from checking\n\n2. Money market account\n• Higher interest rates\n• Limited withdrawals\n• Minimum balance requirements\n\n3. Short-term fixed deposits\n• Better interest rates\n• Penalty-free early withdrawal options\n• Laddered maturity dates",
        },
        {
          title: "Building Your Fund",
          content: "Follow these steps to build your emergency fund:\n\n1. Set a monthly savings goal\n• Start with 10% of income\n• Increase gradually\n\n2. Automate your savings\n• Set up automatic transfers\n• Time them with paydays\n\n3. Find extra money\n• Cut unnecessary expenses\n• Use windfalls (bonuses, tax returns)\n• Side hustle income\n\n4. Track your progress\n• Use budgeting apps\n• Celebrate milestones\n• Adjust goals as needed",
        },
      ]
    },
    goalSetting: {
      title: "Financial Goal Setting",
      pages: [
        {
          title: "Understanding Financial Goals",
          content: "Financial goals are specific targets you want to achieve with your money. They give direction to your financial decisions and help measure progress. Types of goals include:\n\n• Short-term (1 year or less)\n• Medium-term (1-5 years)\n• Long-term (5+ years)\n\nEach type requires different planning and saving strategies.",
        },
        {
          title: "Setting SMART Goals",
          content: "Use the SMART framework for effective goal setting:\n\nS - Specific: Clear and well-defined\nM - Measurable: Track progress with numbers\nA - Achievable: Realistic within your means\nR - Relevant: Aligned with your values\nT - Time-bound: Set deadlines\n\nExample: Save ₹50,000 for a down payment in 12 months",
        },
        {
          title: "Creating an Action Plan",
          content: "Break down your goals into actionable steps:\n\n1. Calculate required monthly savings\n2. Identify potential obstacles\n3. Create a timeline with milestones\n4. Set up tracking systems\n5. Plan for setbacks\n\nUse tools like spreadsheets or apps to monitor progress and stay motivated.",
        },
        {
          title: "Prioritizing Multiple Goals",
          content: "Balance multiple financial goals effectively:\n\n1. Emergency fund first\n2. High-interest debt reduction\n3. Retirement savings\n4. Other specific goals\n\nConsider:\n• Urgency of each goal\n• Available resources\n• Impact on long-term financial health\n• Risk tolerance",
        },
        {
          title: "Staying on Track",
          content: "Maintain momentum towards your goals:\n\n1. Regular Review\n• Monthly progress checks\n• Quarterly goal assessment\n• Annual planning\n\n2. Adjustments\n• Update goals as needed\n• Revise strategies\n• Account for life changes\n\n3. Motivation\n• Visualize success\n• Share goals with supporters\n• Reward progress milestones",
        },
      ]
    },
    stockMarket: {
      title: "Stock Market Basics",
      pages: [
        {
          title: "Understanding Stocks",
          content: "Stocks represent ownership in a company. When you buy shares, you become a partial owner and can:\n\n• Participate in company growth\n• Earn dividends\n• Vote on company decisions\n• Sell shares for profit\n\nTypes of Stocks:\n• Common stocks\n• Preferred stocks\n• Growth stocks\n• Value stocks\n• Blue-chip stocks",
        },
        {
          title: "How the Market Works",
          content: "Stock markets are regulated exchanges where shares are traded. Key concepts:\n\n1. Market Participants\n• Investors\n• Brokers\n• Market makers\n• Regulators\n\n2. Price Determination\n• Supply and demand\n• Company performance\n• Market sentiment\n• Economic factors\n\n3. Trading Mechanisms\n• Order types\n• Trading sessions\n• Settlement process",
        },
        {
          title: "Market Analysis",
          content: "Two main approaches to analyze stocks:\n\n1. Fundamental Analysis\n• Company financials\n• Industry trends\n• Economic indicators\n• Management quality\n\n2. Technical Analysis\n• Price patterns\n• Trading volume\n• Market indicators\n• Chart analysis\n\nUse both methods for better decision-making.",
        },
        {
          title: "Risk Management",
          content: "Protect your investments through:\n\n1. Diversification\n• Across sectors\n• Different company sizes\n• Geographic regions\n• Asset classes\n\n2. Risk Assessment\n• Market risk\n• Company risk\n• Industry risk\n• Economic risk\n\n3. Position Sizing\n• Portfolio allocation\n• Stop-loss orders\n• Regular rebalancing",
        },
        {
          title: "Getting Started",
          content: "Steps to begin stock market investing:\n\n1. Education\n• Read market news\n• Take online courses\n• Join investor groups\n\n2. Setup\n• Choose a broker\n• Open demat account\n• Link bank account\n\n3. Start Small\n• Begin with blue-chips\n• Use index funds\n• Regular investments\n\n4. Monitor & Learn\n• Track investments\n• Analyze mistakes\n• Keep learning",
        },
      ]
    },
    mutualFunds: {
      title: "Mutual Funds",
      pages: [
        {
          title: "Mutual Fund Basics",
          content: "Mutual funds pool money from multiple investors to invest in diversified portfolios. Benefits include:\n\n• Professional management\n• Diversification\n• Liquidity\n• Convenience\n• Regulatory protection\n\nTypes:\n• Equity funds\n• Debt funds\n• Hybrid funds\n• Index funds\n• Sector funds",
        },
        {
          title: "Types of Mutual Funds",
          content: "Different funds for different goals:\n\n1. Equity Funds\n• Large-cap\n• Mid-cap\n• Small-cap\n• Sector-specific\n\n2. Debt Funds\n• Government securities\n• Corporate bonds\n• Money market\n\n3. Hybrid Funds\n• Balanced funds\n• Monthly income plans\n• Dynamic asset allocation",
        },
        {
          title: "Investment Strategies",
          content: "Choose the right investment approach:\n\n1. Systematic Investment Plan (SIP)\n• Regular investments\n• Rupee cost averaging\n• Long-term wealth building\n\n2. Lump Sum Investment\n• Market timing\n• Large capital deployment\n• Strategic allocation\n\n3. Goal-based Investing\n• Education planning\n• Retirement planning\n• Tax saving",
        },
        {
          title: "Fund Selection",
          content: "Key factors in choosing funds:\n\n1. Performance Metrics\n• Returns history\n• Risk measures\n• Expense ratio\n• Fund size\n\n2. Fund Manager\n• Experience\n• Track record\n• Investment style\n\n3. Portfolio Fit\n• Investment objective\n• Risk tolerance\n• Time horizon\n• Tax efficiency",
        },
        {
          title: "Monitoring & Rebalancing",
          content: "Maintain your mutual fund portfolio:\n\n1. Regular Monitoring\n• Track performance\n• Compare benchmarks\n• Review fund changes\n\n2. Portfolio Rebalancing\n• Annual review\n• Asset allocation\n• Risk adjustment\n\n3. Exit Strategy\n• When to sell\n• Tax implications\n• Reinvestment plans",
        },
      ]
    },
    healthInsurance: {
      title: "Health Insurance",
      pages: [
        {
          title: "Basics of Health Insurance",
          content: "Health insurance protects against medical expenses. Key components:\n\n1. Coverage Types\n• Individual plans\n• Family floater\n• Group insurance\n• Critical illness\n\n2. Benefits\n• Hospitalization coverage\n• Pre/post hospitalization\n• Ambulance charges\n• Preventive care\n\n3. Policy Terms\n• Sum insured\n• Premium payments\n• Waiting periods\n• Network hospitals",
        },
        {
          title: "Types of Coverage",
          content: "Understanding policy features:\n\n1. Basic Coverage\n• In-patient treatment\n• Day care procedures\n• Room rent limits\n• ICU charges\n\n2. Additional Coverage\n• Maternity benefits\n• Dental care\n• Vision care\n• Alternative treatments\n\n3. Add-on Options\n• Personal accident\n• Hospital cash\n• Recovery benefit\n• International coverage",
        },
        {
          title: "Choosing a Plan",
          content: "Factors to consider:\n\n1. Personal Needs\n• Age and health\n• Family size\n• Medical history\n• Lifestyle factors\n\n2. Policy Features\n• Coverage amount\n• Network hospitals\n• Claim settlement ratio\n• Sub-limits\n\n3. Cost Factors\n• Premium affordability\n• Co-payment options\n• Deductibles\n• Long-term costs",
        },
        {
          title: "Claims Process",
          content: "Understanding claims:\n\n1. Cashless Claims\n• Network hospitals\n• Pre-authorization\n• Documentation\n• Settlement time\n\n2. Reimbursement Claims\n• Original bills\n• Medical reports\n• Claim forms\n• Follow-up process\n\n3. Common Rejections\n• Pre-existing conditions\n• Waiting period\n• Policy exclusions\n• Incomplete documents",
        },
        {
          title: "Maximizing Benefits",
          content: "Get the most from your policy:\n\n1. Preventive Care\n• Regular check-ups\n• Health screenings\n• Wellness programs\n\n2. Policy Management\n• Timely renewals\n• Premium payments\n• Policy updates\n\n3. Tax Benefits\n• Section 80D\n• Premium deductions\n• Family coverage\n\n4. Regular Review\n• Coverage adequacy\n• New features\n• Better options",
        },
      ]
    },
    propertyInsurance: {
      title: "Property Insurance",
      pages: [
        {
          title: "Understanding Property Insurance",
          content: "Property insurance protects your real estate investments. Coverage includes:\n\n1. Types of Properties\n• Residential homes\n• Commercial buildings\n• Rental properties\n• Under-construction\n\n2. Basic Coverage\n• Structure damage\n• Natural disasters\n• Fire protection\n• Theft coverage",
        },
        {
          title: "Coverage Types",
          content: "Different protection levels:\n\n1. Standard Coverage\n• Building structure\n• Interior fixtures\n• External structures\n• Basic contents\n\n2. Additional Protection\n• Valuable items\n• Temporary relocation\n• Liability coverage\n• Rent loss\n\n3. Natural Disasters\n• Flood insurance\n• Earthquake coverage\n• Storm protection\n• Lightning damage",
        },
        {
          title: "Policy Selection",
          content: "Choose the right coverage:\n\n1. Value Assessment\n• Property value\n• Contents worth\n• Replacement cost\n• Market value\n\n2. Risk Factors\n• Location risks\n• Construction type\n• Security measures\n• Usage pattern\n\n3. Cost Considerations\n• Premium rates\n• Deductibles\n• Payment options\n• Discounts available",
        },
        {
          title: "Claims Process",
          content: "Handle property claims:\n\n1. Immediate Steps\n• Document damage\n• Emergency repairs\n• Police reports\n• Insurance notification\n\n2. Claim Filing\n• Damage assessment\n• Cost estimates\n• Required documents\n• Timeline compliance\n\n3. Settlement\n• Adjuster inspection\n• Repair quotes\n• Settlement negotiation\n• Payment process",
        },
        {
          title: "Maintenance & Prevention",
          content: "Protect your property:\n\n1. Regular Maintenance\n• Annual inspections\n• Safety upgrades\n• Security systems\n• Documentation\n\n2. Risk Mitigation\n• Fire safety\n• Water damage\n• Theft prevention\n• Weather protection\n\n3. Policy Updates\n• Coverage review\n• Value adjustments\n• New additions\n• Policy renewals",
        },
      ]
    },
    budgeting: {
      title: "Budgeting",
      pages: [
        {
          title: "Budgeting Basics",
          content: "A budget is your financial roadmap. Key elements:\n\n1. Income Tracking\n• Regular salary\n• Additional income\n• Investment returns\n• Other sources\n\n2. Expense Categories\n• Essential needs\n• Lifestyle choices\n• Savings goals\n• Debt payments\n\n3. Budget Types\n• Zero-based budget\n• Envelope system\n• 50/30/20 rule\n• Percentage-based",
        },
        {
          title: "Creating a Budget",
          content: "Step-by-step budget creation:\n\n1. Income Assessment\n• List all income sources\n• Calculate total monthly income\n• Account for variations\n\n2. Expense Tracking\n• Fixed expenses\n• Variable costs\n• Periodic expenses\n• Discretionary spending\n\n3. Goal Setting\n• Short-term needs\n• Long-term planning\n• Emergency fund\n• Debt reduction",
        },
        {
          title: "50/30/20 Rule",
          content: "Budget allocation guide:\n\n1. 50% Needs (₹)\n• Housing\n• Utilities\n• Food\n• Transportation\n• Insurance\n\n2. 30% Wants (₹)\n• Entertainment\n• Dining out\n• Shopping\n• Hobbies\n\n3. 20% Savings (₹)\n• Emergency fund\n• Retirement\n• Investments\n• Debt repayment",
        },
        {
          title: "Tracking Systems",
          content: "Methods to monitor spending:\n\n1. Digital Tools\n• Budgeting apps\n• Spreadsheets\n• Banking apps\n• Expense trackers\n\n2. Manual Systems\n• Receipt collection\n• Expense diary\n• Budget journal\n• Cash envelopes\n\n3. Regular Review\n• Daily tracking\n• Weekly summaries\n• Monthly analysis\n• Quarterly planning",
        },
        {
          title: "Budget Maintenance",
          content: "Keep your budget effective:\n\n1. Regular Updates\n• Income changes\n• New expenses\n• Goal progress\n• Priority shifts\n\n2. Problem Solving\n• Overspending fixes\n• Savings strategies\n• Debt management\n• Emergency handling\n\n3. Long-term Success\n• Habit formation\n• Lifestyle alignment\n• Financial education\n• Support system",
        },
      ]
    },
    creditCards: {
      title: "Credit Cards",
      pages: [
        {
          title: "Credit Card Basics",
          content: "Understanding credit cards:\n\n1. How They Work\n• Credit limit\n• Billing cycle\n• Grace period\n• Interest charges\n\n2. Types of Cards\n• Rewards cards\n• Cashback cards\n• Travel cards\n• Secured cards\n\n3. Key Terms\n• APR\n• Annual fees\n• Credit score impact\n• Minimum payments",
        },
        {
          title: "Smart Usage Guidelines",
          content: "Use credit cards responsibly:\n\n1. Best Practices\n• Pay full balance\n• Stay under limit\n• Track spending\n• Monitor statements\n\n2. Security Measures\n• PIN protection\n• Online safety\n• Fraud monitoring\n• Lost card procedure\n\n3. Avoid Pitfalls\n• Minimum payments trap\n• Late payment fees\n• Cash advances\n• Impulse spending",
        },
        {
          title: "Maximizing Benefits",
          content: "Get the most from your cards:\n\n1. Rewards Programs\n• Points systems\n• Cashback options\n• Travel miles\n• Shopping discounts\n\n2. Additional Benefits\n• Insurance coverage\n• Purchase protection\n• Extended warranty\n• Concierge services\n\n3. Strategic Usage\n• Category bonuses\n• Sign-up bonuses\n• Special offers\n• Partner programs",
        },
        {
          title: "Managing Multiple Cards",
          content: "Handle multiple credit cards:\n\n1. Organization\n• Payment tracking\n• Usage strategy\n• Record keeping\n• Credit utilization\n\n2. Selection Strategy\n• Primary card\n• Backup cards\n• Specific purpose cards\n• Emergency cards\n\n3. Regular Review\n• Benefits comparison\n• Fee assessment\n• Usage patterns\n• Cancellation criteria",
        },
        {
          title: "Building Credit",
          content: "Use cards to build credit:\n\n1. Credit Score Factors\n• Payment history\n• Credit utilization\n• Account age\n• Mix of credit\n\n2. Improvement Strategy\n• Timely payments\n• Low balances\n• Long-term accounts\n• Regular monitoring\n\n3. Problem Resolution\n• Dispute process\n• Credit repair\n• Debt management\n• Professional help",
        },
      ]
    },
    womenEmpowerment: {
      title: "Financial Independence ",
      pages: [
        {
          title: "Understanding Financial Independence",
          content: "Financial independence means having control over your money and making informed decisions. Key aspects include:\n\n• Managing your own bank accounts\n• Understanding your income and expenses\n• Making independent financial decisions\n• Building personal credit history\n• Creating long-term financial security",
        },
        {
          title: "Building Financial Confidence",
          content: "Steps to develop financial confidence:\n\n1. Financial Education\n• Learn basic financial terms\n• Understand banking services\n• Know your rights\n\n2. Money Management\n• Create personal budgets\n• Track expenses\n• Set financial boundaries\n\n3. Decision Making\n• Evaluate financial choices\n• Research before investing\n• Seek professional advice when needed",
        },
        {
          title: "Breaking Financial Barriers",
          content: "Overcome common challenges:\n\n1. Knowledge Gaps\n• Join financial literacy programs\n• Read financial blogs and books\n• Attend money management workshops\n\n2. Cultural Barriers\n• Challenge limiting beliefs\n• Build supportive networks\n• Share experiences with other women\n\n3. Workplace Equality\n• Know your worth\n• Negotiate salary\n• Seek growth opportunities",
        },
        {
          title: "Creating Financial Security",
          content: "Essential steps for security:\n\n1. Emergency Fund\n• Start with small savings\n• Increase gradually\n• Keep funds accessible\n\n2. Insurance Coverage\n• Health insurance\n• Life insurance\n• Disability protection\n\n3. Retirement Planning\n• Start early\n• Regular contributions\n• Diversified investments",
        },
        {
          title: "Building Generational Wealth",
          content: "Create lasting financial impact:\n\n1. Investment Strategies\n• Start with safe investments\n• Diversify portfolio\n• Think long-term\n\n2. Asset Building\n• Property ownership\n• Business investments\n• Educational investments\n\n3. Legacy Planning\n• Estate planning\n• Wealth transfer strategies\n• Teaching financial literacy",
        }
      ]
    },
    womenEntrepreneurship: {
      title: "Women Entrepreneurs Guide",
      pages: [
        {
          title: "Starting Your Business",
          content: "Essential steps for business success:\n\n1. Business Planning\n• Market research\n• Business model\n• Financial projections\n\n2. Legal Requirements\n• Business registration\n• Licenses and permits\n• Tax compliance\n\n3. Funding Options\n• Government schemes\n• Bank loans\n• Angel investors\n• Crowdfunding",
        },
        {
          title: "Financial Management",
          content: "Managing business finances:\n\n1. Basic Accounting\n• Income tracking\n• Expense management\n• Cash flow monitoring\n\n2. Business Banking\n• Separate accounts\n• Payment systems\n• Credit facilities\n\n3. Pricing Strategy\n• Cost analysis\n• Profit margins\n• Market positioning",
        },
        {
          title: "Growth Strategies",
          content: "Scaling your business:\n\n1. Market Expansion\n• New products/services\n• Geographic expansion\n• Online presence\n\n2. Team Building\n• Hiring strategies\n• Training programs\n• Leadership development\n\n3. Technology Integration\n• Digital tools\n• Automation\n• Online marketing",
        },
        {
          title: "Networking & Support",
          content: "Building business relationships:\n\n1. Professional Networks\n• Industry associations\n• Women's business groups\n• Mentorship programs\n\n2. Government Support\n• Women entrepreneur schemes\n• Training programs\n• Financial assistance\n\n3. Business Partnerships\n• Strategic alliances\n• Supplier relationships\n• Customer networks",
        },
        {
          title: "Work-Life Balance",
          content: "Managing business and personal life:\n\n1. Time Management\n• Priority setting\n• Delegation\n• Efficient systems\n\n2. Support Systems\n• Family support\n• Childcare solutions\n• Household management\n\n3. Self-Care\n• Stress management\n• Health priorities\n• Personal development",
        }
      ]
    },
    womenInvesting: {
      title: "Investment Guide for Women",
      pages: [
        {
          title: "Investment Basics",
          content: "Foundation of investing:\n\n1. Investment Types\n• Fixed deposits\n• Mutual funds\n• Stocks\n• Real estate\n\n2. Risk Assessment\n• Risk tolerance\n• Time horizon\n• Financial goals\n\n3. Starting Points\n• Emergency fund first\n• Small, regular investments\n• Diversification basics",
        },
        {
          title: "Investment Strategy",
          content: "Building your portfolio:\n\n1. Goal-Based Investing\n• Short-term needs\n• Children's education\n• Retirement planning\n\n2. Asset Allocation\n• Balancing risk\n• Age-based planning\n• Regular rebalancing\n\n3. Investment Selection\n• Research methods\n• Performance analysis\n• Cost consideration",
        },
        {
          title: "Market Understanding",
          content: "Key market concepts:\n\n1. Market Basics\n• Economic cycles\n• Market indicators\n• Industry trends\n\n2. Analysis Methods\n• Fundamental analysis\n• Technical analysis\n• Market news interpretation\n\n3. Risk Management\n• Diversification strategies\n• Stop-loss orders\n• Regular monitoring",
        },
        {
          title: "Common Challenges",
          content: "Overcoming investment hurdles:\n\n1. Knowledge Gaps\n• Educational resources\n• Professional guidance\n• Learning communities\n\n2. Emotional Aspects\n• Managing fear\n• Avoiding impulse decisions\n• Long-term perspective\n\n3. Time Constraints\n• Automated investing\n• Regular review schedule\n• Professional help",
        },
        {
          title: "Advanced Strategies",
          content: "Taking it to next level:\n\n1. Portfolio Expansion\n• International markets\n• Alternative investments\n• Tax-efficient strategies\n\n2. Wealth Building\n• Compound growth\n• Dividend reinvestment\n• Portfolio optimization\n\n3. Future Planning\n• Estate planning\n• Inheritance management\n• Charitable giving",
        }
      ]
    }
  };

  const videoContent = {
    beginner: [
      {
        id: 'ZW9MzeSZ5tI',
        title: "Understanding Personal Finance",
        channelTitle: "Pranjal Kamra",
        duration: "45 min",
        thumbnail: "https://img.youtube.com/vi/UcAY6qRHlw0/maxresdefault.jpg",
      },
      {
        id: 'Rl9Lw9_xuVg',
        title: "Income & Expense Tracking",
        channelTitle: "Ankur Warikoo",
        duration: "30 min",
        thumbnail: "https://img.youtube.com/vi/v6bx9g-mqyo/maxresdefault.jpg",
      },
      {
        id: 'kxo4mPqPLHI',
        title: "Budgeting Methods: Zero-based & 50/30/20",
        channelTitle: "CA Rachana Ranade",
        duration: "35 min",
        thumbnail: "https://img.youtube.com/vi/jNUbhmB8zw8/maxresdefault.jpg",
      },
      {
        id: 'M9dVG6ezEVk',
        title: "Savings Strategies & Emergency Funds",
        channelTitle: "Labour Law Advisor",
        duration: "40 min",
        thumbnail: "https://img.youtube.com/vi/M9dVG6ezEVk/maxresdefault.jpg",
      },
      {
        id: 'bJACHlcKKgw',
        title: "Understanding Bank Accounts & Credit Score",
        channelTitle: "Akshat Shrivastava",
        duration: "35 min",
        thumbnail: "https://img.youtube.com/vi/bJACHlcKKgw/maxresdefault.jpg",
      }
    ],
    intermediate: [
      {
        id: '9_8vcAmVO7I',
        title: "Introduction to Investments & Stock Market",
        channelTitle: "CA Rachana Ranade",
        duration: "60 min",
        thumbnail: "https://img.youtube.com/vi/qIw-yFC-HNU/maxresdefault.jpg",
      },
      {
        id: 'K7LJ2hTgxPM',
        title: "Mutual Funds, SIPs & Index Funds",
        channelTitle: "Pranjal Kamra",
        duration: "45 min",
        thumbnail: "https://img.youtube.com/vi/Jds2CU0_N_k/maxresdefault.jpg",
      },
      {
        id: 'x4jWwkGNdGY',
        title: "Retirement Planning & Insurance",
        channelTitle: "Ankur Warikoo",
        duration: "50 min",
        thumbnail: "https://img.youtube.com/vi/xAPowOyA0LU/maxresdefault.jpg",
      },
      {
        id: 'za5EkxRG3Gk',
        title: "Real Estate Investment & REITs",
        channelTitle: "Akshat Shrivastava",
        duration: "55 min",
        thumbnail: "https://img.youtube.com/vi/za5EkxRG3Gk/maxresdefault.jpg",
      },
      {
        id: 'wjLI99_nXBE',
        title: "Tax Planning & Gold Investments",
        channelTitle: "Labour Law Advisor",
        duration: "40 min",
        thumbnail: "https://img.youtube.com/vi/wjLI99_nXBE/maxresdefault.jpg",
      }
    ],
    advanced: [
      {
        id: 'TL6I-gYZ5c4',
        title: "Asset Allocation & Portfolio Management",
        channelTitle: "CA Rachana Ranade",
        duration: "75 min",
        thumbnail: "https://img.youtube.com/vi/dSX3qa2mWCQ/maxresdefault.jpg",
      },
      {
        id: 'XBQetKqJpPE',
        title: "Technical & Fundamental Analysis",
        channelTitle: "Pranjal Kamra",
        duration: "65 min",
        thumbnail: "https://img.youtube.com/vi/yzRP-mA2eiE/maxresdefault.jpg",
      },
      {
        id: 'PHe0bXAIuk0',
        title: "Cryptocurrency & Forex Trading",
        channelTitle: "Ray Dalio",
        duration: "70 min",
        thumbnail: "https://img.youtube.com/vi/GIrXxemhoVg/maxresdefault.jpg",
      },
      {
        id: 'F3QpgXBtDeo',
        title: "Angel Investing & Venture Capital",
        channelTitle: "Warren Buffett Archive",
        duration: "80 min",
        thumbnail: "https://img.youtube.com/vi/F3QpgXBtDeo/maxresdefault.jpg",
      },
      {
        id: 'TJDcGv9OH4Q',
        title: "Passive Income & Risk Management",
        channelTitle: "Morgan Housel",
        duration: "60 min",
        thumbnail: "https://img.youtube.com/vi/TJDcGv9OH4Q/maxresdefault.jpg",
      }
    ],
    expert: [
      {
        id: 'dQw4w9WgXcQ',
        title: "Entrepreneurship & Business Finance",
        channelTitle: "Harvard Business Review",
        duration: "90 min",
        thumbnail: "https://img.youtube.com/vi/eHJnEHyyN1Y/maxresdefault.jpg",
      },
      {
        id: 'jfKfPfyJRdk',
        title: "Private Equity & Hedge Funds",
        channelTitle: "Bloomberg Markets",
        duration: "85 min",
        thumbnail: "https://img.youtube.com/vi/yca0A3B7Pqc/maxresdefault.jpg",
      },
      {
        id: '5qap5aO4i9A',
        title: "Estate Planning & Wealth Management",
        channelTitle: "Financial Times",
        duration: "75 min",
        thumbnail: "https://img.youtube.com/vi/nZ4SAXgUrIc/maxresdefault.jpg",
      },
      {
        id: 'DWcJFNfaw9c',
        title: "FIRE Movement & Financial Freedom",
        channelTitle: "The Economist",
        duration: "70 min",
        thumbnail: "https://img.youtube.com/vi/IntxsqfLFXA/maxresdefault.jpg",
      },
      {
        id: 'casJrjGyPxE',
        title: "AI in Finance & Global Economic Trends",
        channelTitle: "World Economic Forum",
        duration: "80 min",
        thumbnail: "https://img.youtube.com/vi/casJrjGyPxE/maxresdefault.jpg",
      }
    ]
  };

  const handleModulePress = (moduleId) => {
    setSelectedModule(moduleId);
    setShowModuleModal(true);
    setCurrentPage(1);
  };

  const handleVideoPress = (videoId) => {
    setSelectedVideo(videoId);
    setVideoModalVisible(true);
  };

  // Check if a level is unlocked
  const isLevelUnlocked = (level) => {
    return unlockedLevels.includes(level);
  };

  // Handle video completion
  const handleVideoCompletion = (videoId) => {
    if (!completedVideos.includes(videoId)) {
      const newPoints = userPoints + pointsReward.video;
      setUserPoints(newPoints);
      setCompletedVideos([...completedVideos, videoId]);
      
      // Check if new level should be unlocked
      checkLevelUnlock(newPoints);
    }
  };

  // Handle module completion
  const handleModuleCompletion = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      const newPoints = userPoints + pointsReward.module;
      setUserPoints(newPoints);
      setCompletedModules([...completedModules, moduleId]);
      
      // Check if new level should be unlocked
      checkLevelUnlock(newPoints);
    }
  };

  // Check if new level should be unlocked
  const checkLevelUnlock = (points) => {
    const newUnlockedLevels = [...unlockedLevels];
    
    if (points >= levelRequirements.intermediate && !newUnlockedLevels.includes('intermediate')) {
      newUnlockedLevels.push('intermediate');
    }
    if (points >= levelRequirements.advanced && !newUnlockedLevels.includes('advanced')) {
      newUnlockedLevels.push('advanced');
    }
    if (points >= levelRequirements.expert && !newUnlockedLevels.includes('expert')) {
      newUnlockedLevels.push('expert');
    }
    
    setUnlockedLevels(newUnlockedLevels);
  };

  // Modify video player close handler
  const handleVideoClose = () => {
    if (selectedVideo) {
      handleVideoCompletion(selectedVideo);
    }
    setVideoModalVisible(false);
    setSelectedVideo(null);
  };

  // Modify module modal close handler
  const handleModuleClose = () => {
    if (selectedModule) {
      handleModuleCompletion(selectedModule);
    }
    setShowModuleModal(false);
    setSelectedModule(null);
  };

  const renderModuleModal = () => {
    if (!selectedModule || !moduleContent[selectedModule]) return null;

    const content = moduleContent[selectedModule];
    const currentPageContent = content.pages[currentPage - 1];

    return (
      <Modal
        visible={showModuleModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModuleClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{content.title}</Text>
              <TouchableOpacity
                onPress={handleModuleClose}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.pageIndicator}>
              <Text style={styles.pageNumber}>Page {currentPage} of {content.pages.length}</Text>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.pageTitle}>{currentPageContent.title}</Text>
              <Text style={styles.pageContent}>{currentPageContent.content}</Text>
            </ScrollView>

            <View style={styles.navigationButtons}>
              <TouchableOpacity
                style={[styles.navButton, currentPage === 1 && styles.disabledButton]}
                onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <Icon name="chevron-left" size={24} color={currentPage === 1 ? "#9CA3AF" : "#FFFFFF"} />
                <Text style={[styles.navButtonText, currentPage === 1 && styles.disabledButtonText]}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.navButton, currentPage === content.pages.length && styles.disabledButton]}
                onPress={() => setCurrentPage(prev => Math.min(content.pages.length, prev + 1))}
                disabled={currentPage === content.pages.length}
              >
                <Text style={[styles.navButtonText, currentPage === content.pages.length && styles.disabledButtonText]}>Next</Text>
                <Icon name="chevron-right" size={24} color={currentPage === content.pages.length ? "#9CA3AF" : "#FFFFFF"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderVideosSection = () => (
    <View style={styles.section}>
      {/* Level Tabs */}
      <View style={styles.levelTabsWrapper}>
        <View style={styles.levelTabsContainer}>
          {renderLevelTab('beginner', 'school', 'Beginner')}
          {renderLevelTab('intermediate', 'trending-up', 'Intermediate')}
          {renderLevelTab('advanced', 'star', 'Advanced')}
          {renderLevelTab('expert', 'trophy', 'Expert')}
        </View>
      </View>

      <FlatList
        data={videoContent[activeVideoLevel] || []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tutorialList}
        ListHeaderComponent={<View style={styles.listHeaderSpace} />}
        renderItem={renderVideoCard}
      />

      <VideoPlayer
        videoId={selectedVideo}
        visible={videoModalVisible}
        onClose={handleVideoClose}
      />
    </View>
  );

  const renderLevelTab = (level, icon, label) => {
    const isUnlocked = isLevelUnlocked(level);
    const isActive = activeVideoLevel === level;
    
    return (
      <TouchableOpacity 
        style={[
          styles.levelTab,
          isActive && styles.activeLevelTab,
          !isUnlocked && styles.lockedTab
        ]}
        onPress={() => isUnlocked && setActiveVideoLevel(level)}
        disabled={!isUnlocked}>
        <Icon 
          name={isUnlocked ? icon : "lock"}
          size={20} 
          color={isActive ? colors.primary.main : isUnlocked ? '#6B7280' : '#9CA3AF'} 
        />
        <Text style={[
          styles.levelTabText,
          isActive && styles.activeLevelTabText,
          !isUnlocked && styles.lockedTabText
        ]}>
          {label}
        </Text>
        {!isUnlocked && (
          <View style={styles.pointsRequiredBadge}>
            <Icon name="lock" size={12} color="#DC2626" />
            <Text style={styles.pointsRequiredText}>{levelRequirements[level]} pts</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderVideoCard = ({ item }) => {
    const isCompleted = completedVideos.includes(item.id);
    
    return (
      <TouchableOpacity
        style={[styles.tutorialCard, isCompleted && styles.completedCard]}
        onPress={() => handleVideoPress(item.id)}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.playButton}>
          <Icon name={isCompleted ? "check-circle" : "play-circle"} size={40} color="#fff" />
          
        </View>
        <View style={styles.tutorialInfo}>
          <Text style={styles.tutorialTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.tutorialMeta}>
            <View style={styles.metaItem}>
              <Icon name="account" size={14} color={semantic.text.secondary} />
              <Text style={styles.metaText}>{item.channelTitle}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="clock-outline" size={14} color={semantic.text.secondary} />
              <Text style={styles.metaText}>{item.duration}</Text>
            </View>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Icon name="check" size={12} color="#FFFFFF" />
                <Text style={styles.completedText}>Completed</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Link href="../" asChild>
        <TouchableOpacity
          style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={semantic.text.primary} />
        </TouchableOpacity>
      </Link>
      <Text style={styles.headerTitle}>Financial Education</Text>
      <View style={styles.pointsContainer}>
        <Icon name="star" size={16} color={colors.primary.main} />
        <Text style={styles.pointsText}>{userPoints} pts</Text>
      </View>
    </View>
  );

  const renderSectionTabs = () => (
    <View style={styles.sectionTabsContainer}>
      <TouchableOpacity
        style={[styles.sectionTab, activeSection === 'modules' && styles.activeSectionTab]}
        onPress={() => setActiveSection('modules')}>
        <Icon name="book-open-variant" size={24} color={activeSection === 'modules' ? colors.primary.main : '#6B7280'} />
        <Text style={[styles.sectionTabText, activeSection === 'modules' && styles.activeSectionTabText]}>Modules</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.sectionTab, activeSection === 'videos' && styles.activeSectionTab]}
        onPress={() => setActiveSection('videos')}>
        <Icon name="play-circle" size={24} color={activeSection === 'videos' ? colors.primary.main : '#6B7280'} />
        <Text style={[styles.sectionTabText, activeSection === 'videos' && styles.activeSectionTabText]}>Lecture</Text>
      </TouchableOpacity>
    </View>
  );

  const renderModulesSection = () => (
    <View style={styles.section}>
      <View style={styles.modulesContainer}>
        {/* Basic Finance Section - Beginner Level */}
        <View style={styles.moduleSubsection}>
          <View style={styles.subsectionHeader}>
            <Icon name="cash-multiple" size={20} color="#059669" />
            <Text style={styles.subsectionTitle}>Basic Finance (Beginner)</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moduleCardsContainer}>
            <TouchableOpacity 
              style={[
                styles.moduleCard, 
                { backgroundColor: '#059669' },
                completedModules.includes('budgeting') && styles.completedModuleCard
              ]}
              onPress={() => handleModulePress('budgeting')}
            >
              <Icon name="calculator" size={32} color="#FFFFFF" />
              <Text style={styles.moduleCardTitle}>Budgeting</Text>
              <Text style={styles.moduleCardSubtitle}>First steps in finance</Text>
              {completedModules.includes('budgeting') && (
                <View style={styles.moduleCompletedBadge}>
                  <Icon name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.moduleCard, 
                { backgroundColor: '#059669' },
                completedModules.includes('emergencyFund') && styles.completedModuleCard
              ]}
              onPress={() => handleModulePress('emergencyFund')}
            >
              <Icon name="bank" size={32} color="#FFFFFF" />
              <Text style={styles.moduleCardTitle}>Emergency Fund</Text>
              <Text style={styles.moduleCardSubtitle}>Build your safety net</Text>
              {completedModules.includes('emergencyFund') && (
                <View style={styles.moduleCompletedBadge}>
                  <Icon name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Saving Section - Intermediate Level */}
        <View style={styles.moduleSubsection}>
          <View style={styles.subsectionHeader}>
            <Icon name="piggy-bank" size={20} color="#2563EB" />
            <Text style={styles.subsectionTitle}>Saving (Intermediate)</Text>
            {!isLevelUnlocked('intermediate') && (
              <View style={styles.pointsRequiredBadge}>
                <Icon name="lock" size={12} color="#DC2626" />
                <Text style={styles.pointsRequiredText}>{levelRequirements.intermediate} pts</Text>
              </View>
            )}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moduleCardsContainer}>
            <TouchableOpacity 
              style={[
                styles.moduleCard, 
                { backgroundColor: '#2563EB' },
                !isLevelUnlocked('intermediate') && styles.lockedModuleCard,
                completedModules.includes('goalSetting') && styles.completedModuleCard
              ]}
              onPress={() => isLevelUnlocked('intermediate') && handleModulePress('goalSetting')}
              disabled={!isLevelUnlocked('intermediate')}
            >
              <Icon name={isLevelUnlocked('intermediate') ? "target" : "lock"} size={32} color="#FFFFFF" />
              <Text style={styles.moduleCardTitle}>Goal Setting</Text>
              <Text style={styles.moduleCardSubtitle}>Plan your future</Text>
              {completedModules.includes('goalSetting') && (
                <View style={styles.moduleCompletedBadge}>
                  <Icon name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.moduleCard, 
                { backgroundColor: '#2563EB' },
                !isLevelUnlocked('intermediate') && styles.lockedModuleCard,
                completedModules.includes('creditCards') && styles.completedModuleCard
              ]}
              onPress={() => isLevelUnlocked('intermediate') && handleModulePress('creditCards')}
              disabled={!isLevelUnlocked('intermediate')}
            >
              <Icon name={isLevelUnlocked('intermediate') ? "credit-card" : "lock"} size={32} color="#FFFFFF" />
              <Text style={styles.moduleCardTitle}>Credit Cards</Text>
              <Text style={styles.moduleCardSubtitle}>Smart credit usage</Text>
              {completedModules.includes('creditCards') && (
                <View style={styles.moduleCompletedBadge}>
                  <Icon name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Advanced Level */}
        <View style={styles.moduleSubsection}>
          <View style={styles.subsectionHeader}>
            <Icon name="shield-check" size={20} color="#4F46E5" />
            <Text style={styles.subsectionTitle}>Protection (Advanced)</Text>
            {!isLevelUnlocked('advanced') && (
              <View style={styles.pointsRequiredBadge}>
                <Icon name="lock" size={12} color="#DC2626" />
                <Text style={styles.pointsRequiredText}>{levelRequirements.advanced} pts</Text>
              </View>
            )}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moduleCardsContainer}>
            <TouchableOpacity 
              style={[
                styles.moduleCard, 
                { backgroundColor: '#4F46E5' },
                !isLevelUnlocked('advanced') && styles.lockedModuleCard,
                completedModules.includes('healthInsurance') && styles.completedModuleCard
              ]}
              onPress={() => isLevelUnlocked('advanced') && handleModulePress('healthInsurance')}
              disabled={!isLevelUnlocked('advanced')}
            >
              <Icon name={isLevelUnlocked('advanced') ? "heart-pulse" : "lock"} size={32} color="#FFFFFF" />
              <Text style={styles.moduleCardTitle}>Health Insurance</Text>
              <Text style={styles.moduleCardSubtitle}>Protect your health</Text>
              {completedModules.includes('healthInsurance') && (
                <View style={styles.moduleCompletedBadge}>
                  <Icon name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.moduleCard, 
                { backgroundColor: '#4F46E5' },
                !isLevelUnlocked('advanced') && styles.lockedModuleCard,
                completedModules.includes('propertyInsurance') && styles.completedModuleCard
              ]}
              onPress={() => isLevelUnlocked('advanced') && handleModulePress('propertyInsurance')}
              disabled={!isLevelUnlocked('advanced')}
            >
              <Icon name={isLevelUnlocked('advanced') ? "home" : "lock"} size={32} color="#FFFFFF" />
              <Text style={styles.moduleCardTitle}>Property Insurance</Text>
              <Text style={styles.moduleCardSubtitle}>Secure your assets</Text>
              {completedModules.includes('propertyInsurance') && (
                <View style={styles.moduleCompletedBadge}>
                  <Icon name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Expert Level */}
        <View style={styles.moduleSubsection}>
          <View style={styles.subsectionHeader}>
            <Icon name="chart-line" size={20} color="#DC2626" />
            <Text style={styles.subsectionTitle}>Investing (Expert)</Text>
            {!isLevelUnlocked('expert') && (
              <View style={styles.pointsRequiredBadge}>
                <Icon name="lock" size={12} color="#DC2626" />
                <Text style={styles.pointsRequiredText}>{levelRequirements.expert} pts</Text>
              </View>
            )}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moduleCardsContainer}>
            <TouchableOpacity 
              style={[
                styles.moduleCard, 
                { backgroundColor: '#DC2626' },
                !isLevelUnlocked('expert') && styles.lockedModuleCard,
                completedModules.includes('stockMarket') && styles.completedModuleCard
              ]}
              onPress={() => isLevelUnlocked('expert') && handleModulePress('stockMarket')}
              disabled={!isLevelUnlocked('expert')}
            >
              <Icon name={isLevelUnlocked('expert') ? "trending-up" : "lock"} size={32} color="#FFFFFF" />
              <Text style={styles.moduleCardTitle}>Stock Market</Text>
              <Text style={styles.moduleCardSubtitle}>Advanced trading</Text>
              {completedModules.includes('stockMarket') && (
                <View style={styles.moduleCompletedBadge}>
                  <Icon name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.moduleCard, 
                { backgroundColor: '#DC2626' },
                !isLevelUnlocked('expert') && styles.lockedModuleCard,
                completedModules.includes('mutualFunds') && styles.completedModuleCard
              ]}
              onPress={() => isLevelUnlocked('expert') && handleModulePress('mutualFunds')}
              disabled={!isLevelUnlocked('expert')}
            >
              <Icon name={isLevelUnlocked('expert') ? "gold" : "lock"} size={32} color="#FFFFFF" />
              <Text style={styles.moduleCardTitle}>Mutual Funds</Text>
              <Text style={styles.moduleCardSubtitle}>Portfolio management</Text>
              {completedModules.includes('mutualFunds') && (
                <View style={styles.moduleCompletedBadge}>
                  <Icon name="check" size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {renderModuleModal()}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderHeader()}
        {renderSectionTabs()}
        {activeSection === 'modules' ? (
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {renderModulesSection()}
          </ScrollView>
        ) : (
          <View style={styles.content}>
            {renderVideosSection()}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary.main}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${colors.primary.main}30`,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.main,
    marginLeft: 6,
  },
  sectionTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  sectionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  activeSectionTab: {
    backgroundColor: `${colors.primary.main}15`,
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  sectionTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  activeSectionTabText: {
    color: colors.primary.main,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  section: {
    flex: 1,
  },
  tutorialList: {
    paddingBottom: 16,
  },
  listHeaderSpace: {
    height: 8,
  },
  tutorialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  thumbnail: {
    width: '100%',
    height: 180,
  },
  tutorialInfo: {
    padding: 12,
  },
  tutorialTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
    lineHeight: 20,
  },
  tutorialMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  playButton: {
    position: 'absolute',
    top: '25%',
    left: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
  },
  levelTabsWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  levelTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  levelTab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
  },
  activeLevelTab: {
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  levelTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  lockedTab: {
    opacity: 0.7,
    backgroundColor: '#E5E7EB',
  },
  lockedTabText: {
    color: '#9CA3AF',
  },
  pointsRequiredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  pointsRequiredText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
    marginLeft: 4,
  },
  completedCard: {
    borderColor: colors.primary.main,
    borderWidth: 1,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.main,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  completedText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  modulesContainer: {
    paddingHorizontal: 16,
  },
  moduleSubsection: {
    marginBottom: 24,
  },
  subsectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  moduleCardsContainer: {
    paddingVertical: 4,
  },
  moduleCard: {
    width: 180,
    padding: 16,
    marginRight: 12,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  moduleCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  moduleCardSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  lockedModuleCard: {
    // Remove opacity
  },
  completedModuleCard: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  moduleCompletedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  pageIndicator: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pageNumber: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  modalBody: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  pageContent: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.main,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});

export default FinancialEducationScreen; 