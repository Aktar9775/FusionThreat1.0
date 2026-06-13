import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Zap, BarChart3, Users, Shield, Send, AlertCircle, Cloud, Eye, Target, Search } from 'lucide-react';
import { handleConsultationBooking } from '../../services/emailService';

const serviceDetailsData = {
  monitoring: {
    title: 'Centralized SIEM log analysis',
    subtitle: 'Continuous Visibility Across All Your Infrastructure',
    heroDescription: 'Real-time threat detection with centralized SIEM log analysis, multi-source correlation, and automated alerting.',
    
    what: 'Our 24/7 Monitoring & Triage service provides continuous surveillance of your entire IT infrastructure across endpoints, networks, cloud platforms, and on-premises systems. A team of certified SOC analysts monitors your environment 24/7/365 to detect, analyze, and triage security threats in real-time, providing immediate alerts and contextual threat intelligence.',
    
    whyImportant: 'Threats evolve every second. Manual monitoring is impossible. Without 24/7 monitoring, breaches can go undetected for weeks (average is 278 days). Real-time detection minimizes dwell time, reduces breach impact, and prevents lateral movement. Early threat detection is the difference between a minor incident and a catastrophic breach.',
    
    howItWorks: 'We deploy monitoring agents across your infrastructure that stream logs and events to our centralized SIEM. Our AI-powered correlation engine processes millions of events daily, identifying suspicious patterns. Certified analysts review high-priority alerts within minutes, validate threats, and provide you with immediate notifications and recommended actions.',
    
    betterThanOthers: 'While competitors offer basic log monitoring, FusionThreat combines AI-driven threat detection with 24/7 human expertise. We reduce false positives by 95% through behavioral analysis, provide 5-minute response times (vs. industry average of 30+ minutes), and offer compliance-ready reporting. Our team has 100+ years combined SOC experience.',
    
    advantages: [
      'Reduce Mean Time to Detection (MTTD) from hours to minutes',
      'Sleep peacefully knowing experts monitor threats 24/7',
      'Immediate threat alerts with context and recommended actions',
      'Proven 99.9% monitoring uptime SLA',
      'Expert analysts who understand your business',
      'Automated + human validation prevents alert fatigue',
    ],
    
    keyAdvantages: 'FusionThreat provides AI-powered threat correlation with 24/7 human validation, reducing false positives by 95%. Our analysts respond in under 5 minutes with actionable intelligence. We integrate with 500+ security tools and provide compliance-ready reports (SOC 2, ISO 27001).',
    
    businessImpact: 'Reduce your breach response time from days to minutes. Prevent lateral movement with early detection. Meet compliance requirements automatically. Gain visibility into threats competitors miss. Achieve continuous security hygiene without building an expensive internal SOC.',
    
    industries: [
      'Financial Services & Banking',
      'Healthcare & HIPAA-regulated',
      'E-commerce & Retail',
      'Manufacturing & Industrial Control',
      'Government & Defense',
      'Education & Research',
      'Energy & Utilities',
      'Telecommunications',
    ],
    
    keyBenefits: [
      { icon: Clock, title: 'Always Watching', desc: '24/7/365 monitoring with sub-5 minute detection times' },
      { icon: Zap, title: 'Lightning Fast', desc: 'Automated + human validation for zero false negatives' },
      { icon: BarChart3, title: 'Full Visibility', desc: 'Cloud, network, and endpoint coverage in one dashboard' },
      { icon: Shield, title: 'Rapid Response', desc: 'Immediate alerts to your team with contextual threat intelligence' },
    ],
    features: [
      'Centralized SIEM log analysis from all sources',
      'Real-time multi-source threat correlation',
      'Automated threat scoring and prioritization',
      'AWS, Azure, GCP, on-premises integration',
      'Custom alerting rules based on your environment',
      'Compliance-ready audit trails',
    ],
    process: [
      { step: '1', title: 'Integration', desc: 'We connect your SIEM, cloud platforms, and endpoints to our SOC' },
      { step: '2', title: 'Baseline', desc: 'Our team establishes normal behavior patterns for your environment' },
      { step: '3', title: 'Monitoring', desc: '24/7 analysts review alerts and correlate threats in real-time' },
      { step: '4', title: 'Escalation', desc: 'Critical threats are immediately escalated with recommended actions' },
    ],
    pricing: '$ 50,000 - $ 150,000 / month',
    caseStudy: 'Enterprise with 500+ devices reduced mean time to detection (MTTD) from 6 hours to 12 minutes',
    
    faqs: [
      {
        q: 'What is the difference between 24/7 monitoring and standard SIEM?',
        a: 'Standard SIEM is a tool; 24/7 monitoring is a managed service. We provide both the SIEM tool AND certified analysts who watch it continuously, validate threats, and provide immediate response recommendations. You get expert eyes 24/7 without the cost of building an in-house SOC.',
      },
      {
        q: 'How quickly will FusionThreat detect threats in my environment?',
        a: 'We detect and alert on threats within 5 minutes of occurrence. Our AI processes millions of events per second, and our analysts validate high-priority alerts within minutes. This is 10-50x faster than industry average.',
      },
      {
        q: 'Will your monitoring cause network performance issues?',
        a: 'No. Our monitoring agents use less than 2% CPU and consume minimal bandwidth. They are purpose-built for security visibility without performance impact. We work with your infrastructure, not against it.',
      },
      {
        q: 'What happens if we detect a threat?',
        a: 'You receive an immediate alert with: threat type, affected systems, risk level, and recommended actions. Your account manager calls if critical. We provide 24/7 support and can escalate to our incident response team if needed.',
      },
      {
        q: 'Can you monitor our AWS/Azure/GCP cloud infrastructure?',
        a: 'Absolutely. We are cloud-native and provide deep visibility into AWS, Azure, GCP, and hybrid environments. We monitor cloud-specific threats like IAM abuse, misconfiguration, and lateral movement.',
      },
      {
        q: 'How much logging will be generated, and what is the cost?',
        a: 'Typical organizations generate 500GB-5TB of logs daily. Our pricing covers unlimited logs. We compress, archive, and manage retention per compliance requirements (default 90 days, extendable to 7 years).',
      },
      {
        q: 'Will FusionThreat help us pass compliance audits?',
        a: 'Yes. We generate SOC 2 Type II, ISO 27001, GDPR, HIPAA, and PCI-DSS compliant reports. Our monitoring is audit-ready, and we provide evidence for your auditors automatically.',
      },
      {
        q: 'What if we already have a SIEM? Do we need to replace it?',
        a: 'No. We integrate with 500+ security tools including Splunk, ELK, ArcSight, and Sentinel. We can consume your existing logs and add our expert analysis on top.',
      },
      {
        q: 'Can we escalate to incident response if we detect a breach?',
        a: 'Yes. Our incident response team is on standby. If a critical incident is detected, we can escalate within minutes. Your monitoring seamlessly transitions to investigation and containment.',
      },
      {
        q: 'How do you prevent alert fatigue from false positives?',
        a: 'We use AI behavioral analysis to understand your normal traffic patterns. Only anomalies that match real attack signatures are escalated. Our validation process eliminates 95% of false positives.',
      },
    ],
  },

  incident: {
    title: 'Incident Response',
    subtitle: 'Eliminate Threats Before They Cause Damage',
    heroDescription: 'Expert incident response team with guaranteed SLAs, isolation, containment, and forensic analysis.',
    
    what: 'When a breach occurs, every second counts. Our Incident Response service provides expert external support to detect, contain, investigate, and recover from security incidents. Our team has responded to 500+ breaches, from ransomware to data theft to insider threats.',
    
    whyImportant: 'The average breach costs ₹5-10 Crores and takes 200+ days to detect. Without expert IR, attackers move laterally, exfiltrate data, and cause exponential damage. Our service ensures immediate containment within 15 minutes, stops attackers cold, and limits financial impact.',
    
    howItWorks: 'When an incident occurs, you call us. Our IR team immediately begins containment: isolate affected systems, kill attacker processes, reset credentials, and block command-and-control servers. In parallel, we preserve forensic evidence and analyze the attack vector. We then provide post-incident reports with root cause and hardening recommendations.',
    
    betterThanOthers: 'Most competitors take 2-4 hours to respond; we respond in 15 minutes. We don\'t just tell you what happened—we stop the attack in real-time. Our team includes former NSA/military incident responders with expertise in ransomware, APT, data theft, and insider threats. We have a 99% containment success rate.',
    
    advantages: [
      'Guaranteed <15 minute response for critical incidents',
      'Proven 99% attack containment success rate',
      'Forensic evidence preservation for law enforcement',
      'Post-incident hardening recommendations',
      'Cyber insurance coordination and support',
      '24/7 escalation hotline with zero hold time',
    ],
    
    keyAdvantages: 'FusionThreat provides <15 minute incident response with military-grade forensics. Our team stops attackers in real-time, preserves evidence for law enforcement, and prevents data exfiltration. We recover systems 3x faster than competitors.',
    
    businessImpact: 'Turn a ₹5 Crore breach into a ₹50 Lakh containment. Stop ransomware encryption before it spreads. Prevent data exfiltration. Meet breach notification deadlines. Maintain customer trust and avoid media coverage. Reduce business downtime from days to hours.',
    
    industries: [
      'Financial Services & Banking',
      'Healthcare & HIPAA-regulated',
      'Critical Infrastructure',
      'Government & Defense',
      'E-commerce & Retail',
      'Manufacturing & Ransomware Targets',
      'Law Firms & Legal Services',
      'Insurance & Risk Management',
    ],
    
    keyBenefits: [
      { icon: Zap, title: 'Critical Response <15 min', desc: 'Critical incidents contained within 15 minutes SLA' },
      { icon: Shield, title: 'Containment First', desc: 'Immediate threat isolation to stop attack propagation' },
      { icon: Users, title: 'Expert Analysts', desc: 'Veteran IR specialists with 100+ incident handling experience' },
      { icon: BarChart3, title: 'Post-Incident Reports', desc: 'Comprehensive forensics and root cause analysis' },
    ],
    features: [
      'Guaranteed response SLAs for critical incidents',
      'Threat isolation and lateral movement prevention',
      'Forensic evidence preservation and analysis',
      'Attacker TTPs identification and documentation',
      'Endpoint cleanup and patch deployment',
      'Post-incident advisory and hardening',
    ],
    process: [
      { step: '1', title: 'Detection', desc: 'Alert triggers immediate IR team mobilization' },
      { step: '2', title: 'Analysis', desc: 'Quick scope assessment - what, when, where, impact' },
      { step: '3', title: 'Containment', desc: 'Isolate affected systems and block attacker access' },
      { step: '4', title: 'Recovery', desc: 'Clean systems, restore from backups, and strengthen defenses' },
    ],
    pricing: '$ 75,000 - $ 200,000 / month (+ incident fees)',
    caseStudy: 'Mid-market company detected ransomware spread. Contained within 8 minutes, saved ₹ 2+ Crores',
    
    faqs: [
      {
        q: 'What constitutes a "critical" incident vs. standard incident?',
        a: 'Critical: Active data exfiltration, ransomware encryption, large-scale breach, or infrastructure compromise. Standard: contained exploits, single compromised account, or limited malware. We respond to critical in 15 minutes, standard in 4 hours.',
      },
      {
        q: 'Can your IR team work with law enforcement on criminal investigations?',
        a: 'Yes. We coordinate with FBI, CBI, and local law enforcement. We preserve chain-of-custody evidence, provide forensic reports admissible in court, and support criminal prosecution. Our team has TOP SECRET clearances.',
      },
      {
        q: 'What is the total cost of an incident response engagement?',
        a: 'Monthly retainer is ₹75,000-200,000. Per-incident cost (if not retainer) is ₹2-5 Lakhs for rapid response + analysis. Most customers choose retainer to ensure immediate response.',
      },
      {
        q: 'How do you stop ransomware encryption once it starts?',
        a: 'We identify infected systems by network behavior and process analysis, isolate them from the network, kill encryption processes, and reset credentials. If caught early (first 30 minutes), 90% of encryption can be prevented.',
      },
      {
        q: 'Will an incident response engagement work with our cyber insurance?',
        a: 'Yes. We coordinate with all major cyber insurance carriers. We provide forensic reports, evidence of investigation, and impact assessment to streamline insurance claims. Most policies cover our fees.',
      },
      {
        q: 'What if we discover stolen data? Can you verify what was accessed?',
        a: 'Yes. We analyze database logs, file access logs, and network traffic to identify exactly what data was accessed or stolen. We provide a forensic report detailing affected records for breach notification.',
      },
      {
        q: 'Can you help us meet breach notification deadlines?',
        a: 'Absolutely. We understand regulatory timelines (72 hours for GDPR, 60 days for CCPA). We provide rapid initial impact assessment so you can notify regulators on time, with full forensic details to follow.',
      },
      {
        q: 'What if the attacker is still inside our network during response?',
        a: 'Our containment strategy includes immediate network segmentation, disabling lateral movement paths, and resetting all credentials. We hunt for attacker persistence mechanisms and remove them. Most attackers are expelled within 2 hours.',
      },
      {
        q: 'How do you prevent the same incident from happening again?',
        a: 'After containment, we provide a hardening roadmap addressing the root cause: patch missing updates, reconfigure firewalls, reset exposed credentials, deploy threat hunting rules. We recommend changes to prevent similar attacks.',
      },
      {
        q: 'Do you provide forensic reports my insurance company will accept?',
        a: 'Yes. Our forensic reports are ISO 27037 compliant and admissible in court. Insurance carriers recognize FusionThreat reports and use them to process claims immediately, often without additional investigation.',
      },
    ],
  },
  vulnerability: {
    title: ' Vulnerability Management',
    subtitle: 'Find Security Gaps Before Attackers Do',
    heroDescription: 'Monthly vulnerability assessments, penetration testing, and prioritized remediation roadmaps.',
    
    what: 'Vulnerability Management is the systematic process of identifying, classifying, prioritizing, and remediating security flaws in your applications, infrastructure, and cloud environment. We perform continuous scanning combined with manual penetration testing to ensure nothing slips through.',
    
    whyImportant: 'Attackers exploit known vulnerabilities first because they are easiest to leverage. Without regular scanning, your systems become increasingly vulnerable. Organizations with unpatched vulnerabilities face 5x higher breach risk. Regulatory frameworks (GDPR, HIPAA, SOC 2) mandate regular vulnerability assessments.',
    
    howItWorks: 'We deploy automated scanners that continuously search your infrastructure for known vulnerabilities. High-risk findings are manually tested by our penetration testing team to confirm exploitability. Results are prioritized by risk level, exploitability, and business impact. We provide step-by-step remediation guidance and validation testing.',
    
    betterThanOthers: 'Most vulnerability services run quarterly scans and produce large lists of findings. FusionThreat provides continuous scanning, manual validation to eliminate false positives, exploitability testing, and prioritization. We focus on what truly impacts your business, not noise.',
    
    advantages: [
      'Continuous vulnerability scanning vs. quarterly',
      'Manual penetration testing to validate real exploitability',
      'Automated remediation verification and validation',
      'Compliance-ready vulnerability reports',
      'Priority-based remediation roadmap',
      'Integration with patch management workflows',
    ],
    
    keyAdvantages: 'FusionThreat combines automated scanning with expert manual validation, reducing false positives by 98%. We prioritize by real business impact, not alert noise. Our team tests exploitability so you patch what truly matters.',
    
    businessImpact: 'Eliminate the most dangerous vulnerabilities before attackers find them. Reduce your patch backlog from 1000+ to 50 critical issues. Meet compliance requirements automatically. Reduce breach risk by 90%. Extend system longevity by addressing security gaps.',
    
    industries: [
      'Healthcare & Medical Device Companies',
      'Financial Services & Banking',
      'E-commerce & Retail',
      'Software Development & SaaS',
      'Manufacturing & Industrial Control Systems',
      'Telecommunications',
      'Government & Defense Contractors',
      'Energy & Utilities',
    ],
    
    keyBenefits: [
      { icon: Search, title: 'Monthly Scanning', desc: 'Regular vulnerability assessments across infrastructure' },
      { icon: Zap, title: 'Critical Patching <24h', desc: 'Critical vulnerabilities patched within 24 hours' },
      { icon: BarChart3, title: 'Penetration Testing', desc: 'Real-world attack simulations with remediation guidance' },
      { icon: Shield, title: 'Risk Roadmap', desc: 'Prioritized remediation plan based on exploitability' },
    ],
    features: [
      'Monthly automated vulnerability scans',
      'Manual penetration testing quarterly',
      'Critical patch deployment <24 hours',
      'Web application security testing',
      'API security assessment',
      'Remediation guidance and validation',
    ],
    process: [
      { step: '1', title: 'Discovery', desc: 'Comprehensive scan of all systems, networks, and applications' },
      { step: '2', title: 'Analysis', desc: 'Manual verification and risk prioritization' },
      { step: '3', title: 'Remediation', desc: 'Recommended fixes with step-by-step guidance' },
      { step: '4', title: 'Validation', desc: 'Verify patches and retest to confirm vulnerability closure' },
    ],
    pricing: '₹ 40,000 - ₹ 120,000 / month',
    caseStudy: 'SaaS company found 156 vulnerabilities, 12 critical. All patched within 3 weeks',
    
    faqs: [
      {
        q: 'What is the difference between a vulnerability scan and penetration testing?',
        a: 'Scanning is automated; penetration testing is manual. Scanning finds potential issues quickly and cost-effectively. Penetration testing confirms if issues are truly exploitable. FusionThreat does both: monthly scans + quarterly manual penetration testing.',
      },
      {
        q: 'How often should we scan for vulnerabilities?',
        a: 'Compliance frameworks require at least quarterly. Best practice is monthly. FusionThreat recommends continuous scanning for critical systems, monthly for standard systems, and quarterly for low-risk systems.',
      },
      {
        q: 'What if we find 1000+ vulnerabilities? Which should we patch first?',
        a: 'We prioritize by: (1) Criticality (CVSS score), (2) Exploitability (is a public exploit available?), (3) Exposure (is the system internet-facing?), (4) Business impact. We typically recommend patching top 50 first.',
      },
      {
        q: 'Can we get a vulnerability scan report for our compliance audit?',
        a: 'Absolutely. We generate PCI-DSS, ISO 27001, SOC 2, GDPR, and HIPAA-compliant reports. Reports include methodology, findings, remediation, and validation steps—everything auditors require.',
      },
      {
        q: 'What is a false positive in vulnerability scanning?',
        a: 'A false positive is a vulnerability alert that doesn\'t actually apply to your system. Example: scanner reports PHP vulnerability, but you don\'t use PHP. We manually validate each finding to eliminate false positives.',
      },
      {
        q: 'How do you test if a web application is vulnerable to SQL injection?',
        a: 'We craft special SQL commands that attempt to break out of database queries. If the application doesn\'t properly validate input, the SQL executes and we confirm the vulnerability. This is done safely without damaging data.',
      },
      {
        q: 'What if patching a vulnerability will break our application?',
        a: 'We work with your team to test patches in staging environment first. If a patch breaks functionality, we find alternative fixes, apply vendor recommendations, or implement compensating controls (e.g., network segmentation).',
      },
      {
        q: 'How do you find vulnerabilities in custom-built applications?',
        a: 'We perform manual source code review, dynamic application testing (running the app and attacking it), and architecture analysis. We identify common flaws like injection, broken authentication, sensitive data exposure, and insecure dependencies.',
      },
      {
        q: 'Can you test cloud infrastructure (AWS/Azure/GCP) for vulnerabilities?',
        a: 'Yes. We scan for cloud-specific misconfigurations: overly permissive security groups, unencrypted storage, exposed credentials, weak IAM policies, and unpatched cloud services. Cloud vulnerabilities are often more dangerous than traditional ones.',
      },
      {
        q: 'What is a zero-day vulnerability and can you detect it?',
        a: 'A zero-day is a vulnerability that vendors haven\'t discovered yet—no patch exists. Traditional scanning can\'t detect zero-days. We use behavioral analysis and threat intelligence to identify suspicious patterns that might indicate zero-day exploitation. FusionThreat threat hunters can identify zero-days through proactive hunting.',
      },
    ],
  },
  compliance: {
    title: ' Compliance Enablement',
    subtitle: 'Navigate Regulations With Automated Dashboards',
    heroDescription: 'GDPR, HIPAA, SOC 2, ISO 27001 compliance with automated reporting and audit support.',
    
    what: 'Compliance Enablement means using security controls and automation to meet regulatory requirements. We implement the policies, technology, and monitoring needed to satisfy GDPR, HIPAA, SOC 2 Type II, ISO 27001, PCI-DSS, and other frameworks without the complexity.',
    
    whyImportant: 'Non-compliance penalties are severe: GDPR fines up to 4% of revenue, HIPAA up to ₹1.5 Crores per violation, SOC 2 required by SaaS customers. Beyond penalties, compliance shows customers you take security seriously. Most B2B deals require SOC 2 certification. Compliance = competitive advantage.',
    
    howItWorks: 'We map your infrastructure to regulatory requirements (control gap analysis), implement missing controls, deploy compliance monitoring, and automate evidence collection. Each month, our automated dashboards generate compliance status reports. When auditors arrive, evidence is already collected and organized.',
    
    betterThanOthers: 'Most consultants do compliance after-the-fact, requiring massive remediation. We build compliance into security operations from day one. Our automation collects evidence continuously, reducing audit prep from 3 months to 1 week. We pass first-time audits 99% of the time.',
    
    advantages: [
      'Automated compliance monitoring and evidence collection',
      'First-time audit success rate 99%',
      'Reduce audit prep time from 3 months to 1 week',
      'Regulatory update alerts (new regulations in your industry)',
      'Multi-framework compliance (GDPR + HIPAA + SOC 2 + ISO)',
      'Audit support with certified consultants',
    ],
    
    keyAdvantages: 'FusionThreat automates compliance so you don\'t manually collect evidence. We continuously monitor controls, generate monthly compliance dashboards, and provide evidence your auditors will accept. No surprise findings.',
    
    businessImpact: 'Achieve compliance certifications faster. Reduce audit costs by 75% through automation. Meet customer requirements (SOC 2) required for sales. Avoid multi-million rupee fines. Build customer trust through verified compliance.',
    
    industries: [
      'SaaS & Software Companies',
      'Healthcare & HIPAA-regulated',
      'Financial Services & Banking',
      'E-commerce & Payment Processing',
      'Insurance & Risk Management',
      'Government & Defense Contractors',
      'Telecom & Data Processing',
      'Legal & Compliance Services',
    ],
    
    keyBenefits: [
      { icon: CheckCircle, title: 'Automated Dashboards', desc: 'Real-time compliance status for all frameworks' },
      { icon: Users, title: 'Audit Support', desc: 'Full audit preparation and evidence collection' },
      { icon: BarChart3, title: 'Gap Analysis', desc: 'Identify compliance gaps and remediation steps' },
      { icon: Shield, title: 'Evidence Ready', desc: 'Always-ready audit evidence and reporting' },
    ],
    features: [
      'GDPR, HIPAA, SOC 2, ISO 27001 compliance automation',
      'Monthly compliance status dashboards',
      'Gap analysis and remediation roadmaps',
      'Audit preparation and support',
      'Evidence collection and documentation',
      'Regulatory update alerts',
    ],
    process: [
      { step: '1', title: 'Assessment', desc: 'Map your infrastructure to compliance requirements' },
      { step: '2', title: 'Automation', desc: 'Deploy compliance monitoring and evidence collection' },
      { step: '3', title: 'Reporting', desc: 'Monthly compliance status and gap reports' },
      { step: '4', title: 'Remediation', desc: 'Guided closure of compliance gaps' },
    ],
    pricing: '₹ 60,000 - ₹ 180,000 / month',
    caseStudy: 'FinTech startup achieved ISO 27001 certification in 6 months with our automation',
    
    faqs: [
      {
        q: 'What is the difference between GDPR, HIPAA, SOC 2, and ISO 27001?',
        a: 'GDPR: EU data protection regulation (4% of revenue fine for breach). HIPAA: US health data protection (₹1.5 Cr fine). SOC 2: Audit framework proving IT controls to customers (required for SaaS). ISO 27001: Information security certification (required in many industries).',
      },
      {
        q: 'Do we need all four certifications?',
        a: 'It depends on your business. If you\'re SaaS, you need SOC 2. If EU data, you need GDPR. If health data, you need HIPAA. If data processing, ISO 27001 helps. Many organizations pursue multiple for competitive advantage.',
      },
      {
        q: 'How long does SOC 2 Type II certification take?',
        a: 'SOC 2 Type II requires 6 months of control operation before audit. With FusionThreat automation, you can achieve certification in 6-9 months. Without automation, it takes 12-18 months due to evidence collection challenges.',
      },
      {
        q: 'What is a "control" and how many controls do I need?',
        a: 'A control is a security measure that prevents or detects violations. SOC 2 requires ~75 controls across availability, security, confidentiality, integrity, privacy. ISO 27001 requires ~114 controls. Don\'t worry—we handle most through automation.',
      },
      {
        q: 'What evidence do auditors want to see?',
        a: 'Auditors want proof that controls exist and work: policy documents, system logs proving monitoring, access logs, incident response records, patch records, training records, and vendor assessments. We automate evidence collection so you have everything ready.',
      },
      {
        q: 'How much does a SOC 2 audit cost?',
        a: 'SOC 2 Type II audit costs ₹5-15 Lakhs depending on complexity. With FusionThreat automation, you reduce audit effort by 40%, lowering auditor fees by ₹2-5 Lakhs.',
      },
      {
        q: 'What happens if we fail our audit?',
        a: 'If minor issues exist, auditors give you 30 days to remediate before re-audit. If major issues, you fail and must remediate thoroughly (may take 3-6 months). With FusionThreat, first-time pass rate is 99%.',
      },
      {
        q: 'Do we need to hire a compliance officer?',
        a: 'Not necessarily. FusionThreat serves as your compliance operations team. We monitor controls, collect evidence, perform gap analysis, and support your audit. You just need one person to coordinate with auditors.',
      },
      {
        q: 'How often do we get audited?',
        a: 'SOC 2 Type II audit is annual. ISO 27001 is annual after certification, then every 3 years. GDPR/HIPAA are ongoing—you\'re always under audit by regulators. Continuous monitoring (FusionThreat) prepares you for surprise inspections.',
      },
      {
        q: 'What if regulations change while we\'re certified?',
        a: 'Regulations change constantly. FusionThreat monitors regulatory updates and alerts you to changes affecting your industry. We help you adjust controls to meet new requirements, so your certification stays current.',
      },
    ],
  },
  hunting: {
    title: 'Threat Hunting',
    subtitle: 'Proactively Search for Hidden Threats',
    heroDescription: 'Hypothesis-driven threat hunting to find sophisticated threats that bypass automated detection.',
    
    what: 'Threat Hunting is proactive human-led investigation into your infrastructure to find sophisticated threats that automated systems miss. Unlike monitoring (which responds to alerts), hunting actively searches for indicators of compromise (IOCs), suspicious patterns, and attacker presence.',
    
    whyImportant: 'Advanced attackers hide by evading automated detection. The average APT remains in an environment for 200+ days undetected. Threat hunting finds these hidden threats, removes attackers before they cause damage, and creates detection rules so similar attacks are caught automatically next time.',
    
    howItWorks: 'Our hunters develop hypotheses based on threat intelligence (e.g., "attackers often steal Windows credential hashes"). They then search your logs, network traffic, and endpoints for evidence matching that hypothesis. If found, they investigate the full attack chain, remove the attacker, and create detection rules.',
    
    betterThanOthers: 'Most security teams only react to alerts. FusionThreat proactively hunts for threats competitors miss. Our hunters have tracked APTs globally. We use XDR data, behavioral analysis, and threat intelligence to find sophisticated attacks within your environment.',
    
    advantages: [
      'Find APT-grade threats before they escalate',
      'Eliminate attackers competitors don\'t know exist',
      'Create detection rules for future prevention',
      'Reduce breach impact through early detection',
      'Meet "threat hunting" requirements in security tenders',
      'Prove security posture to investors/customers',
    ],
    
    keyAdvantages: 'FusionThreat hunters have tracked advanced persistent threats globally. We combine behavioral analysis, threat intelligence, and XDR data to find sophisticated threats that evade automated detection. We create detection rules so your monitoring catches similar attacks automatically.',
    
    businessImpact: 'Discover APT activity before mass data exfiltration. Remove attacker presence before they establish persistence. Win security tenders by demonstrating proactive threat hunting. Build a knowledge base of threats targeting your industry.',
    
    industries: [
      'Financial Services & Banking',
      'Government & Defense',
      'Critical Infrastructure & Energy',
      'Healthcare & Research',
      'Telecommunications',
      'Manufacturing & IP Protection',
      'E-commerce & Retail',
      'Aerospace & Defense Contractors',
    ],
    
    keyBenefits: [
      { icon: Search, title: 'Hypothesis-Driven', desc: 'Targeted hunting based on threat intelligence' },
      { icon: Zap, title: 'Behavioral Analysis', desc: 'Identify unusual patterns and anomalies' },
      { icon: Shield, title: 'IOC Discovery', desc: 'Find and eliminate indicators of compromise' },
      { icon: BarChart3, title: 'Detection Improvement', desc: 'New rules to detect similar attacks' },
    ],
    features: [
      'Weekly threat hunting campaigns',
      'Behavioral pattern and anomaly detection',
      'IOC identification and timeline analysis',
      'New detection rule creation',
      'Threat intelligence correlation',
      'Hunting reports and recommendations',
    ],
    process: [
      { step: '1', title: 'Hypothesis', desc: 'Develop hunting hypotheses from threat intelligence' },
      { step: '2', title: 'Investigation', desc: 'Dig into logs and behavioral data' },
      { step: '3', title: 'Discovery', desc: 'Identify hidden threats and compromise indicators' },
      { step: '4', title: 'Remediation', desc: 'Contain threats and create detection rules' },
    ],
    pricing: '₹ 55,000 - ₹ 150,000 / month',
    caseStudy: 'Threat hunt discovered APT activity that evaded automated detection for 8+ months',
    
    faqs: [
      {
        q: 'What is the difference between threat hunting and threat monitoring?',
        a: 'Monitoring is reactive (alerts on threats). Hunting is proactive (searches for threats). Both are needed: monitoring catches obvious threats; hunting catches sophisticated APTs and insider threats that evade detection.',
      },
      {
        q: 'How often should we perform threat hunting?',
        a: 'Weekly is ideal for high-risk organizations. Bi-weekly for standard organizations. Monthly minimum to stay ahead of threats. Each hunt takes 10-20 hours, so weekly requires significant analyst time (which is why it\'s part of our managed service).',
      },
      {
        q: 'What kind of threats does threat hunting find that monitoring misses?',
        a: 'Living-off-the-land attacks (using native tools like PowerShell), lateral movement, privilege escalation, data exfiltration over encrypted channels, insider threats, supply chain compromises, and long-term APT activity.',
      },
      {
        q: 'What is a hypothesis in threat hunting?',
        a: 'A hypothesis is an educated guess about attacker behavior based on threat intelligence. Example: "Attackers targeting financial firms often steal Windows credentials from Domain Controllers." Hunters then search logs to prove/disprove this hypothesis.',
      },
      {
        q: 'What data do you hunt through?',
        a: 'Windows event logs, network logs, DNS queries, proxy logs, firewall logs, cloud logs (AWS/Azure), endpoint forensics, database audit logs, and behavioral analytics. The more data sources, the better our hunting results.',
      },
      {
        q: 'How do you find "indicators of compromise" (IOCs)?',
        a: 'IOCs are forensic artifacts left by attackers: unusual file hashes, suspicious IP addresses, malicious domains, registry changes, scheduled tasks, persistence mechanisms. We search for these across all systems.',
      },
      {
        q: 'What happens when a hunt discovers an attacker?',
        a: 'We immediately notify you (emergency escalation if active). We preserve forensic evidence, identify attacker entry point, map their movement through your environment, find exfiltrated data, remove persistence mechanisms, and create detection rules.',
      },
      {
        q: 'Can threat hunting prevent insider threats?',
        a: 'Yes. Insider threats often show unusual patterns: accessing data outside their role, downloading large amounts of data, accessing systems during odd hours, or disabling logging. We can identify these patterns through behavioral hunting.',
      },
      {
        q: 'Do you provide threat hunting reports we can share with executives?',
        a: 'Yes. We provide executive summaries (key findings, risk level, remediation status) and technical reports (detailed attack timeline, IOCs, recommended controls). Reports are customized for board/investor presentations.',
      },
      {
        q: 'How does threat hunting help us win security tenders?',
        a: 'Many procurement teams ask "Do you perform threat hunting?" Having FusionThreat threat hunting demonstrates security maturity. We provide audit reports proving hunting frequency, findings, and remediation. This is a major competitive advantage in bids.',
      },
    ],
  },
  cloud: {
    title: ' Cloud Security',
    subtitle: 'Protect Your Cloud Infrastructure',
    heroDescription: 'Dedicated cloud monitoring and posture management for AWS, Azure, and GCP.',
    
    what: 'Cloud Security encompasses continuous monitoring of cloud infrastructure, detection of misconfigurations, threat detection, identity protection, and compliance automation across AWS, Azure, and GCP. Cloud threats are unique and require specialized expertise.',
    
    whyImportant: 'Clouds are attacked 60% more than on-premises systems. Misconfigurations account for 99% of cloud breaches (e.g., public S3 bucket exposing 1M customer records). Without cloud-specific monitoring, you\'re blind to threats and misconfigurations that hackers exploit.',
    
    howItWorks: 'We deploy cloud security agents into your AWS/Azure/GCP accounts. They continuously monitor IAM policies, storage permissions, network settings, and running workloads. Misconfigurations are flagged immediately with remediation steps. Threats (unauthorized access, data exfiltration) trigger instant alerts.',
    
    betterThanOthers: 'Generic security tools don\'t understand cloud specifics. FusionThreat is cloud-native with deep AWS, Azure, and GCP expertise. We find cloud misconfigurations competitors miss. We integrate cloud events with your on-premises SOC for unified visibility.',
    
    advantages: [
      'Cloud-native security (not bolted-on from on-premises)',
      'Multi-cloud coverage (AWS, Azure, GCP simultaneously)',
      'Automatic misconfiguration detection and remediation',
      'Container and serverless security built-in',
      'Compliance automation for cloud workloads',
      'Unified visibility across cloud and on-premises',
    ],
    
    keyAdvantages: 'FusionThreat provides cloud-native security with automatic misconfiguration remediation. We protect containers, serverless, and IaaS/PaaS workloads. We ensure your cloud stays compliant with GDPR, HIPAA, SOC 2 across all cloud providers.',
    
    businessImpact: 'Prevent public data exposure (S3 buckets, storage accounts). Stop unauthorized cloud access and insider threats. Meet cloud compliance requirements automatically. Scale security as you grow in cloud. Reduce cloud security costs by 40% through automation.',
    
    industries: [
      'SaaS & Cloud-Native Companies',
      'Financial Services & Banking',
      'Healthcare & Data-Intensive',
      'E-commerce & Retail',
      'Manufacturing & Digital Transformation',
      'Telecommunications & ISPs',
      'Media & Entertainment',
      'Research & Academic Institutions',
    ],
    
    keyBenefits: [
      { icon: Cloud, title: 'Cloud Workload Protection', desc: 'Container and VM security monitoring' },
      { icon: Shield, title: 'Identity & Access', desc: 'Detect unusual access patterns and privilege abuse' },
      { icon: Zap, title: 'Misconfiguration Detection', desc: 'Find and remediate cloud configuration errors' },
      { icon: BarChart3, title: 'Serverless Security', desc: 'Lambda, Functions, and container security' },
    ],
    features: [
      'AWS, Azure, GCP cloud workload monitoring',
      'Container and Kubernetes security',
      'IAM and identity threat detection',
      'Cloud misconfiguration scanning',
      'Serverless function monitoring',
      'Cloud data protection and DLP',
    ],
    process: [
      { step: '1', title: 'Integration', desc: 'Connect your AWS/Azure/GCP accounts securely' },
      { step: '2', title: 'Discovery', desc: 'Continuous discovery of cloud resources and configs' },
      { step: '3', title: 'Monitoring', desc: '24/7 monitoring for threats and misconfigurations' },
      { step: '4', title: 'Optimization', desc: 'Cloud security posture hardening' },
    ],
    pricing: '₹ 80,000 - ₹ 250,000 / month',
    caseStudy: 'Enterprise cloud deployment prevented 47 misconfigurations that could expose data',
    
    faqs: [
      {
        q: 'What is a cloud misconfiguration and why is it dangerous?',
        a: 'A misconfiguration is incorrect cloud settings. Example: S3 bucket with public read permissions (anyone on internet can access). Another example: overly broad IAM role (user can access resources they shouldn\'t). Misconfigurations account for 99% of cloud data breaches.',
      },
      {
        q: 'Do you support multi-cloud (AWS + Azure + GCP simultaneously)?',
        a: 'Yes. We support all three major clouds. We provide unified monitoring, compliance reporting, and threat alerts across all clouds from a single dashboard. Multi-cloud visibility prevents security gaps.',
      },
      {
        q: 'How do you protect Kubernetes and containers in the cloud?',
        a: 'We deploy pod security policies, scan container images for vulnerabilities, monitor pod behavior, and detect lateral movement within clusters. We protect both deployed containers and images in registries.',
      },
      {
        q: 'What about serverless security (AWS Lambda, Azure Functions)?',
        a: 'Serverless functions are trickier because they\'re ephemeral (spin up and down). We monitor function permissions, execution logs, and environmental variables for secrets. We detect unauthorized function invocations and suspicious data access.',
      },
      {
        q: 'Can you find compromised cloud credentials and API keys?',
        a: 'Yes. We scan source code repositories, logs, and configuration files for exposed credentials. We also monitor for unusual API key usage patterns (wrong source IP, wrong API, access during odd hours).',
      },
      {
        q: 'What if I use AWS, but my cloud vendor claims I\'m responsible for security?',
        a: 'That\'s "shared responsibility." AWS secures the cloud (infrastructure), you secure your config. FusionThreat handles your responsibility: monitoring workloads, detecting threats, fixing misconfigurations.',
      },
      {
        q: 'How do we know if our cloud is GDPR/HIPAA compliant?',
        a: 'We audit your cloud configuration against GDPR/HIPAA requirements: encryption, access controls, logging, data residency. We generate compliance reports showing what\'s compliant and what needs remediation.',
      },
      {
        q: 'What is the difference between cloud workload and cloud data protection?',
        a: 'Workload protection: monitoring VMs, containers, functions (compute). Data protection: monitoring databases, storage, backups (data at rest and in transit). Both are critical.',
      },
      {
        q: 'Can you help us migrate to cloud securely?',
        a: 'Yes. We provide pre-migration security design (how to configure your cloud securely), monitor during migration (detect issues in real-time), and post-migration hardening. We prevent security gaps during the transition.',
      },
      {
        q: 'What is a CSPM (Cloud Security Posture Management) tool?',
        a: 'CSPM is a tool that continuously scans cloud configurations against security best practices and compliance standards, finding misconfigurations and providing remediation. FusionThreat includes CSPM as part of our cloud security service.',
      },
    ],
  },
};

const subBranchesData = {
  monitoring: {
    'siem-analysis': {
      title: 'Centralized SIEM Log Analysis',
      subtitle: 'Unified Security Monitoring',
      what: 'SIEM (Security Information and Event Management) log analysis is the process of collecting, correlating, and analyzing security logs from all your IT infrastructure into one centralized dashboard. Our SIEM ingests logs from firewalls, routers, servers, applications, cloud platforms, and endpoints.',
      whyImportant: 'Without SIEM, logs are scattered across systems. Security breaches hide in noise. With SIEM, attackers cannot hide—every suspicious activity is logged, correlated, and analyzed. SIEM is the foundation of threat detection.',
      howItWorks: 'Logs stream from all sources to our SIEM. Our correlation engine applies 1000+ detection rules to identify suspicious patterns. When a threat is detected, analysts are alerted immediately with context.',
      betterThanOthers: 'Most competitors offer basic SIEM dashboards. FusionThreat adds AI-powered correlation and 24/7 analyst review. We reduce false positives by 95% through behavioral baseline learning.',
      advantages: ['Unified log visibility from 500+ sources', 'AI-powered threat correlation', '24/7 analyst review', 'Sub-5 minute alerts', 'Compliance-ready reporting', 'Historical log retention (90-7 years)'],
      keyAdvantages: 'FusionThreat SIEM correlates logs from all sources, eliminating blind spots. Our AI learns your normal behavior, so only true threats trigger alerts.',
      businessImpact: 'Know what\'s happening in your infrastructure 24/7. Catch threats within minutes instead of months. Meet compliance auditor requirements automatically.',
      industries: ['Financial Services', 'Healthcare', 'Manufacturing', 'Government', 'E-commerce', 'Telecommunications', 'Energy', 'Insurance'],
      faqs: [
        { q: 'How many logs will SIEM generate?', a: 'Typical enterprise: 500GB-5TB daily. FusionThreat covers unlimited. We compress and archive efficiently.' },
        { q: 'What if my current SIEM is not sufficient?', a: 'We integrate with existing SIEMs. Our analytics layer sits on top of your current investment.' },
        { q: 'How quickly can we deploy SIEM?', a: 'Within 1-2 weeks. Agents are lightweight and deploy via existing management tools.' },
        { q: 'Will SIEM slow down my network?', a: 'No. Agents use <2% CPU and minimal bandwidth. Zero performance impact.' },
        { q: 'Can SIEM detect zero-day attacks?', a: 'Not directly. But behavioral SIEM can detect anomalies that indicate zero-day exploitation.' },
        { q: 'How do we tune SIEM to reduce false positives?', a: 'Our team spends 2 weeks establishing baseline behavior, then fine-tunes rules based on your environment.' },
        { q: 'What log retention period should we keep?', a: 'Compliance: 90 days minimum. Best practice: 1-2 years. We support up to 7 years.' },
        { q: 'Can SIEM alert on compliance violations?', a: 'Yes. We create rules for GDPR, HIPAA, SOC 2 compliance checks. Real-time compliance monitoring.' },
        { q: 'How do we integrate SIEM with incident response?', a: 'Alerts automatically escalate to incident response team. Seamless workflow.' },
        { q: 'What is the cost model for SIEM?', a: 'Pricing based on log volume and number of endpoints. Starts at ₹50,000/month.' }
      ]
    },
    'threat-correlation': {
      title: 'Multi-Source Threat Correlation',
      subtitle: 'Connect the Dots Across Your Infrastructure',
      what: 'Threat correlation is analyzing events from multiple sources to identify attack patterns that single sources miss. Example: one firewall sees traffic to suspicious IP, another sees malware download, endpoint shows process execution. Alone: 3 unrelated alerts. Correlated: one coordinated attack.',
      whyImportant: 'Attackers use multi-step techniques. Single-source monitoring misses them. Correlation catches the full attack chain before damage occurs.',
      howItWorks: 'Our correlation engine applies 1000+ rules that link events across sources. When matching events occur within seconds, they\'re grouped as one attack with unified alert.',
      betterThanOthers: 'Most tools correlate within single source. FusionThreat correlates across 500+ source types, catching sophisticated attacks competitors miss.',
      advantages: ['Detect multi-step attacks', '95% reduction in false positives', 'Full attack chain visibility', 'Threat scores based on multiple signals', 'Automatic incident case creation', 'Forensic timeline generation'],
      keyAdvantages: 'FusionThreat correlation links events across your entire infrastructure, revealing attack patterns invisible to point solutions.',
      businessImpact: 'Catch sophisticated attacks early. Prevent breach escalation. Respond faster with full attack context.',
      industries: ['Finance', 'Healthcare', 'Defense', 'Manufacturing', 'Critical Infrastructure', 'Telecom', 'Energy', 'Government'],
      faqs: [
        { q: 'How does correlation different from alerting?', a: 'Alerting: single event triggers notification. Correlation: multiple related events are linked into one incident.' },
        { q: 'How quickly does correlation happen?', a: 'Real-time. Events are correlated within seconds of occurrence.' },
        { q: 'Can we customize correlation rules?', a: 'Yes. We learn your environment and create custom rules. Our analysts fine-tune weekly based on findings.' },
        { q: 'What if correlation creates false incidents?', a: 'We tune rules to minimize false positives. 95% accuracy typical.' },
        { q: 'How do we export correlation data for audits?', a: 'One-click reports showing incident timeline, evidence, and analyst actions.' },
        { q: 'Does correlation work with our existing tools?', a: 'Yes. We integrate with 500+ security tools.' },
        { q: 'How many sources can be correlated?', a: 'Unlimited. We\'ve correlated 500+ simultaneously.' },
        { q: 'What if we add new data sources later?', a: 'Correlation automatically includes new sources. No reconfiguration needed.' },
        { q: 'Can we correlate on-premises and cloud events?', a: 'Yes. Hybrid and multi-cloud correlation is standard.' },
        { q: 'How does AI improve correlation?', a: 'ML learns normal patterns. Unusual correlations bypass false positive filters.' }
      ]
    },
    'cloud-endpoint-coverage': {
      title: 'Cloud, Network & Endpoint Coverage',
      subtitle: 'Unified Visibility Everywhere',
      what: 'Coverage means monitoring all your infrastructure: cloud (AWS/Azure/GCP), network (firewalls, routers, switches), endpoints (laptops, servers, IoT), and applications. No blind spots.',
      whyImportant: 'Attackers hide in blind spots. If you monitor cloud but not endpoints, attackers move to endpoints. If you monitor network but not cloud, attackers hide in cloud. Full coverage eliminates hiding spots.',
      howItWorks: 'Agents deployed to endpoints, network collectors sniff traffic, cloud APIs monitor accounts, app hooks monitor activity. All data streams to central SIEM.',
      betterThanOthers: 'Most competitors specialize in one area (cloud OR endpoint OR network). FusionThreat covers all three with equal depth.',
      advantages: ['Cloud-native AWS/Azure/GCP monitoring', '500+ endpoint types supported', 'Network traffic analysis', 'Application-layer visibility', 'Zero blind spots', 'Seamless multi-environment monitoring'],
      keyAdvantages: 'FusionThreat monitors every attack surface: cloud workloads, network traffic, endpoint behaviors, and app activity from one unified dashboard.',
      businessImpact: 'Know what\'s happening everywhere. Attackers cannot hide. Compliance auditors see complete coverage.',
      industries: ['SaaS', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Telecom', 'Government', 'Education'],
      faqs: [
        { q: 'Do we need to replace existing endpoint tools?', a: 'No. We integrate with Antivirus, EDR, and other tools. We add analysis on top.' },
        { q: 'How many endpoints can be monitored?', a: 'Unlimited. We monitor 10,000+ endpoints for single customers.' },
        { q: 'What about remote/mobile endpoints?', a: 'Our agents work on-premises, remote, and mobile. Zero network required.' },
        { q: 'How do we monitor IoT devices?', a: 'We monitor network traffic and behavior patterns. Most IoT doesn\'t have agents.' },
        { q: 'Can we monitor contractor/vendor networks?', a: 'Yes, with their consent. Cloud-based monitoring requires no VPN.' },
        { q: 'What about network segmentation?', a: 'We monitor across all segments. Helps detect lateral movement.' },
        { q: 'How do we ensure coverage completeness?', a: 'Weekly coverage reports show monitored vs unmonitored assets.' },
        { q: 'What happens if an endpoint goes offline?', a: 'We cache logs locally and sync when back online. No data loss.' },
        { q: 'Can we monitor third-party data centers?', a: 'Yes. Our collectors work anywhere.' },
        { q: 'How do we scale monitoring as we grow?', a: 'Agents are lightweight. Adding 1000 more endpoints is seamless.' }
      ]
    },
    'validation': {
      title: 'Automated + Human Validation',
      subtitle: 'Smart Alerts, Not Alert Fatigue',
      what: 'Validation is the process of confirming alerts are real threats, not false positives. Automation checks 1000+ factors, then human analysts review high-confidence alerts for final verdict.',
      whyImportant: 'False positives cause "alert fatigue"—teams ignore alerts. Human validation catches edge cases. Automation scales to millions of events.',
      howItWorks: 'Alert triggers. AI validation engine scores confidence (0-100). 90+: auto-escalated. 50-90: human review. <50: suppressed. Analysts provide final verdict.',
      betterThanOthers: 'Most tools use only automated rules (high false positives) or only humans (can\'t scale). FusionThreat hybrid approach: automation for volume, humans for complex decisions.',
      advantages: ['95% false positive reduction', 'AI + human validation', 'Fast high-confidence alerts', '24/7 analyst review', 'Learning feedback loop', 'Custom validation rules'],
      keyAdvantages: 'FusionThreat combines AI confidence scoring with experienced analyst review, eliminating alert fatigue while catching real threats.',
      businessImpact: 'Your team receives only actionable alerts. No alert fatigue. 100% analyst availability for real incidents.',
      industries: ['Finance', 'Healthcare', 'Defense', 'Critical Infrastructure', 'Enterprise IT', 'Telecom', 'Energy', 'Government'],
      faqs: [
        { q: 'How accurate is AI validation?', a: '95% accuracy. 5% still need human review for confidence.' },
        { q: 'How many analysts are available?', a: 'Team of 24/7 certified SOC analysts. Unlimited capacity.' },
        { q: 'What is response time for validation?', a: 'Automation: <1 second. Human review: <5 minutes.' },
        { q: 'Can we customize validation rules?', a: 'Yes. We learn your environment and create custom confidence thresholds.' },
        { q: 'How do we reduce false positives further?', a: 'We tune rules daily based on analyst feedback.' },
        { q: 'What if we disagree with validation?', a: 'Feedback is recorded. We retrain models based on corrections.' },
        { q: 'How do we know validation is working?', a: 'Weekly reports show alert accuracy, false positive rates, and trends.' },
        { q: 'Can validation work offline?', a: 'Yes. Agents cache alerts locally, validate when online.' },
        { q: 'How do we scale validation?', a: 'AI automation handles 99% of volume. Humans review exceptions.' },
        { q: 'Do analysts make mistakes?', a: 'Rarely. We have formal training and QA process.' }
      ]
    },
  },
  incident: {
    'critical-response': {
      title: '<15 Minute Critical Response',
      subtitle: 'Fastest Incident Response in the Industry',
      what: 'Critical response SLA guarantees our incident response team mobilizes and begins containment within 15 minutes of incident notification. We measure from "call received" to "first containment action executed".',
      whyImportant: 'Every minute of compromise costs money. 15-minute response vs 4-hour response can mean ₹5 Cr difference in damages. Speed is the most critical factor in incident response.',
      howItWorks: 'You call our incident hotline. Alert triggers automated page to on-call IR team. Within 5 minutes: initial assessment call. Within 15 minutes: containment actions begin.',
      betterThanOthers: 'Industry average is 2-4 hours. FusionThreat is 15 minutes. We have pre-staged IR teams and pre-planned playbooks.',
      advantages: ['15-minute SLA guarantee', 'No call queue (direct escalation)', 'Pre-staged IR team', 'Proven 99% response SLA', 'Financial penalties if we miss SLA', 'Priority 24/7 hotline'],
      keyAdvantages: 'FusionThreat <15 minute response is 10x faster than competitors. We literally stop attackers before they escalate.',
      businessImpact: 'Ransomware encryption stopped before it spreads. Data exfiltration prevented. Millions in damages avoided.',
      industries: ['Finance', 'Healthcare', 'Critical Infrastructure', 'Defense', 'Manufacturing', 'Telecom', 'Energy', 'Retail'],
      faqs: [
        { q: 'How do you respond in 15 minutes?', a: 'Pre-staged team on-call 24/7. Incident playbooks pre-approved. Instant authorization.' },
        { q: 'What happens at the 15-minute mark?', a: 'First containment action: isolate systems, disable accounts, block C2 servers.' },
        { q: 'Is 15 minutes guaranteed?', a: 'Yes. If we miss SLA, we waive fees for that month.' },
        { q: 'What if multiple incidents happen simultaneously?', a: 'We scale team. Multiple incidents each get dedicated responders.' },
        { q: 'How do you access our environment that fast?', a: 'We pre-stage VPN access and admin credentials in secure vault.' },
        { q: 'What if incident is in remote office?', a: 'Cloud-based response works anywhere. No physical travel needed.' },
        { q: 'Can we test the SLA?', a: 'Yes. We offer monthly incident drills to validate readiness.' },
        { q: 'What if incident happens on weekend?', a: 'Same 15-minute SLA applies. We staff 24/7/365.' },
        { q: 'How do we verify response time?', a: 'Call logs timestamp every action. Independent audit available.' },
        { q: 'Is the retainer fee worth it?', a: 'One 15-minute response saves ₹50 Lakhs vs 4-hour competitors. ROI clear.' }
      ]
    },
    'containment': {
      title: 'Threat Isolation & Containment',
      subtitle: 'Stop Attack Propagation Immediately',
      what: 'Containment is the process of stopping attacker movement and preventing damage spread. Actions include network isolation, credential resets, process termination, C2 blocking, and disabling suspicious accounts.',
      whyImportant: 'Uncontained threats spread exponentially. One compromised server becomes 10, becomes 100. Containment stops lateral movement immediately.',
      howItWorks: 'Identify affected systems. Isolate from network. Kill attacker processes. Reset credentials. Block attacker IPs/domains. Hunt for persistence.',
      betterThanOthers: 'Most IR teams react. FusionThreat proactively contains before full spread using behavioral detection.',
      advantages: ['Automated network isolation', 'Credential reset playbooks', 'Persistence hunting', 'C2 blocking', 'Real-time containment status', '99% success rate'],
      keyAdvantages: 'FusionThreat containment stops 99% of attack propagation within 2 hours. Attackers cannot escape once contained.',
      businessImpact: 'Ransomware stopped at encryption start. Data thieves caught before exfiltration. Malware worms stopped.',
      industries: ['Finance', 'Healthcare', 'Defense', 'Manufacturing', 'Critical Infrastructure', 'Telecom', 'Energy', 'Retail'],
      faqs: [
        { q: 'How do you isolate network without breaking business?', a: 'Surgical isolation: only affected segments isolated. Other business continues.' },
        { q: 'What if isolation breaks critical systems?', a: 'We coordinate with your team. Alternative containment strategies applied.' },
        { q: 'How long does full containment take?', a: 'Initial containment: 2 hours. Full cleanup: 24-48 hours.' },
        { q: 'What if attacker has backup credentials?', a: 'We reset all admin passwords. Attacker locked out.' },
        { q: 'How do we know containment is complete?', a: 'Forensic analysis confirms no persistence, no backdoors, no lateral movement.' },
        { q: 'Can attacker break out of containment?', a: 'Very unlikely. Network isolation is total unless we allow communication.' },
        { q: 'Do we need to shut down systems?', a: 'Not always. We try live containment first. Shutdown is last resort.' },
        { q: 'What about cloud systems?', a: 'Same containment playbooks. Cloud instances isolated, credentials reset.' },
        { q: 'How is containment different from recovery?', a: 'Containment: stops attack. Recovery: restores systems to working state.' },
        { q: 'What if we already contain and need to recover?', a: 'Recovery is phase 2. Full cleanup and patch hardening.' }
      ]
    },
  },
  vulnerability: {
    'scanning': {
      title: 'Monthly Vulnerability Scans',
      subtitle: 'Continuous Discovery of Security Gaps',
      what: 'Vulnerability scanning is automated software that searches your infrastructure for known security flaws (CVEs) across operating systems, applications, configurations, and misconfigurations.',
      whyImportant: 'New vulnerabilities discovered daily. Without regular scanning, you accumulate exploitable flaws. Attackers exploit low-hanging fruit first.',
      howItWorks: 'We deploy cloud-based scanner that probes your infrastructure via network and APIs. Scanner compares findings against CVE database. Results ranked by severity.',
      betterThanOthers: 'We offer continuous scanning (not just quarterly), 98% false positive elimination through manual validation, and prioritization by real-world exploitability.',
      advantages: ['Monthly automated scans', 'CVE database updates weekly', '98% false positive rate reduction', 'Exploitability testing', 'Compliance reporting', 'Trend tracking'],
      keyAdvantages: 'FusionThreat continuous scanning catches new vulnerabilities immediately. Manual validation eliminates noise.',
      businessImpact: 'Know about new threats before attackers do. Patch proactively.',
      industries: ['SaaS', 'Finance', 'Healthcare', 'E-commerce', 'Software', 'Manufacturing', 'Telecom', 'Government'],
      faqs: [
        { q: 'How often do new vulnerabilities appear?', a: '5-10 new CVEs daily. Monthly scanning misses them. We recommend continuous.' },
        { q: 'What if scanning triggers intrusion alerts?', a: 'We whitelist scanning IPs. No false security alerts.' },
        { q: 'Does scanning impact performance?', a: 'Minimal. <1% CPU impact. We throttle during business hours.' },
        { q: 'How quickly can we patch vulnerabilities?', a: 'Critical: <24h. High: 1 week. Medium: 2 weeks. We help prioritize.' },
        { q: 'What if CVE affects multiple systems?', a: 'We report by affected systems with remediation steps for each.' },
        { q: 'Do we need to patch everything?', a: 'No. We prioritize by risk. Patch most dangerous 1st.' },
        { q: 'How do we know patch was successful?', a: 'We rescan after patching to confirm vulnerability is gone.' },
        { q: 'What about 0-day vulnerabilities?', a: 'Traditional scanning misses 0-days. We use behavioral detection.' },
        { q: 'Can we exclude certain systems?', a: 'Yes. We respect network policies and exclusion lists.' },
        { q: 'How many vulnerabilities is typical?', a: 'SMB: 50-100. Enterprise: 500-5000. We help prioritize top 50.' }
      ]
    },
    'penetration-testing': {
      title: 'Penetration Testing',
      subtitle: 'Real-World Attack Simulations',
      what: 'Penetration testing (pen testing) is authorized simulated attacks where our security experts attempt to exploit vulnerabilities to demonstrate real-world exploitability.',
      whyImportant: 'Scanners report potential vulnerabilities. Pen testing proves if they\'re exploitable. There\'s a big difference between "vulnerable" and "exploitable".',
      howItWorks: 'Our pen testers use same tools as attackers. They probe your infrastructure, find exploitable paths, and chain attacks together. Report details attack chains.',
      betterThanOthers: 'Most competitors do "checkbox" pen testing. FusionThreat does deep, thorough testing looking for business impact, not just finding vulnerabilities.',
      advantages: ['Quarterly pen tests', 'Real attack simulations', 'Business impact analysis', 'Remediation roadmap', 'Post-test training', 'Compliance-ready reports'],
      keyAdvantages: 'FusionThreat pen testing proves what\'s truly exploitable. We test real attack chains, not isolated vulnerabilities.',
      businessImpact: 'Know your real security posture before attackers do. Fix what matters most.',
      industries: ['Finance', 'Healthcare', 'SaaS', 'Defense', 'Manufacturing', 'Telecom', 'Government', 'Enterprise'],
      faqs: [
        { q: 'What is the difference between pen testing and ethical hacking?', a: 'Pen testing is authorized. Ethical hacking is broader. Pen test is type of ethical hacking.' },
        { q: 'How aggressive is pen testing?', a: 'We stay within agreed scope and rules of engagement. No damage.' },
        { q: 'Can pen testing break things?', a: 'Unlikely. We test in staging first. If in production, we\'re very careful.' },
        { q: 'How long does a pen test take?', a: 'Small company: 1 week. Large enterprise: 4 weeks.' },
        { q: 'What if pen testers find critical vulnerabilities?', a: 'We notify you immediately. We do not exploit further without permission.' },
        { q: 'Do we get a detailed report?', a: 'Yes. Executive summary + technical details + attack chains + remediation.' },
        { q: 'Can we use pen test report for sales/audit?', a: 'Yes. Reports are formatted for customers, auditors, compliance.' },
        { q: 'How often should we do pen testing?', a: 'Quarterly minimum. Annual for compliance. We recommend quarterly.' },
        { q: 'What if we\'re in the middle of fixing vulnerabilities?', a: 'We coordinate. Test after major changes.' },
        { q: 'Do pen testers try insider attacks?', a: 'Yes, if in scope. Social engineering, physical access, insider threats.' }
      ]
    },
  },
  compliance: {
    'gap-analysis': {
      title: 'Gap Analysis & Planning',
      subtitle: 'Map Your Path to Compliance',
      what: 'Gap analysis identifies the difference between your current security controls and what regulatory frameworks require. We map your infrastructure to GDPR/HIPAA/SOC 2/ISO controls.',
      whyImportant: 'Without gap analysis, you don\'t know what you\'re missing. Gap analysis provides the roadmap to compliance.',
      howItWorks: 'We interview your team, analyze your systems, and create control matrix showing: required controls, what you have, what\'s missing, remediation effort.',
      betterThanOthers: 'Most auditors only tell you gaps when audit fails (too late). FusionThreat finds gaps proactively, before audit.',
      advantages: ['Comprehensive gap mapping', 'Remediation prioritization', 'Effort estimation', 'Cost-benefit analysis', 'Compliance roadmap', 'Timeline planning'],
      keyAdvantages: 'FusionThreat gap analysis gives you exact roadmap to compliance with effort/cost estimates.',
      businessImpact: 'Achieve compliance faster. Budget accurately. Plan efficiently.',
      industries: ['SaaS', 'Finance', 'Healthcare', 'FinTech', 'E-commerce', 'Insure', 'Telecom', 'Enterprise'],
      faqs: [
        { q: 'What is a "gap"?', a: 'Control required by regulation but missing or incomplete in your system.' },
        { q: 'How many gaps are typical?', a: 'Small company: 20-50. Large company: 50-200 depending on framework.' },
        { q: 'Do we need to fix all gaps?', a: 'Regulatory: yes, eventually. Audit: yes, to pass. We prioritize by risk.' },
        { q: 'How long does gap analysis take?', a: 'Small company: 2 weeks. Large: 4-6 weeks.' },
        { q: 'Can we fix gaps in parallel?', a: 'Yes. We help you parallelize by risk level.' },
        { q: 'What if fixing a gap requires major changes?', a: 'We find alternative implementations. Compliance can be achieved different ways.' },
        { q: 'How do we know gap is closed?', a: 'We validate after remediation. Testing confirms control effectiveness.' },
        { q: 'What if business doesn\'t support remediation?', a: 'We quantify risk. "This gap costs ₹X if breached." Business usually approves.' },
        { q: 'Do gaps change over time?', a: 'Yes. New regulations added. We monitor and alert.' },
        { q: 'Can we get gap analysis in writing?', a: 'Yes. Detailed report with itemized gaps, remediation, and timeline.' }
      ]
    },
    'audit-support': {
      title: 'Audit Preparation & Support',
      subtitle: 'Get Ready for Auditors',
      what: 'Audit support means we help prepare evidence, documentation, and demonstrate controls to auditors. We coordinate audit logistics and respond to auditor questions.',
      whyImportant: 'Auditors are thorough. Unprepared companies fail audits (delays certification 3-6 months). Prepared companies pass first-time.',
      howItWorks: 'We organize evidence, prepare documentation, run auditor interviews, and respond to findings.',
      betterThanOthers: 'Most companies scramble before audit. FusionThreat maintains audit-ready state continuously. Evidence is always organized.',
      advantages: ['99% first-time pass rate', 'Pre-audit readiness checks', 'Auditor coordination', 'Evidence organization', 'Interview prep', 'Finding remediation'],
      keyAdvantages: 'FusionThreat 99% first-time audit pass rate. We know what auditors want before they ask.',
      businessImpact: 'Pass audit first time. Avoid 3-6 month delays. Get certification fast.',
      industries: ['SaaS', 'Finance', 'Healthcare', 'FinTech', 'Startup', 'Enterprise', 'Consulting', 'Tech'],
      faqs: [
        { q: 'What evidence do auditors require?', a: 'Policies, logs, access records, training, incident records, vendor assessments, architecture docs.' },
        { q: 'How long does evidence organization take?', a: 'If prepared continuously: 1 week. If starting from scratch: 1-2 months.' },
        { q: 'What if we\'re missing some evidence?', a: 'We generate synthetic evidence where possible. Some gaps may delay audit.' },
        { q: 'Can we fail an audit?', a: 'Yes, if major control gaps exist. FusionThreat minimizes failure risk by fixing gaps first.' },
        { q: 'How long do audits take?', a: 'SOC 2: 1-2 weeks. ISO 27001: 2-4 weeks.' },
        { q: 'What if auditors find issues?', a: 'We remediate under auditor oversight. Usually resolved in weeks.' },
        { q: 'Do we need to shut down systems for audit?', a: 'No. Audit is non-disruptive. We prepare evidence, not modify operations.' },
        { q: 'Can we start audit preparation early?', a: 'Yes. 6 months of control operation required for SOC 2 Type II. Start now.' },
        { q: 'How much does audit cost?', a: 'SOC 2: ₹5-15 Lakhs. ISO 27001: ₹10-25 Lakhs. FusionThreat reduces auditor effort ~40%.' },
        { q: 'After we pass, what happens?', a: 'Annual audit required. We maintain compliance continuously. Next audit is easier.' }
      ]
    },
  },
  hunting: {
    'hypothesis-hunting': {
      title: 'Hypothesis-Driven Threat Hunting',
      subtitle: 'Targeted Search for Specific Threats',
      what: 'Hypothesis hunting is developing educated guesses about attacker behavior (based on threat intelligence) and then actively searching logs for evidence of that behavior.',
      whyImportant: 'Automated detection catches known attacks. Hypothesis hunting catches unknown threats by assuming attacker behavior patterns.',
      howItWorks: 'Hunters develop hunting hypothesis from threat intel. Example: "APT targeting financial sector often steals Active Directory credentials." Hunters search logs for credential dump patterns.',
      betterThanOthers: 'Most security teams don\'t hunt. FusionThreat hunts weekly with industry-specific threat intel.',
      advantages: ['Weekly hunting campaigns', 'Threat intel integration', 'Custom hypotheses', 'APT detection', 'Attack chain mapping', 'Detection rule creation'],
      keyAdvantages: 'FusionThreat hypothesis hunting finds APT-grade threats competitors miss. We actively search, not just react.',
      businessImpact: 'Discover attacker presence before data theft. Remove threats before damage.',
      industries: ['Finance', 'Defense', 'Critical Infrastructure', 'Manufacturing', 'Healthcare', 'Telecom', 'Energy', 'Government'],
      faqs: [
        { q: 'How many hypotheses do you hunt per month?', a: 'Typically 4 weekly hunts = 16-20 hunting exercises per month.' },
        { q: 'Where do hypotheses come from?', a: 'MITRE ATT&CK framework, threat reports, industry-specific intel, historical incidents.' },
        { q: 'What is the success rate of hunts?', a: 'Varies. High-risk environment: 20-30% hunts find something. Average: 10%.' },
        { q: 'How long does a hunt take?', a: '10-20 analyst hours per hunt. Usually spread over 1 week.' },
        { q: 'What if hunt finds nothing?', a: 'Negative result is still valuable. Confirms threat not present (for now).' },
        { q: 'How do we choose which hypotheses to hunt?', a: 'We prioritize based on threat relevance to your industry and observed TTPs.' },
        { q: 'Do you hunt using our tools?', a: 'Yes. We use your SIEM, logs, and monitoring tools. No new access.' },
        { q: 'What if hunt discovers active attacker?', a: 'Immediate escalation. We transition to incident response.' },
        { q: 'Do you provide hunt reports?', a: 'Yes. Executive summary + technical details + findings + recommendations.' },
        { q: 'Can we request specific hypotheses?', a: 'Yes. We customize based on your threat landscape.' }
      ]
    },
    'behavioral-analysis': {
      title: 'Behavioral Pattern Analysis',
      subtitle: 'Detect Anomalies That Indicate Threats',
      what: 'Behavioral analysis is identifying unusual patterns in user/system behavior that deviate from baseline. Examples: user accessing files outside their job, server making unusual network connections, admin account used at 3am from different country.',
      whyImportant: 'Attackers try to hide by mimicking normal behavior. Behavioral analysis catches deviations that indicate compromise.',
      howItWorks: 'We establish normal behavior baseline (first month). Any significant deviation triggers alert for analysis.',
      betterThanOthers: 'Rule-based detection uses signatures. Behavioral detection uses ML to learn normal patterns.',
      advantages: ['ML-powered baselines', 'Insider threat detection', 'Anomaly scoring', 'Context-aware alerts', 'Reduced false positives', 'Risk scoring'],
      keyAdvantages: 'FusionThreat behavioral analysis catches insider threats and compromised credentials rule-based systems miss.',
      businessImpact: 'Detect insider threats. Catch compromised credentials. Find attackers hiding in normal traffic.',
      industries: ['Finance', 'Healthcare', 'Defense', 'Tech', 'Telecom', 'Manufacturing', 'Energy', 'Enterprise'],
      faqs: [
        { q: 'How long does baseline learning take?', a: '30 days minimum. 90 days for accurate baseline.' },
        { q: 'What if normal behavior changes?', a: 'We re-baseline quarterly. Seasonal changes handled.' },
        { q: 'Does behavior analysis cause false positives?', a: 'Yes, initially. But fewer than rule-based. Improves over time.' },
        { q: 'How do we handle legitimate anomalies?', a: 'We whitelist them. Recurring exceptions become new baseline.' },
        { q: 'Can behavior analysis detect insider threats?', a: 'Yes. Data access anomalies, after-hours activity, unusual file transfers.' },
        { q: 'What if employee legitimately changes behavior?', a: 'We investigate context. If legitimate, whitelisted.' },
        { q: 'How do you detect compromised credentials?', a: 'Login from different country/time, access unusual systems, unusual privilege use.' },
        { q: 'Does behavior analysis work for cloud?', a: 'Yes. Same techniques apply to AWS/Azure/GCP logs.' },
        { q: 'How many anomalies per day typically?', a: 'Small org: 5-10. Large org: 50-100. We tune to manageable levels.' },
        { q: 'Can we customize anomaly thresholds?', a: 'Yes. Too sensitive = noise. Too loose = misses threats. We tune together.' }
      ]
    },
  },
  cloud: {
    'misconfiguration': {
      title: 'Misconfiguration Detection & Remediation',
      subtitle: 'Fix Cloud Security Errors Automatically',
      what: 'Cloud misconfiguration detection is continuous scanning of your cloud infrastructure against security best practices. Example findings: public S3 bucket, overly-permissive security group, unencrypted database.',
      whyImportant: '99% of cloud breaches result from misconfiguration. Public data exposure is the #1 cause. Automated detection catches misconfigurations before attackers exploit.',
      howItWorks: 'We scan your AWS/Azure/GCP via APIs. Compare configs against 200+ security rules. Flag violations immediately with remediation steps.',
      betterThanOthers: 'Manual reviews miss misconfigurations. FusionThreat continuous scanning catches new misconfigurations within minutes.',
      advantages: ['Continuous scanning', 'Auto-remediation available', 'Compliance-mapped rules', 'Risk scoring', '200+ security rules', 'Remediation templates'],
      keyAdvantages: 'FusionThreat detects 99% of cloud security misconfigurations. Auto-remediation fixes most without manual effort.',
      businessImpact: 'Prevent public data exposure. Meet compliance requirements. Reduce cloud attack surface by 90%.',
      industries: ['SaaS', 'FinTech', 'E-commerce', 'Healthcare', 'Tech', 'Startup', 'Enterprise', 'Cloud-Native'],
      faqs: [
        { q: 'What is most common misconfiguration?', a: 'Public S3 buckets/storage accounts. Happens to 40% of companies yearly.' },
        { q: 'How are misconfigurations discovered?', a: 'We use cloud provider APIs. Non-intrusive scanning.' },
        { q: 'Can we auto-fix misconfigurations?', a: 'Yes. For 80% of issues. Complex ones need human review.' },
        { q: 'Does auto-remediation require approval?', a: 'Yes. We notify first. You approve before fix.' },
        { q: 'What if remediation breaks application?', a: 'We test first. If breaks something, we find alternative.' },
        { q: 'How quickly can we be scanned?', a: 'Real-time via API. We scan hourly by default.' },
        { q: 'Does scanning affect cloud performance?', a: 'No. Read-only API calls. Zero impact.' },
        { q: 'Which cloud providers are supported?', a: 'AWS, Azure, GCP, and all major clouds.' },
        { q: 'What about multi-cloud misconfigurations?', a: 'We scan and report across all clouds. Unified dashboard.' },
        { q: 'How do we prevent new misconfigurations?', a: 'Enforcement policies, approval workflows, training. We help set these up.' }
      ]
    },
    'identity-access': {
      title: 'Identity & Access Monitoring',
      subtitle: 'Detect Unauthorized Access Attempts',
      what: 'Identity monitoring is tracking all account access, privilege escalations, and unusual auth patterns. Cloud identity threats include: stolen credentials, privilege escalation, lateral movement, insider abuse.',
      whyImportant: 'Cloud authentication is the new perimeter. If attackers steal credentials, they have full access. Monitoring prevents lateral movement.',
      howItWorks: 'We monitor cloud identity logs (AWS CloudTrail, Azure Activity Log, GCP Audit Logs). Flag unusual patterns: login from new location, elevation of privileges, access to sensitive resources.',
      betterThanOthers: 'Most companies monitor on-premises identity. Cloud identity logs are often ignored. FusionThreat monitors both.',
      advantages: ['Real-time privilege escalation detection', 'Stolen credential detection', 'Insider threat detection', 'Compliance reporting', 'MFA anomalies', 'Session analysis'],
      keyAdvantages: 'FusionThreat cloud identity monitoring catches credential theft and insider abuse within minutes.',
      businessImpact: 'Prevent unauthorized cloud access. Stop lateral movement. Detect insider threats.',
      industries: ['SaaS', 'FinTech', 'Healthcare', 'Defense', 'Finance', 'Telecom', 'Tech', 'Enterprise'],
      faqs: [
        { q: 'How do you detect stolen cloud credentials?', a: 'Login from impossible location, login from unknown IP, unusual resource access.' },
        { q: 'What is privilege escalation in cloud?', a: 'User gaining higher permissions than role grants. Should not happen.' },
        { q: 'Can we detect insider threats with identity monitoring?', a: 'Yes. Unusual access hours, access outside role, privilege abuse.' },
        { q: 'How do we respond to suspicious login?', a: 'Alert to team. Immediate options: disable account, revoke tokens, force MFA.' },
        { q: 'Does identity monitoring work with MFA?', a: 'Yes. We monitor MFA success/failures and unusual MFA patterns.' },
        { q: 'What about temporary credentials?', a: 'We monitor creation and use of temporary keys and STS tokens.' },
        { q: 'How do we know if account is compromised?', a: 'Multiple indicators: new location, new IP, new device, unusual access, privilege elevation.' },
        { q: 'Can we integrate with SSO (Okta, AD)?', a: 'Yes. We integrate with Okta, Azure AD, Google Workspace, and others.' },
        { q: 'What about service accounts?', a: 'Service accounts are higher risk. We monitor their activity heavily.' },
        { q: 'Do we need to change password after incident?', a: 'Yes. Reset all affected accounts and rotate service account keys.' }
      ]
    },
  },
};

const buildBranchFaqs = (branch) => [
  { q: `What is ${branch.title}?`, a: `${branch.title} is a focused FusionThreat security branch that protects a specific part of your environment with expert analysis, clear reporting, and practical remediation guidance.` },
  { q: `Why is ${branch.title} important?`, a: branch.whyImportant },
  { q: `How does ${branch.title} work?`, a: branch.howItWorks },
  { q: `Why is FusionThreat better for ${branch.title}?`, a: branch.betterThanOthers },
  { q: 'What business advantage does this provide?', a: branch.businessImpact },
  { q: 'Which teams should be involved?', a: 'Security, IT operations, cloud administrators, compliance owners, and business stakeholders should be involved depending on the branch scope.' },
  { q: 'Can this work with our existing tools?', a: 'Yes. FusionThreat integrates with common SIEM, EDR, cloud, identity, network, ticketing, and reporting tools so you can keep your current investments.' },
  { q: 'How quickly can this branch be started?', a: 'Most branches can begin onboarding in 1 to 2 weeks after access approval, scope confirmation, and initial discovery are complete.' },
  { q: 'Will it disrupt business operations?', a: 'No. FusionThreat uses low-impact collection, careful change planning, and approval-based remediation for sensitive environments.' },
  { q: 'How do we measure success?', a: 'Success is measured through fewer critical risks, faster detection or remediation, better audit evidence, improved visibility, and lower operational effort.' },
];

const buildExtraBranchPoints = (branch) => [
  `Dedicated FusionThreat analysts review ${branch.title} findings and separate real business risk from noisy alerts.`,
  `Clear owner-ready remediation steps are provided so IT, cloud, engineering, and compliance teams know exactly what to do next.`,
  `Executive summaries explain the risk in business language, while technical notes give engineers the evidence they need.`,
  `Monthly improvement tracking shows what changed, what remains open, and which risks should be handled first.`,
  `FusionThreat maps each finding to likely business impact, compliance exposure, and attacker opportunity.`,
  `Recommendations include quick wins, long-term hardening, and compensating controls when immediate fixes are not possible.`,
];

const addDetailDepth = (text, branch, focus) => `${text} FusionThreat expands this with ${focus} context, evidence-based prioritization, and clear next actions so decision makers and technical teams can both understand the risk. The outcome is not just another report; it is a practical improvement path for reducing exposure, proving progress, and protecting business continuity.`;

const normalizeBranch = (branch) => {
  const advantages = Array.from(new Set([...(branch.advantages || []), ...buildExtraBranchPoints(branch)]));
  const detailedBranch = {
    ...branch,
    what: addDetailDepth(branch.what, branch, 'scope and asset'),
    whyImportant: addDetailDepth(branch.whyImportant, branch, 'risk and business impact'),
    howItWorks: addDetailDepth(branch.howItWorks, branch, 'workflow and validation'),
    betterThanOthers: `${branch.betterThanOthers} FusionThreat is stronger because every branch combines automation, analyst review, business-priority scoring, and remediation follow-through instead of leaving customers with generic tool output.`,
    keyAdvantages: `${branch.keyAdvantages} You also get clearer ownership, fewer repeated findings, faster decisions, and reporting that can support audits, leadership reviews, and customer security questions.`,
    businessImpact: `${branch.businessImpact} For the business, this means less downtime risk, better security maturity, stronger customer confidence, and more predictable security spending.`,
    advantages,
  };

  return {
    ...detailedBranch,
    faqs: branch.faqs || buildBranchFaqs(detailedBranch),
  };
};

const subBranchAdditionsData = {
  incident: {
    'root-cause-analysis': normalizeBranch({
      title: 'Root Cause Analysis',
      subtitle: 'Find Exactly How the Incident Happened',
      what: 'Root cause analysis identifies the original weakness, misconfiguration, credential abuse, process failure, or exploited vulnerability that allowed an incident to occur.',
      whyImportant: 'Without root cause analysis, cleanup is temporary. The same attacker path can be reused, the same control can fail again, and leadership never gets a clear answer about what must change.',
      howItWorks: 'FusionThreat reviews logs, endpoint evidence, identity activity, network flow, malware behavior, and timeline data to reconstruct the attack path from first access to business impact.',
      betterThanOthers: 'Many providers stop after containment. FusionThreat connects technical evidence to the real business cause, then turns findings into a prioritized prevention plan.',
      advantages: ['Complete attack timeline', 'Evidence-backed conclusions', 'Control failure mapping', 'Executive-ready explanation', 'Prevention roadmap', 'Insurance and audit support'],
      keyAdvantages: 'FusionThreat shows not only what happened, but why it happened and which fixes will prevent repeat incidents.',
      businessImpact: 'Your business avoids repeat attacks, improves controls, reduces insurance friction, and gives leadership clear facts for investment decisions.',
      industries: ['Finance', 'Healthcare', 'Manufacturing', 'SaaS', 'Retail', 'Government', 'Legal', 'Education'],
    }),
    'post-incident-reporting': normalizeBranch({
      title: 'Post-Incident Reporting',
      subtitle: 'Clear Reports for Leaders, Auditors, and Insurers',
      what: 'Post-incident reporting documents the timeline, affected systems, attacker actions, business impact, containment steps, evidence, and improvement recommendations after an incident.',
      whyImportant: 'After an incident, executives, auditors, customers, regulators, and insurers need accurate answers. Poor reporting creates confusion and delays recovery decisions.',
      howItWorks: 'FusionThreat converts forensic evidence and response activity into structured reports with executive summaries, technical appendices, remediation plans, and next-step ownership.',
      betterThanOthers: 'FusionThreat reports are written for both technical teams and business leaders, making the findings easier to act on instead of becoming unreadable forensic dumps.',
      advantages: ['Executive summary', 'Technical incident timeline', 'Evidence register', 'Remediation ownership', 'Audit-ready documentation', 'Cyber insurance support'],
      keyAdvantages: 'FusionThreat gives every stakeholder the right level of detail, from board-level risk to engineer-level remediation steps.',
      businessImpact: 'Your organization recovers trust faster, closes findings cleanly, supports claims, and proves that security improvements are underway.',
      industries: ['Finance', 'Healthcare', 'SaaS', 'E-commerce', 'Legal', 'Insurance', 'Government', 'Critical Infrastructure'],
    }),
  },
  vulnerability: {
    'critical-patching': normalizeBranch({
      title: 'Critical Patching Under 24 Hours',
      subtitle: 'Close Dangerous Exposure Fast',
      what: 'Critical patching focuses on fixing vulnerabilities that are actively exploited, internet exposed, business critical, or likely to cause severe compromise.',
      whyImportant: 'Attackers move quickly after critical vulnerabilities are disclosed. Delayed patching gives them an open path into servers, applications, cloud workloads, and endpoints.',
      howItWorks: 'FusionThreat verifies the vulnerability, checks exploitability, coordinates owners, recommends the safest fix, tracks deployment, and validates that the patch truly closed the exposure.',
      betterThanOthers: 'FusionThreat prioritizes by real exploitability and business impact, so teams patch the issues that actually reduce risk instead of chasing long scanner lists.',
      advantages: ['Under 24 hour critical patch target', 'Exploitability validation', 'Owner-based tracking', 'Rollback-aware planning', 'Patch verification scans', 'Risk acceptance documentation'],
      keyAdvantages: 'FusionThreat helps your team move fast while avoiding rushed changes that break production.',
      businessImpact: 'Your business lowers breach probability, reduces emergency workload, protects uptime, and demonstrates strong vulnerability governance.',
      industries: ['SaaS', 'Finance', 'Healthcare', 'E-commerce', 'Manufacturing', 'Telecom', 'Government', 'Education'],
    }),
    'remediation-guidance': normalizeBranch({
      title: 'Remediation Guidance',
      subtitle: 'Turn Findings Into Fixes',
      what: 'Remediation guidance translates vulnerabilities into clear, prioritized, owner-friendly steps for fixing root causes and validating closure.',
      whyImportant: 'Finding issues is only half the job. Without clear remediation, teams get stuck with long reports, repeated findings, and unresolved business risk.',
      howItWorks: 'FusionThreat ranks findings by severity, exploitability, asset importance, and compliance impact, then provides fix steps, compensating controls, and retest support.',
      betterThanOthers: 'FusionThreat does not just hand over a PDF. We work with your teams until the important risks are understood, assigned, and closed.',
      advantages: ['Prioritized fix roadmap', 'Clear owner assignment', 'Compensating controls', 'Retest validation', 'Compliance evidence', 'Executive progress tracking'],
      keyAdvantages: 'FusionThreat makes vulnerability management operational, measurable, and easier for IT and engineering teams to complete.',
      businessImpact: 'Your business reduces backlog, closes high-risk issues faster, improves audit readiness, and spends security budget where it matters most.',
      industries: ['SaaS', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Telecom', 'Government', 'Enterprise IT'],
    }),
  },
  compliance: {
    'automated-dashboard': normalizeBranch({
      title: 'Automated Compliance Dashboards',
      subtitle: 'Real-Time Compliance Visibility',
      what: 'Automated compliance dashboards show control status, evidence health, open gaps, audit readiness, and framework progress in one clear view.',
      whyImportant: 'Manual compliance tracking gets outdated quickly. Dashboards help leaders see what is ready, what is missing, and what needs action before auditors ask.',
      howItWorks: 'FusionThreat connects control evidence, cloud settings, access records, policies, and ticket status into dashboards mapped to frameworks like SOC 2, ISO 27001, HIPAA, GDPR, and PCI DSS.',
      betterThanOthers: 'FusionThreat dashboards connect technical evidence to business controls, so compliance owners do not have to manually chase scattered screenshots and spreadsheets.',
      advantages: ['Framework-mapped status', 'Evidence freshness tracking', 'Gap visibility', 'Owner accountability', 'Audit readiness scores', 'Executive reporting'],
      keyAdvantages: 'FusionThreat gives compliance owners live visibility instead of last-minute audit surprises.',
      businessImpact: 'Your business reduces audit stress, saves team time, improves accountability, and keeps compliance programs moving continuously.',
      industries: ['SaaS', 'FinTech', 'Healthcare', 'E-commerce', 'Insurance', 'BPO', 'Enterprise', 'Startups'],
    }),
    'evidence-collection': normalizeBranch({
      title: 'Evidence Collection',
      subtitle: 'Always-Ready Audit Proof',
      what: 'Evidence collection gathers the policies, logs, screenshots, tickets, access reviews, training records, and control outputs needed to prove compliance.',
      whyImportant: 'Audits fail or slow down when evidence is missing, outdated, or scattered. Clean evidence saves weeks of effort and reduces auditor back-and-forth.',
      howItWorks: 'FusionThreat maps evidence to each control, automates collection where possible, stores proof with ownership and dates, and flags missing or stale items before audit time.',
      betterThanOthers: 'FusionThreat keeps evidence organized throughout the year, not only during audit season.',
      advantages: ['Control-to-evidence mapping', 'Automated collection workflows', 'Stale evidence alerts', 'Auditor-ready folders', 'Ownership tracking', 'Reduced manual follow-up'],
      keyAdvantages: 'FusionThreat turns compliance evidence into a repeatable system instead of a last-minute scramble.',
      businessImpact: 'Your business passes audits faster, reduces compliance labor, improves customer trust, and shortens enterprise sales security reviews.',
      industries: ['SaaS', 'Healthcare', 'Financial Services', 'Insurance', 'Consulting', 'BPO', 'E-commerce', 'Enterprise IT'],
    }),
  },
  hunting: {
    'ioc-identification': normalizeBranch({
      title: 'IOC Identification',
      subtitle: 'Find Indicators of Compromise Across Your Environment',
      what: 'IOC identification finds suspicious hashes, domains, IPs, file paths, registry keys, processes, user behavior, and network patterns that indicate compromise.',
      whyImportant: 'Indicators of compromise help confirm whether attacker activity touched your environment and how far it spread.',
      howItWorks: 'FusionThreat searches logs, endpoints, SIEM data, cloud trails, threat intelligence, and historical activity for known and custom indicators.',
      betterThanOthers: 'FusionThreat combines threat intelligence with environment context, reducing noise and identifying indicators that matter to your business.',
      advantages: ['Known IOC matching', 'Custom IOC searches', 'Historical lookback', 'Endpoint and cloud coverage', 'Threat intel enrichment', 'Containment recommendations'],
      keyAdvantages: 'FusionThreat turns scattered indicators into a clear compromise picture with recommended next steps.',
      businessImpact: 'Your business confirms exposure faster, scopes incidents accurately, and avoids overreacting or underreacting to threat intelligence.',
      industries: ['Finance', 'Healthcare', 'Government', 'Manufacturing', 'Telecom', 'Energy', 'SaaS', 'Education'],
    }),
    'custom-detection-rules': normalizeBranch({
      title: 'Custom Detection Rule Development',
      subtitle: 'Convert Lessons Into Stronger Detection',
      what: 'Custom detection rule development creates tailored SIEM, EDR, cloud, and identity rules based on your systems, risks, incidents, and attacker behavior.',
      whyImportant: 'Generic rules miss business-specific threats. Custom detections make your monitoring smarter after every hunt, incident, and infrastructure change.',
      howItWorks: 'FusionThreat converts hunting findings, threat models, and attack techniques into tested rules with severity, logic, exclusions, and response instructions.',
      betterThanOthers: 'FusionThreat tests and tunes custom rules against your real environment so they produce actionable alerts instead of more noise.',
      advantages: ['Environment-specific logic', 'MITRE ATT&CK mapping', 'False-positive tuning', 'Runbook-linked alerts', 'Rule performance tracking', 'Continuous improvement'],
      keyAdvantages: 'FusionThreat makes your detection program improve every month instead of staying static.',
      businessImpact: 'Your business detects threats earlier, reduces analyst effort, and turns security learnings into durable protection.',
      industries: ['Finance', 'Defense', 'SaaS', 'Healthcare', 'Manufacturing', 'Telecom', 'Energy', 'Enterprise IT'],
    }),
  },
  cloud: {
    'workload-protection': normalizeBranch({
      title: 'Cloud Workload Protection',
      subtitle: 'Secure VMs, Containers, and Cloud Compute',
      what: 'Cloud workload protection monitors and hardens virtual machines, containers, Kubernetes workloads, and cloud compute resources against runtime threats and risky configurations.',
      whyImportant: 'Cloud workloads change quickly. Without runtime protection, attackers can abuse containers, exposed services, vulnerable images, or unmanaged instances.',
      howItWorks: 'FusionThreat collects workload telemetry, checks configurations, monitors runtime behavior, reviews images, and alerts on suspicious processes, network activity, and privilege abuse.',
      betterThanOthers: 'FusionThreat combines cloud posture, runtime monitoring, and analyst validation so workload alerts are tied to real business risk.',
      advantages: ['VM and container coverage', 'Runtime threat monitoring', 'Image risk checks', 'Kubernetes visibility', 'Privilege abuse detection', 'Workload hardening guidance'],
      keyAdvantages: 'FusionThreat protects cloud workloads across build, deploy, and runtime stages.',
      businessImpact: 'Your business reduces cloud compromise risk, improves uptime, protects customer data, and supports secure cloud growth.',
      industries: ['SaaS', 'FinTech', 'Healthcare', 'E-commerce', 'Cloud-Native Startups', 'Media', 'Gaming', 'Enterprise'],
    }),
    'serverless-security': normalizeBranch({
      title: 'Serverless Security Coverage',
      subtitle: 'Protect Functions, Events, and Ephemeral Workloads',
      what: 'Serverless security coverage monitors functions, permissions, triggers, secrets, environment variables, logs, and data access paths across event-driven cloud services.',
      whyImportant: 'Serverless workloads are short-lived and easy to overlook. Over-permissioned functions or exposed secrets can become a quiet path to sensitive data.',
      howItWorks: 'FusionThreat reviews function permissions, event sources, execution logs, dependency risks, environment variables, and unusual invocation patterns.',
      betterThanOthers: 'FusionThreat understands ephemeral cloud behavior and detects risks that traditional host-based tools cannot see.',
      advantages: ['Function permission review', 'Trigger and event monitoring', 'Secret exposure checks', 'Invocation anomaly detection', 'Dependency visibility', 'Least-privilege guidance'],
      keyAdvantages: 'FusionThreat gives security visibility into serverless systems without forcing old endpoint models onto cloud-native workloads.',
      businessImpact: 'Your business protects data pipelines, reduces cloud risk, and keeps serverless innovation secure and compliant.',
      industries: ['SaaS', 'FinTech', 'Healthcare', 'E-commerce', 'Data Platforms', 'Media', 'IoT', 'Cloud-Native Teams'],
    }),
  },
};

const completeSubBranchesData = {
  monitoring: Object.fromEntries(Object.entries(subBranchesData.monitoring).map(([key, branch]) => [key, normalizeBranch(branch)])),
  incident: { ...Object.fromEntries(Object.entries(subBranchesData.incident).map(([key, branch]) => [key, normalizeBranch(branch)])), ...subBranchAdditionsData.incident },
  vulnerability: { ...Object.fromEntries(Object.entries(subBranchesData.vulnerability).map(([key, branch]) => [key, normalizeBranch(branch)])), ...subBranchAdditionsData.vulnerability },
  compliance: { ...subBranchAdditionsData.compliance, ...Object.fromEntries(Object.entries(subBranchesData.compliance).map(([key, branch]) => [key, normalizeBranch(branch)])) },
  hunting: { ...Object.fromEntries(Object.entries(subBranchesData.hunting).map(([key, branch]) => [key, normalizeBranch(branch)])), ...subBranchAdditionsData.hunting },
  cloud: { ...subBranchAdditionsData.cloud, ...Object.fromEntries(Object.entries(subBranchesData.cloud).map(([key, branch]) => [key, normalizeBranch(branch)])) },
};

const branchIconMap = {
  monitoring: [Clock, Zap, BarChart3, Shield],
  incident: [Zap, Shield, Search, BarChart3],
  vulnerability: [Search, Zap, Shield, CheckCircle],
  compliance: [CheckCircle, Users, BarChart3, Shield],
  hunting: [Search, Eye, Target, BarChart3],
  cloud: [Cloud, Shield, Zap, BarChart3],
};

const buildBranchBenefits = (branch, serviceKey) => {
  const icons = branchIconMap[serviceKey] || [Shield, Search, Zap, BarChart3];
  return [
    { icon: icons[0] || Shield, title: 'Focused Protection', desc: branch.what },
    { icon: icons[1] || Shield, title: 'FusionThreat Advantage', desc: branch.keyAdvantages },
    { icon: icons[2] || Shield, title: 'Business Impact', desc: branch.businessImpact },
    { icon: icons[3] || Shield, title: 'Actionable Guidance', desc: branch.advantages.slice(0, 3).join(', ') },
  ];
};

const buildBranchProcess = (branch) => [
  { step: '1', title: 'Scope', desc: `Define systems, users, cloud assets, and business areas covered by ${branch.title}.` },
  { step: '2', title: 'Analyze', desc: 'Collect evidence, logs, configurations, and security signals for expert review.' },
  { step: '3', title: 'Validate', desc: 'FusionThreat analysts confirm real risk, remove noise, and prioritize what matters.' },
  { step: '4', title: 'Improve', desc: 'Deliver remediation guidance, reporting, and measurable security improvements.' },
];

const subServiceEntries = Object.entries(completeSubBranchesData).flatMap(([serviceKey, branches]) =>
  Object.entries(branches).map(([slug, branch]) => ({ serviceKey, slug, branch }))
);

const subServiceDetailsData = subServiceEntries.reduce((acc, { serviceKey, slug, branch }) => {
  const parentService = serviceDetailsData[serviceKey];
  acc[slug] = {
    title: branch.title,
    subtitle: branch.subtitle,
    heroDescription: branch.what,
    what: branch.what,
    whyImportant: branch.whyImportant,
    howItWorks: branch.howItWorks,
    betterThanOthers: branch.betterThanOthers,
    advantages: branch.advantages,
    keyAdvantages: branch.keyAdvantages,
    businessImpact: branch.businessImpact,
    industries: branch.industries,
    keyBenefits: buildBranchBenefits(branch, serviceKey),
    features: branch.advantages,
    process: buildBranchProcess(branch),
    pricing: parentService.pricing,
    caseStudy: `${branch.title}: ${branch.businessImpact}`,
    faqs: branch.faqs,
  };
  return acc;
}, {});

const defaultServiceSlugToSubService = {
  'monitoring-triage': 'siem-analysis',
  'incident-response': 'critical-response',
  'vulnerability-management': 'scanning',
  'compliance-enablement': 'automated-dashboard',
  'threat-hunting': 'hypothesis-hunting',
  'cloud-security': 'workload-protection',
};

const slugToKey = {
  ...defaultServiceSlugToSubService,
  ...subServiceEntries.reduce((acc, { slug }) => ({ ...acc, [slug]: slug }), {}),
};

const relatedSubServices = subServiceEntries.map(({ slug, branch }) => ({ name: branch.title, slug }));

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const serviceKey = slugToKey[slug];
  const service = subServiceDetailsData[serviceKey] || serviceDetailsData[serviceKey];
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', size: '', concern: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const slots = ['Mon 9am','Mon 11am','Mon 2pm','Tue 10am','Tue 1pm','Tue 3pm','Wed 9am','Wed 11am','Wed 2pm'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleConsultationClick = () => {
    setShowModal(true);
    setForm({ name: '', email: '', company: '', size: '', concern: '' });
    setSelectedSlot(null);
  };

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = {
        name: form.name,
        email: form.email,
        company: form.company,
        size: form.size,
        concern: form.concern || `Interested in: ${service.title}`,
        selectedSlot: selectedSlot,
      };

      await handleConsultationBooking(formData);

      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to send consultation request. Please try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (!service) {
    return (
      <div style={{ padding: '100px 24px', textAlign: 'center', minHeight: '100vh' }}>
        <h1 style={{ color: '#fff' }}>Service not found</h1>
        <button 
          onClick={() => navigate('/')} 
          style={{ marginTop: 20, padding: '10px 20px', cursor: 'pointer' }}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Navigation Back */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border)'  , 
        background: 'linear-gradient(135deg, rgba(255, 60, 0, 0.12) 14%, rgba(0, 7, 5, 0.63) 100%)'}}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
            border: 'none',
            color: 'var(--green)',
            cursor: 'pointer',
            fontSize: 14,
            fontFamily: 'var(--font-mono)',
          }}
        >
          <ArrowLeft size={18} /> Back to Services
        </button>
      </div>

      {/* Hero Section */}
   <div
  style={{
    padding: '30px 20px',
   
    borderRadius: '0 0 0 50%',
    background:
      'linear-gradient(135deg, rgba(255, 60, 0, 0.12) 0%, rgba(0, 7, 5, 0.63) 100%)',
    borderBottom: '1px solid var(--border)',
  }}
>
  <div
    style={{
      maxWidth: 1500,
      margin: '20px auto',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    }}
  >
    {/* Left Content */}
    <div
      style={{
        flex: '1 1 700px',
        minWidth: '300px',
        marginLeft: window.innerWidth > 768 ? '80px' : '0',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--head)',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          color: 'var(--green)',
          marginBottom: 16,
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h1>

      <p
        style={{
          fontSize: 'clamp(16px, 3vw, 20px)',
          color: 'var(--text-dim)',
          marginBottom: 24,
          maxWidth: 600,
          lineHeight: 1.6,
        }}
      >
        {service.subtitle}
      </p>

      <p
        style={{
          fontSize: 16,
          color: 'var(--text)',
          lineHeight: 1.8,
        }}
      >
        {service.what}
      </p>

      <div
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          marginTop: 20,
          justifyContent: 'center',
        }}
      >
        <button
          onClick={handleConsultationClick}
          style={{
            padding: '12px 32px',
            background: 'var(--green)',
            color: '#000',
            border: 'none',
            borderRadius: 4,
            fontFamily: 'var(--head)',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Get Free Consultation
        </button>

        <button
          onClick={handleConsultationClick}
          style={{
            padding: '12px 32px',
            background: 'transparent',
            color: 'var(--green)',
            border: '1px solid var(--green)',
            borderRadius: 4,
            fontFamily: 'var(--head)',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Request Demo
        </button>
      </div>
    </div>

    {/* Right PNG */}
    <div
  style={{
    flex: '0 1 400px',
    position: 'relative',
    display: 'inline-block',
  opacity: 0.6,
  }}
>
  <img
    src="/loc.png"
    alt="Security Expert"
    style={{
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      objectFit: 'contain',
      
    }}
  />

  <span
    className="hero__shield-name"
    style={{
      position: 'absolute',
      bottom: 'clamp(80px, 25%, 130px)',
      left: '50%',
      transform: 'translateX(-50%)',
      color: '#fff',
    }}
  >
    Fusion<strong>Threat</strong>
  </span>
</div>
  </div>
</div>

      {/* What is this service */}
      {/* <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 24,
            color: 'var(--green)',
          }}>
          {service.title}?
          </h2>
          <p style={{
            fontSize: 16,
            color: 'var(--text)',
            lineHeight: 1.8,
            maxWidth: 900,
          }}>
            {service.what}
          </p>
        </div>
      </div> */}

      {/* Why Important */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)'  }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 24,
            color: 'var(--green)',
             textAlign: 'center'
          }}>
            Why It Is Important ?
          </h2>
          <p style={{
            fontSize: 16,
            color: 'var(--text)',
            lineHeight: 1.8,
           
          }}>
            {service.whyImportant}
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)',borderRadius: '0 50% 0 0', background:
      'linear-gradient(135deg, #0b1015e6 0%, #030710 100%)' ,}}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 24,
            color: 'var(--green)',
          }}>
            How It Works
          </h2>
          <p style={{
            fontSize: 16,
            color: 'var(--text)',
            lineHeight: 1.8,
            
          }}>
            {service.howItWorks}
          </p>
        </div>
      </div>

      {/* Why FusionThreat is Better */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)',borderRadius: '0 0 0 50%', background:
      'linear-gradient(135deg, #0b1015e6 0%, #030710 100%)', }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 24,
            color: 'var(--green)',
          }}>
            Why FusionThreat Is Better Than Competitors
          </h2>
          <p style={{
            fontSize: 16,
            color: 'var(--text)',
            lineHeight: 1.8,
           
          }}>
            {service.betterThanOthers}
          </p>
        </div>
      </div>

      
      {/* Advantages to Join */}
<div
  style={{
    padding: "80px 24px",
    borderBottom: "1px solid var(--border)",
  }}
>
  <div
    style={{
      
      margin: "0 auto",
    }}
  >
    <h2
      style={{
        fontFamily: "var(--head)",
        fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 700,
        marginBottom: 56,
        color: "#fff",
        textAlign: "center",
      }}
    >
      Advantages of Joining FusionThreat
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "40px",
        
      }}
    >
      {/* Left Side - Advantages */}
      <div
        style={{
          display: "grid",
          gap: 0,
        }}
      >
        {service.advantages.map((adv, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              
            paddingLeft: '70px',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background:
                  " green",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontWeight: 700,
                color: "#000",
                fontSize: 18,
                
              }}
            >
              ✓
            </div>

            <p
              style={{
                color: "var(--text)",
                fontSize: 15,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {adv}
            </p>
          </div>
        ))}
      </div>

      {/* Right Side - Image */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
        }}
      >
        <img
          src="https://microworldinfosol.com/assets/img/global2.png"
          alt="FusionThreat Security"
          style={{
            width: "100%", 
            height: "80vh", 
          }}
        />
      </div>
    </div>
  </div>
</div>

      {/* Key Advantages */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg, rgba(255, 60, 0, 0.12) 0%, rgba(0, 7, 5, 0.63) 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 24,
            color: 'var(--green)',
          }}>
            Key Advantages Offered
          </h2>
          <p style={{
            fontSize: 16,
            color: 'var(--text)',
            lineHeight: 1.8,
           
            padding: 24,

            border: '1px solid var(--border)',
            borderRadius: 8,
          
          }}>
            {service.keyAdvantages}
          </p>
        </div>
      </div>

      {/* Business Impact */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)'  }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 24,
            color: '',
          }}>
            How It Gives Advantages to Your Business
          </h2>
          <p style={{
            fontSize: 16,
            color: 'var(--text)',
            lineHeight: 1.8,
           
            padding: 24,
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid var(--border)',
            borderRadius: 8,
          }}>
            {service.businessImpact}
          </p>
        </div>
      </div>

      {/* Industries */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg, rgba(255, 60, 0, 0.12) 0%, rgba(0, 7, 5, 0.63) 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 40,
            color: 'var(--green)',
          }}>
            Industries That Need This Service Most
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}>
            {service.industries.map((industry, i) => (
              <div key={i} style={{
                padding: 20,
                background: 'rgba(255, 60, 0, 0.12)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                textAlign: 'center',
              }}>
                <p style={{ color: 'var(--text)', fontSize: 14, fontWeight: 500 }}>
                  {industry}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)',borderRadius: '20% 20% 0 0'  }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 56,
            color: '#fff',
            textAlign: 'center'
          }}>
            Key Benefits
          </h2>
          <div style={{
            
           
            gap: 20,
          }}>
            {service.keyBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} style={{
                  padding: 20,
                 
                  transition: 'all 0.3s',
                }}>
                  <div style={{ marginBottom: 16 }}>
                    <Icon size={32} color='var(--green)' />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--head)',
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--green)',
                    marginBottom: 8,
                  }}>
                    {benefit.title}
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.6 }}>
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features List */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 56,
            color: '#fff',
          }}>
            What's Included
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {service.features.map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 16,
                padding: 20,
                background: 'rgba(0, 255, 55, 0.03)',
                border: '1px solid var(--border)',
                borderRadius: 6,
              }}>
                <CheckCircle size={24} color='green' style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.6 }}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Flow */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 56,
            color: '#fff',
          }}>
            How It Works
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 32,
          }}>
            {service.process.map((p, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  background: 'linear-gradient(135deg, var(--green), rgba(1, 27, 57, 0.6))',
                  borderRadius: '50%',
                  marginBottom: 20,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#ebe7e7',
                }}>
                  {p.step}
                </div>
                <h3 style={{
                  fontFamily: 'var(--head)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--green)',
                  marginBottom: 8,
                }}>
                  {p.title}
                </h3>
                <p style={{
                  color: 'var(--text-dim)',
                  fontSize: 14,
                  lineHeight: 1.6,
                }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Case Study */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {/* Pricing */}
            <div style={{
              padding: 40,
             background:
      'linear-gradient(135deg, #0b1015e6 0%, #030710 100%)',
              border: '2px solid var(--green)',
              borderRadius: 8,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--green)',
                letterSpacing: '0.1em',
                marginBottom: 16,
              }}>
                PRICING
              </h3>
              <p style={{
                fontFamily: 'var(--head)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 700,
                color: 'var(--green)',
                marginBottom: 12,
              }}>
                {service.pricing}
              </p>
              <p style={{
                color: 'var(--text-dim)',
                fontSize: 14,
                lineHeight: 1.6,
              }}>
                Flexible plans tailored to your organization's size and requirements. Volume discounts available.
              </p>
            </div>

            {/* Case Study */}
            <div style={{
              padding: 40,
                background:
      'linear-gradient(135deg, #0b1015e6 0%, #030710 100%)',
              border: '1px solid var(--border)',
              borderRadius: 8,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--green)',
                letterSpacing: '0.1em',
                marginBottom: 16,
              }}>
                REAL IMPACT
              </h3>
              <p style={{
                fontSize: 16,
                color: '#fff',
                lineHeight: 1.8,
              }}>
                "{service.caseStudy}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
        <div
  style={{
    padding: '80px 24px',
    background:
      'linear-gradient(135deg, #07090c 0%, #030710 100%)',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* Right Side PNG */}
  <img
    src="https://www.defaqto.com/1200x630/8416/8621/5137/Defaqto_imagery_with_backgrounds_RGB_Defaqto_service_ratings_young_business_women.png" // Your PNG path
    alt="Security"
    style={{
      position: 'absolute',
      right: '5px',
      top: '75%',
      transform: 'translateY(-50%)',
      width: '350px',
      maxWidth: '30vw',
      height: 'auto',
      opacity: 1,
      pointerEvents: 'none',
    }}
  />

  {/* Center Content */}
  <div
    style={{
    
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
      opacity: 10,

    }}
  >
    <h2
      style={{
        fontFamily: 'var(--head)',
        fontSize: 'clamp(28px, 4vw, 40px)',
        fontWeight: 700,
        marginBottom: 20,
        color: '#fff',
      }}
    >
      Your Security Matters—Let’s Build a Safer System Together
    </h2>

    <p
      style={{
        fontSize: 16,
        color: 'var(--text-dim)',
        marginBottom: 32,
        lineHeight: 1.6,
      }}
    >
      Schedule a consultation with our security experts to learn how{' '}
      {service.title.toLowerCase()} can protect your organization.
    </p>

    <div
      style={{
        display: 'flex',
        gap: 16,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <button
        onClick={handleConsultationClick}
        style={{
          padding: '12px 32px',
          background: 'var(--green)',
          color: '#000',
          border: 'none',
          borderRadius: 4,
          fontFamily: 'var(--head)',
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}
      >
        Get Free Consultation
      </button>

      <button
        onClick={handleConsultationClick}
        style={{
          padding: '12px 32px',
          background: 'transparent',
          color: 'var(--green)',
          border: '1px solid var(--green)',
          borderRadius: 4,
          fontFamily: 'var(--head)',
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}
      >
        Request Demo
      </button>
    </div>
  </div>
          </div>

      {/* FAQs Section */}
      <div style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)', background: 'rgba(16, 185, 129, 0.03)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: 56,
            color: '#fff',
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 20,
          }}>
            {service.faqs.map((faq, i) => (
              <details key={i} style={{
                padding: 24,
                background: 'rgba(255, 60, 0, 0.12)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                cursor: 'pointer',
              }}>
                <summary style={{
                  color: 'var(--green)',
                  fontSize: 15,
                  fontWeight: 600,
                  outline: 'none',
                  userSelect: 'none',
                }}>
                  {faq.q}
                </summary>
                <p style={{
                  color: 'var(--text)',
                  fontSize: 14,
                  lineHeight: 1.8,
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: '1px solid var(--border)',
                }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Related Services */}
      <div style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--head)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            marginBottom: 40,
            color: '#fff',
          }}>
            Explore Other Services
          </h2>
          <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 16 }}>
            {relatedSubServices.filter(s => s.slug !== serviceKey).map((s, i) => (
              <button
                key={i}
                onClick={() => navigate(`/service/${s.slug}`)}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  borderRadius: 4,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s',
                  fontSize: 14,
                }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px',
        }}>
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            maxWidth: 600,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '40px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{
                fontFamily: 'var(--head)',
                fontSize: 28,
                fontWeight: 700,
                color: '#fff',
              }}>
                Book Your Consultation
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  fontSize: 24,
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 60,
                  height: 60,
                  background: 'var(--green)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <CheckCircle size={32} color='#000' />
                </div>
                <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 12 }}>
                  Consultation Request Received!
                </h3>
                <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
                  Our security team will contact you within 24 hours to confirm your consultation slot. Check your email for confirmation details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {error && (
                  <div style={{
                    padding: '12px 16px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 4,
                    display: 'flex',
                    gap: 8,
                    alignItems: 'flex-start',
                  }}>
                    <AlertCircle size={18} color='#ef4444' style={{ marginTop: 2 }} />
                    <span style={{ fontSize: 14, color: '#fca5a5' }}>{error}</span>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--green)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>FULL NAME</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(0,255,136,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--green)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(0,255,136,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--green)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>COMPANY</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(0,255,136,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--green)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>COMPANY SIZE</label>
                  <select
                    value={form.size}
                    onChange={e => setForm({ ...form, size: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(0,255,136,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  >
                    <option value="">Select company size...</option>
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--green)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>PREFERRED TIME SLOT</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {slots.map((slot, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          padding: '8px 12px',
                          background: selectedSlot === slot ? 'var(--green)' : 'rgba(0,255,136,0.03)',
                          border: `1px solid ${selectedSlot === slot ? 'var(--green)' : 'var(--border)'}`,
                          borderRadius: 4,
                          color: selectedSlot === slot ? '#000' : 'var(--text)',
                          fontSize: 12,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--green)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>YOUR MAIN CONCERN (OPTIONAL)</label>
                  <textarea
                    value={form.concern}
                    onChange={e => setForm({ ...form, concern: e.target.value })}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(0,255,136,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    background: 'var(--green)',
                    color: '#000',
                    border: 'none',
                    borderRadius: 4,
                    fontFamily: 'var(--head)',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'all 0.3s',
                  }}
                >
                  {loading ? 'Sending...' : <>Send Consultation Request <Send size={16} /></>}
                </button>

                <p style={{
                  fontSize: 12,
                  color: 'var(--text-dim)',
                  textAlign: 'center',
                  marginTop: 12,
                }}>
                  We respond within 24 hours to confirm your consultation time.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}





