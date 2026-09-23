/**
 * Comprehensive Course Curriculum, Capstone Projects & Career Outcomes
 * Sourced for ProVersion's 12 industry-standard programs
 */

export const courseCurriculumData = {
  'ai-ml': {
    modules: [
      {
        title: 'Module 1: Advanced Python & Scientific Computing',
        duration: 'Weeks 1–3',
        topics: [
          'Python Object-Oriented Architecture & Metaprogramming',
          'Vectorized computation with NumPy, Pandas, & SciPy',
          'Data wrangling, feature engineering, and outlier detection',
          'Interactive visualizations with Matplotlib, Seaborn, and Plotly',
        ],
      },
      {
        title: 'Module 2: Machine Learning Models & Statistical Foundations',
        duration: 'Weeks 4–6',
        topics: [
          'Linear & Logistic Regression, Decision Trees, and Random Forests',
          'Gradient Boosting Algorithms: XGBoost, LightGBM, and CatBoost',
          'Unsupervised Learning: K-Means, Hierarchical Clustering, and PCA',
          'Cross-validation, hyperparameter tuning (Optuna), and model evaluation metrics',
        ],
      },
      {
        title: 'Module 3: Deep Learning, Computer Vision & NLP',
        duration: 'Weeks 7–9',
        topics: [
          'Neural Network Foundations & Backpropagation with PyTorch',
          'Convolutional Neural Networks (CNNs) & Object Detection (YOLOv8)',
          'Recurrent Neural Networks (RNNs), LSTMs, and Attention Mechanisms',
          'Transformer Architecture: BERT, GPT, and Hugging Face Ecosystem',
        ],
      },
      {
        title: 'Module 4: Generative AI, LLMs & Production MLOps',
        duration: 'Weeks 10–12',
        topics: [
          'Retrieval-Augmented Generation (RAG) with LangChain and LlamaIndex',
          'Vector Databases: Pinecone, ChromaDB, and Milvus',
          'REST API deployment with FastAPI and Docker containerization',
          'MLOps pipelines, model monitoring with MLflow, and AWS SageMaker deployment',
        ],
      },
    ],
    projects: [
      {
        name: 'Autonomous Diagnostic Vision Pipeline',
        description: 'End-to-end medical scan classification system achieving 98.4% diagnostic accuracy using custom transfer learning on PyTorch with real-time FastAPI inferencing.',
        tech: ['PyTorch', 'YOLOv8', 'FastAPI', 'Docker', 'AWS'],
      },
      {
        name: 'Enterprise Knowledge Assistant (RAG LLM)',
        description: 'Multi-tenant conversational intelligence agent querying 50,000+ internal PDF documents using LangChain, Pinecone vector indexing, and GPT-4 API.',
        tech: ['LangChain', 'LlamaIndex', 'Pinecone', 'OpenAI', 'Next.js'],
      },
      {
        name: 'Real-Time Financial Fraud Predictor',
        description: 'High-throughput stream processing ML model flagging anomalous credit card transactions under 15ms latency with XGBoost and Kafka.',
        tech: ['XGBoost', 'Apache Kafka', 'Pandas', 'MLflow', 'Docker'],
      },
    ],
    tools: ['Python', 'PyTorch', 'TensorFlow', 'Hugging Face', 'Scikit-Learn', 'FastAPI', 'Docker', 'AWS SageMaker', 'LangChain', 'MLflow'],
    careerRoles: ['AI Research Engineer', 'Machine Learning Specialist', 'Computer Vision Developer', 'MLOps Engineer', 'NLP Data Scientist'],
    salaryRange: '₹8.5 LPA – ₹24.0 LPA',
    hiringPartners: ['Google', 'Amazon', 'Microsoft', 'NVIDIA', 'Walmart Labs', 'TCS', 'Infosys'],
  },

  'aws-cloud': {
    modules: [
      {
        title: 'Module 1: Cloud Core & AWS Infrastructure Foundations',
        duration: 'Weeks 1–3',
        topics: [
          'Global Cloud Infrastructure, IAM Policies, and Role-Based Access Control',
          'Amazon Virtual Private Cloud (VPC), Subnets, NAT Gateways, and Route Tables',
          'Compute Services: EC2 Instance Sizing, Auto Scaling Groups, and Elastic Load Balancing (ALB/NLB)',
          'Storage Architecture: S3 Glacier, EFS, EBS Volumes, and Lifecycle Management',
        ],
      },
      {
        title: 'Module 2: Serverless Computing & Managed Databases',
        duration: 'Weeks 4–6',
        topics: [
          'Serverless Architecture with AWS Lambda, API Gateway, and Step Functions',
          'Relational Databases with Amazon RDS, Multi-AZ deployments, and Aurora',
          'NoSQL scale with DynamoDB, DAX caching, and DocumentDB',
          'Security, KMS encryption, CloudTrail auditing, and AWS Shield DDoS protection',
        ],
      },
      {
        title: 'Module 3: Containerization & Kubernetes on AWS (EKS)',
        duration: 'Weeks 7–9',
        topics: [
          'Docker container creation, multi-stage builds, and Amazon ECR registry',
          'Amazon Elastic Kubernetes Service (EKS) cluster management and Helm charts',
          'AWS ECS with Fargate for serverless microservice orchestration',
          'Service mesh, ingress controllers, and zero-downtime rolling updates',
        ],
      },
      {
        title: 'Module 4: Infrastructure as Code (IaC) & CI/CD Pipelines',
        duration: 'Weeks 10–12',
        topics: [
          'Declarative Infrastructure provisioning with Terraform and AWS CloudFormation',
          'Enterprise CI/CD with GitHub Actions, AWS CodePipeline, and CodeBuild',
          'Observability: Amazon CloudWatch, AWS X-Ray distributed tracing, and Prometheus/Grafana',
          'Disaster Recovery strategies, multi-region failover, and Well-Architected Framework',
        ],
      },
    ],
    projects: [
      {
        name: 'Multi-Region High-Availability Banking Architecture',
        description: 'Built a fault-tolerant banking platform on AWS VPC across 3 Availability Zones with Aurora PostgreSQL, automated failover, and Terraform IaC.',
        tech: ['AWS VPC', 'Terraform', 'Amazon Aurora', 'ALB', 'CloudWatch'],
      },
      {
        name: 'Serverless Video Transcoding & Streaming Engine',
        description: 'Automated video ingestion and HLS encoding pipeline leveraging S3 event triggers, AWS Lambda, MediaConvert, and CloudFront CDN distribution.',
        tech: ['AWS Lambda', 'Amazon S3', 'MediaConvert', 'CloudFront', 'DynamoDB'],
      },
      {
        name: 'Enterprise GitOps EKS Microservices Pipeline',
        description: 'Complete Kubernetes cluster deployment on AWS EKS using Helm, ArgoCD GitOps, and GitHub Actions CI/CD with automated Prometheus alerts.',
        tech: ['AWS EKS', 'Docker', 'Kubernetes', 'ArgoCD', 'Terraform'],
      },
    ],
    tools: ['AWS Cloud', 'Terraform', 'Docker', 'Kubernetes', 'Helm', 'GitHub Actions', 'AWS Lambda', 'Prometheus', 'Grafana', 'Amazon EKS'],
    careerRoles: ['Cloud Solutions Architect', 'DevOps Specialist', 'Site Reliability Engineer (SRE)', 'AWS Infrastructure Engineer', 'Platform Engineer'],
    salaryRange: '₹8.0 LPA – ₹22.0 LPA',
    hiringPartners: ['Amazon AWS', 'Deloitte', 'Cognizant', 'Capgemini', 'Wipro', 'Accenture', 'Tech Mahindra'],
  },

  'full-stack': {
    modules: [
      {
        title: 'Module 1: Advanced Java, OOP & Clean Code',
        duration: 'Weeks 1–3',
        topics: [
          'Java Core 17/21, Memory Management, and Garbage Collection',
          'Generics, Lambda Expressions, Stream API, and Modern Concurrency',
          'Design Patterns: Singleton, Factory, Builder, Strategy, and Observer',
          'Unit Testing with JUnit 5, Mockito, and Clean Code standards',
        ],
      },
      {
        title: 'Module 2: Enterprise Backend with Spring Boot & Microservices',
        duration: 'Weeks 4–6',
        topics: [
          'Spring Boot 3, Dependency Injection, and Application Context',
          'Spring Data JPA, Hibernate ORM, and Connection Pooling',
          'RESTful API architecture, Swagger/OpenAPI documentation, and Exception handling',
          'Microservices Architecture: Spring Cloud Gateway, Eureka Service Discovery, and Resilience4j',
        ],
      },
      {
        title: 'Module 3: Database Engineering & Asynchronous Messaging',
        duration: 'Weeks 7–9',
        topics: [
          'Relational database modeling with MySQL & PostgreSQL',
          'Indexing strategies, query optimization, and transaction ACID properties',
          'Caching layer with Redis and Spring Cache',
          'Event-driven architecture with Apache Kafka and RabbitMQ messaging queues',
        ],
      },
      {
        title: 'Module 4: Modern React Frontend & Cloud Deployment',
        duration: 'Weeks 10–12',
        topics: [
          'Modern React (Hooks, Context, State Management, and TailwindCSS)',
          'JWT Authentication, OAuth2, and Spring Security 6',
          'Docker containerization of Spring Boot & React services',
          'Continuous deployment to AWS/Heroku with Docker Compose and Nginx',
        ],
      },
    ],
    projects: [
      {
        name: 'Scalable B2B E-Commerce Microservices Engine',
        description: 'Built a 5-microservice enterprise store with product catalog, cart, orders, payment integration via Stripe, and Kafka event streaming.',
        tech: ['Spring Boot', 'Kafka', 'React', 'PostgreSQL', 'Docker'],
      },
      {
        name: 'Real-Time Financial Stock Trading Dashboard',
        description: 'High-speed trading terminal featuring WebSocket live ticker feeds, Redis in-memory cache, Spring Security JWT authentication, and interactive charting.',
        tech: ['Java 21', 'Spring WebSocket', 'Redis', 'React', 'TailwindCSS'],
      },
      {
        name: 'Collaborative Project Management Suite (Jira Clone)',
        description: 'Complete Agile workflow engine with Kanban boards, sprint planners, role-based access control, file attachments, and email notifications.',
        tech: ['Spring Boot', 'Hibernate', 'React', 'MySQL', 'AWS S3'],
      },
    ],
    tools: ['Java 21', 'Spring Boot 3', 'React', 'MySQL', 'PostgreSQL', 'Redis', 'Apache Kafka', 'Docker', 'Spring Security', 'Maven'],
    careerRoles: ['Full Stack Java Developer', 'Backend Software Engineer', 'Java Microservices Specialist', 'Enterprise Application Architect'],
    salaryRange: '₹7.5 LPA – ₹20.0 LPA',
    hiringPartners: ['JPMorgan Chase', 'Morgan Stanley', 'Infosys', 'Wipro', 'TCS', 'Oracle', 'HCL Tech'],
  },

  'cyber-security': {
    modules: [
      {
        title: 'Module 1: Network Protocols & Security Architecture',
        duration: 'Weeks 1–3',
        topics: [
          'TCP/IP Protocol Suite, Packet Analysis with Wireshark, and OSI Deep Dive',
          'Firewalls, IDS/IPS configuration, and DMZ network topology',
          'Linux Administration & Bash scripting for security automation',
          'Cryptographic algorithms: AES, RSA, ECC, Hashing (SHA-256), and PKI',
        ],
      },
      {
        title: 'Module 2: Ethical Hacking & Vulnerability Assessment',
        duration: 'Weeks 4–6',
        topics: [
          'Reconnaissance & OSINT techniques using Nmap, Shodan, and Maltego',
          'Vulnerability Scanning with Nessus, OpenVAS, and Nikto',
          'Exploitation frameworks: Metasploit, payload generation, and privilege escalation',
          'Wireless network auditing, WPA2/WPA3 cracking, and Evil Twin attacks',
        ],
      },
      {
        title: 'Module 3: Web Application Penetration Testing (OWASP Top 10)',
        duration: 'Weeks 7–9',
        topics: [
          'Burp Suite Professional setup, intercepting proxies, and custom extensions',
          'SQL Injection (SQLi), Cross-Site Scripting (XSS), and CSRF exploitation',
          'Server-Side Request Forgery (SSRF) and Insecure Direct Object References (IDOR)',
          'API Security Testing: REST, GraphQL, and JWT token manipulation',
        ],
      },
      {
        title: 'Module 4: SIEM, Incident Response & SOC Operations',
        duration: 'Weeks 10–12',
        topics: [
          'Security Operations Center (SOC) workflows and incident handling lifecycle',
          'Log analysis & correlation with Splunk Enterprise and Elastic SIEM',
          'Threat Hunting with MITRE ATT&CK framework and Sigma rules',
          'Vulnerability Assessment and Penetration Testing (VAPT) compliance reporting',
        ],
      },
    ],
    projects: [
      {
        name: 'Enterprise VAPT & Red Team Audit Simulation',
        description: 'Conducted a simulated red-team cyber assessment against an enterprise network, discovering 14 vulnerabilities and delivering an industry-standard VAPT remediation report.',
        tech: ['Kali Linux', 'Burp Suite', 'Metasploit', 'Nessus', 'Wireshark'],
      },
      {
        name: 'Real-Time SOC SIEM Threat Detection Engine',
        description: 'Configured a Splunk SOC environment ingesting Windows Event Logs and Snort IDS alerts, creating automated alerts for Brute Force, PrivEsc, and lateral movement.',
        tech: ['Splunk', 'Snort IDS', 'Sysmon', 'MITRE ATT&CK', 'Bash'],
      },
      {
        name: 'Automated Web Application Vulnerability Scanner',
        description: 'Engineered a Python-based security auditing tool scanning endpoints for OWASP Top 10 vulnerabilities, SSL misconfigurations, and sensitive data leakage.',
        tech: ['Python', 'Requests', 'BeautifulSoup', 'SQLMap', 'Docker'],
      },
    ],
    tools: ['Kali Linux', 'Burp Suite', 'Wireshark', 'Metasploit', 'Splunk', 'Nessus', 'Nmap', 'Snort', 'Python', 'OWASP ZAP'],
    careerRoles: ['Ethical Hacker / Penetration Tester', 'SOC Analyst (L1/L2)', 'Security Consultant (VAPT)', 'Cyber Defense Specialist', 'Information Security Officer'],
    salaryRange: '₹8.0 LPA – ₹22.0 LPA',
    hiringPartners: ['PwC', 'EY', 'KPMG', 'Wipro Cybersecurity', 'IBM Security', 'Cisco', 'Trend Micro'],
  },

  'data-analytics': {
    modules: [
      {
        title: 'Module 1: Advanced Excel & Business Data Analysis',
        duration: 'Weeks 1–3',
        topics: ['XLOOKUP, INDEX/MATCH, Dynamic Arrays, and Power Query', 'Pivot Tables, slicers, and executive KPI dashboard creation', 'Statistical analysis: Hypothesis testing, ANOVA, and regression modeling', 'Automating reporting workflows with Excel VBA & Macros'],
      },
      {
        title: 'Module 2: Relational Databases & SQL for Analytics',
        duration: 'Weeks 4–6',
        topics: ['Complex SQL Queries, multi-table JOINs, subqueries, and CTEs', 'Window functions: ROW_NUMBER, RANK, DENSE_RANK, and LAG/LEAD', 'Database performance optimization, indexing, and query plans', 'Building analytics data marts and ETL views in PostgreSQL'],
      },
      {
        title: 'Module 3: Python for Exploratory Data Analysis & Modeling',
        duration: 'Weeks 7–9',
        topics: ['Data manipulation with Pandas, NumPy, and DateTime analysis', 'Data visualization storytelling with Seaborn, Matplotlib, and Plotly', 'Predictive modeling: Linear Regression, Logistic Regression, and Time Series Forecasting', 'Scikit-Learn pipeline creation and predictive insights'],
      },
      {
        title: 'Module 4: Business Intelligence with Tableau & Power BI',
        duration: 'Weeks 10–12',
        topics: ['Power BI Desktop: DAX calculations, Measures, and Data Modeling', 'Interactive Tableau dashboards, Level of Detail (LOD) expressions, and parameters', 'Publishing dashboards to Tableau Cloud & Power BI Service with scheduled refresh', 'Translating raw business data into actionable executive insights'],
      },
    ],
    projects: [
      {
        name: 'Omnichannel Retail Sales & Cohort Intelligence Dashboard',
        description: 'Analyzed 2.5M transaction records using SQL and Tableau to identify customer churn drivers, cohort retention rates, and cross-sell opportunities.',
        tech: ['Tableau', 'PostgreSQL', 'SQL Window Functions', 'Python'],
      },
      {
        name: 'Predictive E-Commerce Customer Lifetime Value (CLV)',
        description: 'Built a predictive machine learning model in Python to estimate customer 12-month value, segmenting users into VIP tiers with automated Power BI dashboards.',
        tech: ['Python', 'Pandas', 'Scikit-Learn', 'Power BI', 'DAX'],
      },
    ],
    tools: ['Python', 'SQL', 'Tableau', 'Power BI', 'Excel', 'Pandas', 'PostgreSQL', 'DAX', 'Jupyter', 'Power Query'],
    careerRoles: ['Data Analyst', 'Business Intelligence Developer', 'Product Analytics Specialist', 'Market Research Analyst', 'Financial Data Consultant'],
    salaryRange: '₹6.5 LPA – ₹18.0 LPA',
    hiringPartners: ['Mu Sigma', 'Tiger Analytics', 'Fractal Analytics', 'Amazon', 'Flipkart', 'Deloitte', 'Accenture'],
  },

  iot: {
    modules: [
      {
        title: 'Module 1: Embedded C/C++ & Microcontroller Hardware',
        duration: 'Weeks 1–3',
        topics: ['ESP32, Arduino, and ARM Cortex architecture', 'GPIO programming, Analog-to-Digital Conversion (ADC), and PWM controls', 'Communication Protocols: I2C, SPI, UART, and RS-485', 'Hardware prototyping with Proteus and KiCAD schematic design'],
      },
      {
        title: 'Module 2: Wireless Networking & IoT Protocols',
        duration: 'Weeks 4–6',
        topics: ['Wi-Fi, Bluetooth Low Energy (BLE), LoRaWAN, and Zigbee mesh networks', 'MQTT Protocol deep dive, broker setup (Mosquitto), and QoS levels', 'HTTP/REST vs CoAP protocols for constrained devices', 'Power management: Deep Sleep modes and battery optimization'],
      },
      {
        title: 'Module 3: Cloud IoT Platforms & AWS IoT Core',
        duration: 'Weeks 7–9',
        topics: ['AWS IoT Core device provisioning, X.509 certificate authentication', 'IoT Shadow, Rules Engine, and DynamoDB data persistence', 'Real-time telemetry dashboards with Node-RED and Grafana', 'Edge computing and TinyML inference directly on microcontrollers'],
      },
      {
        title: 'Module 4: Industrial IoT (IIoT) & Smart Automation',
        duration: 'Weeks 10–12',
        topics: ['Industry 4.0 standards: Modbus TCP/RTU and OPC-UA protocols', 'Digital Twins modeling and predictive maintenance workflows', 'Over-The-Air (OTA) firmware updates and device fleet management', 'End-to-end commercial hardware product enclosure and deployment'],
      },
    ],
    projects: [
      {
        name: 'Industrial Smart Energy & Machinery Telemetry System',
        description: 'Engineered an ESP32 LoRa wireless sensor network monitoring factory motor vibration, temperature, and current with AWS IoT Core dashboards.',
        tech: ['ESP32', 'LoRaWAN', 'AWS IoT Core', 'MQTT', 'Grafana'],
      },
      {
        name: 'TinyML Edge AI Audio Defect Detection Device',
        description: 'Deployed an ultra-low-power TensorFlow Lite model on an ARM Cortex-M4 MCU to classify anomalous industrial bearing sounds in real time.',
        tech: ['TinyML', 'Edge AI', 'C++', 'TensorFlow Lite', 'Proteus'],
      },
    ],
    tools: ['ESP32', 'C/C++', 'AWS IoT Core', 'MQTT', 'Node-RED', 'FreeRTOS', 'KiCAD', 'Proteus', 'TinyML', 'Mosquitto'],
    careerRoles: ['IoT Embedded Engineer', 'Firmware Developer', 'Smart Systems Architect', 'IIoT Solutions Specialist', 'Hardware Prototyping Engineer'],
    salaryRange: '₹7.0 LPA – ₹19.0 LPA',
    hiringPartners: ['Bosch', 'Schneider Electric', 'Honeywell', 'Siemens', 'L&T Technology', 'Tata Elxsi', 'Qualcomm'],
  },

  vlsi: {
    modules: [
      {
        title: 'Module 1: Digital Electronics & Verilog HDL',
        duration: 'Weeks 1–3',
        topics: ['Combinational & Sequential logic design, Finite State Machines (FSM)', 'Verilog HDL syntax: Dataflow, Behavioral, and Structural modeling', 'Testbench writing, simulation with ModelSim/QuestaSim', 'Timing analysis: Setup & Hold times, Metastability, and Clock Domain Crossing (CDC)'],
      },
      {
        title: 'Module 2: FPGA Architecture & Synthesis',
        duration: 'Weeks 4–6',
        topics: ['AMD Xilinx Vivado toolchain, RTL synthesis, and Bitstream generation', 'FPGA Internal Architecture: LUTs, Flip-Flops, BRAM, and DSP slices', 'Static Timing Analysis (STA), Constraints (XDC), and Slack optimization', 'Hardware debugging using Xilinx Integrated Logic Analyzer (ILA)'],
      },
      {
        title: 'Module 3: SystemVerilog for Verification',
        duration: 'Weeks 7–9',
        topics: ['Object-Oriented Programming (OOP) in SystemVerilog for verification', 'Constrained Random Verification (CRV) and seed management', 'Functional Coverage, Covergroups, Coverpoints, and Cross Coverage', 'SystemVerilog Assertions (SVA): Immediate and Concurrent assertions'],
      },
      {
        title: 'Module 4: UVM Methodology & Standard Bus Protocols',
        duration: 'Weeks 10–12',
        topics: ['Universal Verification Methodology (UVM) Component Hierarchy', 'UVM Phases: build_phase, connect_phase, run_phase, and check_phase', 'Developing UVM Drivers, Monitors, Scoreboards, and Virtual Sequencers', 'Protocol Verification: AXI4, APB, AHB, and SPI bus architectures'],
      },
    ],
    projects: [
      {
        name: 'AXI4-Lite Bus Protocol Verification IP (VIP)',
        description: 'Developed a reusable SystemVerilog/UVM verification environment for an AXI4 memory controller, achieving 100% functional and code coverage.',
        tech: ['SystemVerilog', 'UVM', 'QuestaSim', 'AXI4 Protocol', 'Assertions'],
      },
      {
        name: 'RISC-V 32-bit Pipelined Core on Xilinx Artix-7 FPGA',
        description: 'Designed a 5-stage pipelined RISC-V processor in Verilog with hazard detection and forwarding units, validated on physical FPGA silicon.',
        tech: ['Verilog', 'Vivado', 'RISC-V', 'Xilinx Artix-7', 'ModelSim'],
      },
    ],
    tools: ['Verilog HDL', 'SystemVerilog', 'UVM', 'Xilinx Vivado', 'ModelSim', 'QuestaSim', 'Synopsys VCS', 'FPGA Artix-7', 'AXI Protocol'],
    careerRoles: ['ASIC Verification Engineer', 'FPGA Design Engineer', 'RTL Design Engineer', 'Silicon Validation Engineer', 'Digital System Architect'],
    salaryRange: '₹9.0 LPA – ₹26.0 LPA',
    hiringPartners: ['Intel', 'Qualcomm', 'AMD', 'NVIDIA', 'Texas Instruments', 'Broadcom', 'MediaTek'],
  },

  embedded: {
    modules: [
      {
        title: 'Module 1: Embedded C Programming & MCU Architecture',
        duration: 'Weeks 1–3',
        topics: ['Bitwise operations, pointers, memory-mapped I/O, and volatile qualifiers', '8051, AVR, and ARM Cortex-M architecture deep dive', 'Timers, Counters, Interrupt Service Routines (ISRs), and Watchdog timers', 'Low-power microcontroller operating modes'],
      },
      {
        title: 'Module 2: Hardware Communication Protocols & Interfacing',
        duration: 'Weeks 4–6',
        topics: ['UART serial communication, circular ring buffer implementation', 'SPI protocol master-slave data transfers, clock polarity & phase', 'I2C multi-master bus architecture and arbitration', 'Interfacing LCDs, OLED displays, matrix keypads, and sensor arrays'],
      },
      {
        title: 'Module 3: Real-Time Operating Systems (FreeRTOS)',
        duration: 'Weeks 7–9',
        topics: ['RTOS concepts: Task scheduling, Preemption, and Context Switching', 'Inter-Task Communication: Queues, Semaphores, and Mutexes', 'Priority Inversion mitigation and Priority Inheritance protocols', 'Memory management schemes and stack overflow detection in FreeRTOS'],
      },
      {
        title: 'Module 4: Embedded Linux & Automotive Protocols',
        duration: 'Weeks 10–12',
        topics: ['Introduction to Embedded Linux and Yocto Project build systems', 'CAN Bus protocol: Frame architecture, arbitration, and automotive diagnostic standards', 'Device driver fundamentals and kernel module development', 'Hardware-in-the-Loop (HIL) testing and debugging with JTAG/SWD'],
      },
    ],
    projects: [
      {
        name: 'Automotive Digital Instrument Cluster with CAN Bus',
        description: 'Constructed an automotive dashboard controller reading vehicle speed, RPM, and diagnostics over Controller Area Network (CAN) bus with FreeRTOS.',
        tech: ['Embedded C', 'FreeRTOS', 'CAN Bus', 'ARM Cortex', 'Proteus'],
      },
      {
        name: 'Real-Time Medical Patient Vitals Monitor',
        description: 'Multi-threaded FreeRTOS medical device reading ECG, SpO2, and temperature sensors with instant OLED visualization and alarm thresholds.',
        tech: ['FreeRTOS', 'STM32', 'I2C/SPI', 'Embedded C', 'Keil uVision'],
      },
    ],
    tools: ['Embedded C', 'ARM Cortex-M', 'FreeRTOS', 'CAN Bus', 'STM32CubeIDE', 'Keil uVision', 'Proteus', 'Git', 'Oscilloscopes / Logic Analyzers'],
    careerRoles: ['Embedded Systems Engineer', 'Firmware Engineer', 'Automotive Software Engineer', 'RTOS Developer', 'Hardware Validation Specialist'],
    salaryRange: '₹7.5 LPA – ₹20.0 LPA',
    hiringPartners: ['Bosch', 'Continental', 'Tata Motors', 'Mercedes-Benz R&D', 'L&T Technology', 'Visteon', 'KPIT'],
  },

  'ui-ux': {
    modules: [
      {
        title: 'Module 1: User Research, Empathy & Information Architecture',
        duration: 'Weeks 1–3',
        topics: ['Design Thinking framework and Double Diamond methodology', 'User Interviews, Surveys, Persona creation, and Empathy Mapping', 'Information Architecture (IA), Card Sorting, and Sitemap hierarchies', 'User Journey Mapping and Service Blueprints'],
      },
      {
        title: 'Module 2: Wireframing, Figma Mastery & Design Systems',
        duration: 'Weeks 4–6',
        topics: ['Low-fidelity sketching and rapid interactive wireframing in Figma', 'Auto Layout, Component Variants, and Smart Animate mastery', 'Atomic Design methodology and building scalable Design Systems', 'Accessibility (WCAG 2.1), color contrast ratios, and inclusive design'],
      },
      {
        title: 'Module 3: High-Fidelity UI, Micro-Interactions & Prototyping',
        duration: 'Weeks 7–9',
        topics: ['Typography scales, grid systems, and visual hierarchy principles', 'Modern design aesthetics: Glassmorphism, Neumorphism, and Dark Modes', 'Advanced interactive prototyping with variables, logic, and component states', 'Micro-interactions and motion design for heightened user delight'],
      },
      {
        title: 'Module 4: Usability Testing, Product Strategy & Portfolio',
        duration: 'Weeks 10–12',
        topics: ['Usability testing protocols, A/B testing, and cognitive walkthroughs', 'Design handoff workflows with Zeplin, Figma Dev Mode, and Design Tokens', 'Product analytics: Heatmaps, drop-off funnels, and UX KPIs', 'Creating two complete end-to-end case studies and publishing portfolio'],
      },
    ],
    projects: [
      {
        name: 'Fintech Neo-Banking App & Design System',
        description: 'Complete mobile & web banking experience featuring biometric security, instant peer-to-peer transfers, investment vaults, and a 120+ component Figma design system.',
        tech: ['Figma', 'Auto Layout', 'Design Systems', 'Prototyping', 'WCAG 2.1'],
      },
      {
        name: 'Healthcare AI Telemedicine Patient Portal',
        description: 'End-to-end research, wireframing, and interactive prototype for booking appointments, video consultations, and instant AI prescription summaries.',
        tech: ['User Research', 'Figma', 'Usability Testing', 'Wireframing', 'Miro'],
      },
    ],
    tools: ['Figma', 'FigJam', 'Miro', 'Adobe XD', 'Notion', 'Zeplin', 'Maze Usability', 'ProtoPie', 'Illustrator'],
    careerRoles: ['UI/UX Designer', 'Product Designer', 'Interaction Designer', 'UX Researcher', 'Design Systems Lead'],
    salaryRange: '₹6.5 LPA – ₹18.0 LPA',
    hiringPartners: ['Swiggy', 'Zomato', 'CRED', 'Razorpay', 'Paytm', 'Microsoft', 'Thoughtworks'],
  },

  'hr-analytics': {
    modules: [
      {
        title: 'Module 1: HR Metrics, Workforce Data & Strategic Alignment',
        duration: 'Weeks 1–3',
        topics: ['Key HR KPIs: Attrition rate, Time to Fill, Cost per Hire, and eNPS', 'Workforce headcount planning, demographic shifts, and diversity metrics', 'Data cleaning & hygiene on employee records using Power Query', 'HR Compliance, GDPR, and employee data privacy guidelines'],
      },
      {
        title: 'Module 2: Advanced Excel for People Operations',
        duration: 'Weeks 4–6',
        topics: ['Dynamic formulas, multi-criteria lookups, and nested logic', 'Pivot tables, slicers, and executive headcount reporting models', 'Compensation and benefits modeling, salary benchmarks, and parity checks', 'Performance appraisal rating distributions and 9-box grid modeling'],
      },
      {
        title: 'Module 3: SQL for Human Resources Data Systems',
        duration: 'Weeks 7–9',
        topics: ['Querying HR Information Systems (HRIS) and Applicant Tracking Systems (ATS)', 'Aggregating promotion histories, salary progression, and tenure', 'Window functions to calculate rolling turnover rates and retention cohorts', 'Building automated views for executive HR reporting'],
      },
      {
        title: 'Module 4: Predictive HR Analytics & Power BI Dashboards',
        duration: 'Weeks 10–12',
        topics: ['Power BI Desktop: DAX calculations for HR dashboards', 'Predictive modeling in Python: Employee turnover & attrition risk classification', 'Sentiment analysis on employee engagement survey comments', 'Presenting data-driven talent acquisition strategies to leadership'],
      },
    ],
    projects: [
      {
        name: 'Enterprise Employee Attrition & Early Warning System',
        description: 'Analyzed 15,000 employee records with Python and Power BI to identify the top 5 predictors of voluntary resignation with 89% accuracy.',
        tech: ['Power BI', 'DAX', 'Python', 'Pandas', 'Excel'],
      },
      {
        name: 'Executive Talent Acquisition & Diversity Dashboard',
        description: 'Built an interactive Power BI dashboard tracking hiring funnel velocities, recruiter productivity, and regional diversity equity targets.',
        tech: ['Power BI', 'SQL', 'Power Query', 'HRIS Analytics'],
      },
    ],
    tools: ['Power BI', 'Excel', 'SQL', 'Python', 'Pandas', 'DAX', 'Tableau', 'HRIS Platforms'],
    careerRoles: ['HR Analytics Specialist', 'People Operations Analyst', 'Compensation & Benefits Analyst', 'Workforce Planning Consultant'],
    salaryRange: '₹6.0 LPA – ₹16.0 LPA',
    hiringPartners: ['Deloitte', 'Accenture', 'Genpact', 'TCS', 'Cognizant', 'Amazon HR', 'Wipro'],
  },

  autocad: {
    modules: [
      {
        title: 'Module 1: 2D Drafting Principles & Precision Geometry',
        duration: 'Weeks 1–3',
        topics: ['AutoCAD interface, coordinate systems (Cartesian & Polar), and drafting settings', 'Drawing tools: Lines, Polylines, Circles, Arcs, and Splines', 'Modification commands: Trim, Extend, Fillet, Chamfer, Offset, and Array', 'Object snaps, polar tracking, and precision dimensional drafting'],
      },
      {
        title: 'Module 2: Layer Management, Annotation & Standards',
        duration: 'Weeks 4–6',
        topics: ['Layer architectures, line weights, line types, and color standards', 'Dimensioning standards (ISO/ANSI), tolerances, and geometric dimensioning (GD&T)', 'Dynamic Blocks, attributes, and automated bill of materials (BOM) creation', 'External References (XREFs) and collaborative multi-sheet layouts'],
      },
      {
        title: 'Module 3: 3D Solid Modeling & Surface Construction',
        duration: 'Weeks 7–9',
        topics: ['3D Workspace, ViewCube, and User Coordinate System (UCS) navigation', 'Creating 3D solids: Extrude, Revolve, Loft, and Sweep commands', 'Boolean operations: Union, Subtract, and Intersect', 'Surface modeling, mesh editing, and converting 2D plans into photorealistic 3D structures'],
      },
      {
        title: 'Module 4: Rendering, Documentation & Sheet Sets',
        duration: 'Weeks 10–12',
        topics: ['Materials mapping, photometric lighting, and camera perspective setups', 'Photorealistic rendering in AutoCAD and export settings', 'Paper space layout creation, viewports, and custom scale factors', 'Plotting, Sheet Set Manager, and publishing multi-page PDF project documentation'],
      },
    ],
    projects: [
      {
        name: 'Commercial Multi-Story Architectural Floor Plan & 3D Render',
        description: 'Designed full 2D civil drafting, electrical layout, structural cross-sections, and photorealistic 3D interior render for a commercial office complex.',
        tech: ['AutoCAD 2024', '3D Modeling', 'Photorealistic Rendering', 'Sheet Sets'],
      },
      {
        name: 'Precision Mechanical Transmission Assembly (GD&T)',
        description: 'Created manufacturing-ready mechanical drafting with detailed orthographic projections, section views, and bill of materials for an automotive gearbox.',
        tech: ['AutoCAD Mechanical', 'GD&T', 'Dynamic Blocks', 'ISO Standards'],
      },
    ],
    tools: ['AutoCAD 2024', 'AutoCAD 3D', 'Autodesk Fusion', 'Autodesk Design Review', 'KiCAD', 'PDF Publishing Tools'],
    careerRoles: ['CAD Design Engineer', 'Architectural Drafter', 'Mechanical Design Technician', 'Civil Drafting Specialist', '3D CAD Modeler'],
    salaryRange: '₹5.5 LPA – ₹15.0 LPA',
    hiringPartners: ['L&T Construction', 'Tata Projects', 'Bechtel', 'Mahindra Engineering', 'Shapoorji Pallonji', 'DLF'],
  },

  'digital-marketing': {
    modules: [
      {
        title: 'Module 1: Search Engine Optimization (SEO) & Content Strategy',
        duration: 'Weeks 1–3',
        topics: ['Keyword research with Semrush, Ahrefs, and Google Keyword Planner', 'On-Page SEO: Title tags, meta descriptions, header structures, and internal linking', 'Technical SEO: XML sitemaps, robots.txt, Core Web Vitals, and schema markup', 'Off-Page SEO: Link building strategies, digital PR, and domain authority growth'],
      },
      {
        title: 'Module 2: Google Ads (SEM), PPC & Paid Search',
        duration: 'Weeks 4–6',
        topics: ['Google Search Ads: Quality Score, bidding strategies (tCPA, tROAS), and ad copy', 'Display Network & YouTube Video Ads targeting and audience creation', 'Performance Max (PMax) campaigns and Google Shopping for e-commerce', 'Conversion tracking with Google Tag Manager (GTM) and GA4 integration'],
      },
      {
        title: 'Module 3: Social Media Marketing (Meta Ads & LinkedIn Ads)',
        duration: 'Weeks 7–9',
        topics: ['Meta Ads Manager (Facebook & Instagram): Pixel tracking and Conversions API (CAPI)', 'Custom & Lookalike Audiences, funnel targeting (TOFU, MOFU, BOFU)', 'LinkedIn B2B Lead Generation campaigns and Account-Based Marketing (ABM)', 'Influencer marketing, viral short-form video strategy (Reels/Shorts), and Canva design'],
      },
      {
        title: 'Module 4: Marketing Automation, Email Funnels & GA4 Analytics',
        duration: 'Weeks 10–12',
        topics: ['Email marketing funnels with Mailchimp & HubSpot: Welcome sequences and drip campaigns', 'Landing page conversion rate optimization (CRO) and A/B split testing', 'Google Analytics 4 (GA4): Event tracking, exploration reports, and attribution modeling', 'Managing comprehensive multi-channel digital marketing campaigns and budgets'],
      },
    ],
    projects: [
      {
        name: 'Multi-Channel D2C E-Commerce Growth Campaign (4.8x ROAS)',
        description: 'Engineered a full-funnel digital marketing campaign utilizing Meta Ads, Google Shopping, and automated email abandoned cart sequences yielding 4.8x Return on Ad Spend.',
        tech: ['Meta Ads Manager', 'Google Ads', 'GA4', 'Shopify', 'Mailchimp'],
      },
      {
        name: 'B2B Enterprise SaaS Lead Generation Funnel',
        description: 'Implemented an inbound SEO content cluster paired with targeted LinkedIn Sponsored Content, generating 450+ qualified enterprise sales leads.',
        tech: ['LinkedIn Campaign Manager', 'Semrush', 'HubSpot', 'WordPress', 'Google Tag Manager'],
      },
    ],
    tools: ['Google Ads', 'Meta Ads Manager', 'Google Analytics 4', 'Semrush', 'Ahrefs', 'Google Tag Manager', 'HubSpot', 'Mailchimp', 'Canva', 'WordPress'],
    careerRoles: ['Digital Marketing Manager', 'Performance Marketing Specialist', 'SEO / Content Strategist', 'Growth Hacker', 'Social Media Campaign Lead'],
    salaryRange: '₹6.0 LPA – ₹17.0 LPA',
    hiringPartners: ['Dentsu', 'Ogilvy', 'Zomato', 'Nykaa', 'GrowthX', 'GroupM', 'Amazon Marketing'],
  },
}
